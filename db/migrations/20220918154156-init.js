'use strict';

//Configuracion de las migraciones apra cear las tablas de la BD en un solo archivo
//en una unica migracion

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

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    //Esto es para crear un usuario admin por default al correr la migracio
    const hash = await bcrypt.hash('admin123', 10);
    await queryInterface.bulkInsert(USER_TABLE, [
      {
        email: 'surperadmin@mail.com',
        password: hash,
        role: 'admin',
        create_at: new Date(),
      },
    ]);

    //
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
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    //Colocar products encima de categories, ya que una depende de la otra al momento de borrar
    await queryInterface.dropTable(PRODUCTS_TABLE);
    await queryInterface.dropTable(CATEGORIES_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    //Colocar users por encima de customers, ya que una depende de la otra al momento de borrar
    await queryInterface.dropTable(USER_TABLE);
  },
};

/*

RECOVERY TOKEN MIGRATION ADDING COLUMN

'use strict';

const { USER_TABLE } = require('./../models/user.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //anadir columna a la tabla en la base de datos
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', {
      field: 'recovery_token',
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
  },

  down: async (queryInterface) => {
    //eliminar la columna de la tabla en la base de datos
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  },
};


*/
