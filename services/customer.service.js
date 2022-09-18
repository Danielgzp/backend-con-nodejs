const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async find() {
    const customer = await models.Customer.findAll({
      include: ['user'],
    });

    return customer;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async create(data) {
    //aqui a la hroa de crear el customer de una ves creamos tambien al usuario gracias a la relacion 1-1
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return newCustomer;
  }
  //Asi hubiera creado el crear el customer haciendo el hash como en la clase del curso
  /*
  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    });
    /// Esta es para eliminarl el password /////
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }
    */

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}

module.exports = CustomerService;
