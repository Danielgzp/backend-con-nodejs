const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const USER_TABLE = 'users';
const UserSchema = {
  id: {
    //Permite que el campo sea nulo o no, en este caso le estamos diciendo que no puede ser null
    allowNull: false,
    //Hace que el campo sea autoincrementable
    autoIncrement: true,

    primaryKey: true,
    //El tipo de datos que quiero que sea
    type: DataTypes.INTEGER,
  },
  // unique para que solo haya un valor igual a ese
  email: { allowNull: false, type: DataTypes.STRING, unique: true },
  password: { allowNull: false, type: DataTypes.STRING },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
};
class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,

      /* Podemos utlizar los hooks con sequelize para que realice el hash de la contraseña 
      antes de guardar los datos. Solo hay que agregar la opción hooks en el método 
      config de la clase User que se encuentra en user.model.js*/
      hooks: {
        beforeCreate: async (user) => {
          //aqui estamos encriptando la contraseña para la tabla de los usuarios
          //la libreria bcrypt funcioan de forma asincrona
          // bcrypt.hash(user.password, 10) es el metodo que crea el hash para la password
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        },
        //Esto es para eliminar el password en el response y que no sea visible de forma publica

        //En la clase del curso igualmente lo hacia en el servicio
        afterCreate: async (user) => {
          //dataValues es en sequelize, en otra db podria ser solo delete user.password
          delete user.dataValues.password;
        },
      },
      /* De esta forma podemos evitar realizar el hash en los servicios user y customer
       y dejarlos como estaban anteriormente.*/
    };
  }
}
module.exports = { USER_TABLE, UserSchema, User };
