const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('../config/config');


const router = express.Router();

router.post('/login',
  //We are using the local strategy and not using sessions
  //nos autenticamos segun la documentacion de passport que en este caso es 'local'
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      //Esto es para establecer un tiempo de expiracion para el token
      const jwtConfig = {
        expiresIn: '7d',
      };
      /*user es la instancia del usuario obtenido del modelo que tenga la propiedad Id del usuario.
        Se utiliza sub por conveniencia porque así lo maneja el standar de JWT pero 
        puede usarse el nombre que uno quiera */
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, config.jwtSecret, jwtConfig);
      //devolvemos la info del usuario y el token ya firmado
      res.json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;