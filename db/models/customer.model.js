const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Customer extends Model {

    //aqui hacemos la relacion 1-1 desde customers a user es decir los Customer tienen un usuario asociado a cada uno
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
      /* Podemos utlizar los hooks con sequelize para que realice el hash de la contraseña 
      antes de guardar los datos. Solo hay que agregar la opción hooks en el método 
      config de la clase User que se encuentra en user.model.js*/
      hooks: {
        beforeCreate: async (customer) => {
          //aqui estamos encriptando la contraseña para la tabla de los usuarios
          //la libreria bcrypt funcioan de forma asincrona
          // bcrypt.hash(user.password, 10) es el metodo que crea el hash para la password
          const password = await bcrypt.hash(customer.user.password, 10);
          customer.password = password;
        },
        //En la clase del curso igualmente lo hacia en el servicio
        afterCreate: async (customer) => {
          //dataValues es en sequelize, en otra db podria ser solo delete customer.password
          delete customer.user.dataValues.password;
        },
      },
      /* De esta forma podemos evitar realizar el hash en los servicios user y customer
       y dejarlos como estaban anteriormente.*/
    };
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };
