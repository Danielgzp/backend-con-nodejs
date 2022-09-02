const faker = require('faker');

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

  find(offset, limit) {
    //limit y offset sirve para hacer paginaciones o filtros en este caso esta solo de ejemplo
    if (offset && limit) {
      /* Los parámetros requperados de query, 
		vienen como string, es necesario pasarlos a int*/

      return this.users;
    } else {
      throw new Error('no data found');
    }
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
