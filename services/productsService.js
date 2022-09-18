const faker = require('faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }
  async create(data) {
    const { name, price, image } = data;
    const newProduct = {
      id: faker.datatype.uuid(),
      name,
      price,
      image,
    };
    this.products.push(newProduct);

    return newProduct;
  }
  async find() {
    return this.products;
  }
  async findOne(id) {
    return this.products.find((item) => item.id === id);
  }
  async update(id, changes) {
    //findIndex para encontrar un valor dentro del array
    const index = this.products.findIndex((item) => item.id === id);
    //si no encuentra el id dentro del array por defecto devuelve el valor -1 por ello mostramos el error
    if (index === -1) {
      throw new Error('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);

    //si no encuentra el id dentro del array por defecto devuelve el valor -1 por ello mostramos el error
    if (index === -1) {
      throw new Error('product not found');
    }
    //splice es para eliminar un valor dentro del array en este caso es eliminando el producto
    this.products.splice(index, 1);
    return { id };
  }
}
module.exports = ProductsService;
