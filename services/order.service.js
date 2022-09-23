const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  /* Luego en order.service.js Modificamos el create() para que la inserción sea automatizada 
  con solo enviar el sub o userId, hacemos una busqueda findOne al customer Where user .id sea igual
   a data.userId. Donde este se almacenará en customer el cual tendremos que extraer el ID 
   para enviarlo al create de order. Si no se encuentra se regresa un no encontrado.*/

  async create(data) {
    const customer = await models.Customer.findOne({
      where: {
        //esto es una caracteristica que nos proporciona sequeliza para acceder a tablas adyacentes
        '$user.id$': data.userId,
      },
      include: ['user'],
    });
    if (!customer) {
      throw boom.badRequest('Customer not found');
    }
    const newOrder = await models.Order.create({ customerId: customer.id });
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);

    if (!newItem) {
      throw boom.notFound('product not found');
    }
    return newItem;
  }

  //esta parte nos sirve para encontrar las ordenes de un usuario en especifico, en este
  //caso del usuario que esta logueado en ese momento
  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        //esto es una caracteristica que nos proporciona sequeliza para acceder a tablas
        //adyacentes que esten relacioandas entre si, en este caso tenemos uan orden que esta asociada a un customer
        //Este customer tiene asociado a el un usuario y de alli obtenemos el id
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return orders;
  }

  async find() {
    const orders = await models.Order.findAll();

    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          //aqui hacemos una asociacion doble, a la orden le asociamos al
          //cliente, y a ese cliente le asociamos el usuario
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });

    if (!order) {
      throw boom.notFound('order not found');
    }
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = OrderService;
