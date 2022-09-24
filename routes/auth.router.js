const express = require('express');
const passport = require('passport');

const AuthService = require('./../services/auth.service');

const router = express.Router();
const service = new AuthService();

router.post(
  '/login',
  //We are using the local strategy and not using sessions
  //nos autenticamos segun la documentacion de passport que en este caso es 'local'
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      //Firmamos el token con nuestro servicio Auth
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

//Recuperar contrasenia
router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;

    //aqui recibe el correo ingresado
    const rta = await service.sendMail(email);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
