const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);

    if (!newItem) {
      throw boom.notFound('product not found');
    }
    return newItem;
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
