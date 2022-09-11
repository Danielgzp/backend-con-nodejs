const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORIES_TABLE = 'categories';
const CategoriesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Categories extends Model {
  static associate(models) {
    //hasMany: puede tener muchos productos
    this.hasMany(models.Products, {
      as: 'products',
      //alias o el nombre de la relacion nque definimos en el model de products
      foreignKey: 'categoryId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIES_TABLE,
      modelName: 'Categories',
      timestamps: false,
    };
  }
}

module.exports = { Categories, CategoriesSchema, CATEGORIES_TABLE };


