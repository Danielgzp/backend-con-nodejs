const boom = require('@hapi/boom');
const faker = require('faker');

const pool = require('../libs/postgres.pool');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
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
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);

    return rta.rows;
  }
  findOne(id) {
    return this.users.find((item) => item.id === id);
  }

  create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    // lo mismo que en products
    this.users.splice(index, 1);

    return { id };
  }
}

module.exports = UsersService;
