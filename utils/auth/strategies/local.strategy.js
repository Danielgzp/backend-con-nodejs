const { Strategy } = require('passport-local');

const AuthService = require("../../../services/auth.service");
const service = new AuthService();

const LocalStrategy = new Strategy(
  {
    //esto sirve para cambiar el nombre por defecto de los campos que recibe passport.js
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      //encuentra el email a traves del metodo creado en el servicio, en este caso de AuthService
      const user = await service.getUser(email, password);

      //si cumple todo lo anterior es aceptado y devuelve el user
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;