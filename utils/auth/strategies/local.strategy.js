const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
 
const UserService = require('../../../services/user.service');
const service = new UserService();

const LocalStrategy = new Strategy(
  {
    //esto sirve para cambiar el nombre por defecto de los campos que recibe passport.js
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
        //encuentra el email a traves del metodo creado en el servicio
      const user = await service.findByEmail(email);
      if (!user) {
        //si el usuario no existe pues no se autoriza
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        //si la contraseña no coincide con la que esta en la DB tampoco se autoriza
        done(boom.unauthorized(), false);
      }

      //para borrar el password en el response
      delete user.dataValues.password;

      //si cumple todo lo anterior es aceptado y devuelve el user
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
