const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');

const router = express.Router();
const service = new OrderService();

//en este endpoint podemos acceder a todas las ordenes asociadas al usuairo que esta 
//logueado y hace la peticion
router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      //aqui encontramos el id del usuario a partir de user.sub que viene encriptado dentro del jwt
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
