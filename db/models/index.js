const { User, UserSchema } = require('./user.model');
const { Products, ProductsSchema } = require('./products.model');
const { Categories, CategoriesSchema } = require('./categories.model');


function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Products.init(ProductsSchema, Products.config(sequelize));
  Categories.init(CategoriesSchema, Categories.config(sequelize));
}
module.exports = setupModels;
