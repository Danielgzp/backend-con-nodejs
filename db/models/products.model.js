const { Model, DataTypes, Sequelize } = require('sequelize');
const PRODUCTS_TABLE = 'products';
const ProductsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  productName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'product_name',
  },
  price: {
    allowNull: false,
    type: DataTypes.REAL,
  },
  stockNumber: {
    allowNull: true,
    type: DataTypes.REAL,
    field: 'stock_number',
  },
  category: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Products extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: 'Products',
      timestamps: false,
    };
  }
}
module.exports = { PRODUCTS_TABLE, ProductsSchema, Products };
