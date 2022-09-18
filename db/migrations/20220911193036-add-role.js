'use strict';

const { UserSchema, USER_TABLE } = require('../models/user.model');
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(USER_TABLE, 'role', {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'customer',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  },
};

//Esto es una migracion
//Para agregar una nueva columna a la tabla de users
