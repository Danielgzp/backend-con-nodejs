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
