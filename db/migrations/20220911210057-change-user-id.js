'use strict';
const { DataTypes } = require('sequelize');

const { CUSTOMER_TABLE } = require('./../models/customer.model');

module.exports = {
  up: async (queryInterface) => {
    //modoficar columna, y le apsamos el nombre de la columna a modificar
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  down: async (queryInterface) => {
    // await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
