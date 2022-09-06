const boom = require('@hapi/boom');
const faker = require('faker');

const { models } = require('../libs/sequelize');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    this.categories.push([
      {
        id: faker.datatype.uuid(),
        name: 'Ropa',
        products: [
          {
            name: 'Zapatos',
          },
          {
            name: 'Pantalones',
          },
        ],
      },
      {
        id: faker.datatype.uuid(),
        name: 'Electronicos',
        products: [
          {
            name: 'Computadora',
          },
          { name: 'Nevera' },
        ],
      },
      {
        id: faker.datatype.uuid(),
        name: 'Alimentos',
        products: [
          {
            name: 'Carne',
          },
          {
            name: 'Bebidas',
          },
        ],
      },
    ]);
  }
  async find() {
    const rta = await models.Categories.findAll();

    return rta;
    // return this.categories;
  }
  create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  findOne(id) {
    return this.categories.find((item) => item.id === id);
  }

  update(id, changes) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Ups, Not Found');
    const updateCategory = {
      ...this.categories[index],
      ...changes,
    };
    this.categories[index] = updateCategory;
    return updateCategory;
  }

  delete(id) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Ups, Not Found');
    this.categories.splice(index, 1);
    return {
      delete: true,
    };
  }
}

module.exports = CategoriesService;
