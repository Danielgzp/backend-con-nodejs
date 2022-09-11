const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Products, ProductsSchema } = require('./products.model');
const { Categories, CategoriesSchema } = require('./categories.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Categories.init(CategoriesSchema, Categories.config(sequelize));
  Products.init(ProductsSchema, Products.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Categories.associate(sequelize.models);
  Products.associate(sequelize.models);
}
module.exports = setupModels;
