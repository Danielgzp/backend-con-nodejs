'use strict';

const {
  CategoriesSchema,
  CATEGORIES_TABLE,
} = require('../models/categories.model');
const { ProductsSchema, PRODUCTS_TABLE } = require('../models/products.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CATEGORIES_TABLE, CategoriesSchema);
    await queryInterface.createTable(PRODUCTS_TABLE, ProductsSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CATEGORIES_TABLE);
    await queryInterface.dropTable(PRODUCTS_TABLE);
  },
};

/*
{
   "name": "Zapatos", 
   "image": "https://img.lalr.co/cms/2017/12/05165632/Zapatos.jpg?size=xl",
   "price": 99,
   "description": "Unos zapatos bien lindos",
   "categoryId": 1
} */