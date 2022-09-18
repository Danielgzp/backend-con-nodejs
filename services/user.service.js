const boom = require('@hapi/boom');
const faker = require('faker');

const { models } = require('./../libs/sequelize');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }
  generate() {
    const limit = 20;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: parseInt(faker.datatype.number()),
      });
    }
  }

  /*find(offset, limit) {
    //limit y offset sirve para hacer paginaciones o filtros en este caso esta solo de ejemplo
    if (offset && limit) {
       // Los parámetros requperados de query, 
		// vienen como string, es necesario pasarlos a int

      return this.users;
    } else {
      throw new Error('no data found');
    }
  }*/

  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;
  }

  async findOne(id) {
    //find by private key, es decir buscar por el id o el valor que le solicitemos
    const user = await models.User.findByPk(id);
    if (!user) {
      //BOOM para manejar los errores
      throw boom.notFound('User not found');
    }
    return user;
  }

  async create(data) {
    const newUser = await models.User.create(data);

    return newUser;
  }

  //Asi hubiera creado el crear el usuario haciendo el hash como en la clase del curso
  /*
  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    return newUser;
  }
  */

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UsersService;
