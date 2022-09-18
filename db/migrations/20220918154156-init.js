'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE, UserSchema } = require('../models/user.model');
const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model');
const {
  CATEGORIES_TABLE,
  CategoriesSchema,
} = require('../models/categories.model');
const { PRODUCTS_TABLE, ProductsSchema } = require('../models/products.model');
const { ORDER_TABLE } = require('../models/order.model');
const {
  OrderProductSchema,
  ORDER_PRODUCT_TABLE,
} = require('../models/order-product.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(CATEGORIES_TABLE, CategoriesSchema);
    await queryInterface.createTable(PRODUCTS_TABLE, ProductsSchema);
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(CATEGORIES_TABLE);
    await queryInterface.dropTable(PRODUCTS_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  },
};