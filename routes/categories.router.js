const express = require('express');
const passport = require('passport');
const boom = require("@hapi/boom")

const CategoryService = require('../services/category.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

router.get(
  '/',
  /* EL flujo de esto funciona de la siguiente manera 

  primero se autentica al usuario si hizo login y tienen un token asignado, de ese token con el 
  middleware de auth.validator verificamos que tipo de rol tiene ese usuario que hizo login sea admin, customer, etc.
  y checkRoles le pasamos a cada una de las rutas los usuarios que queremos que accedan a dichas rutas*/

  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'customer'),
  async (req, res, next) => {
    try {
      const categories = await service.find();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'customer'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  //Aqui estamos protegiendo neustra ruta, solo puede hacer uso de ella la persona que tenga un jwt valido
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'seller'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
      boom.forbidden('se requieren permisos de administrador');
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;



// "name": "Daniel 5",
    // "lastName": "Gonzalez 5",
    // "phone": "100234",
    // "user": {
    //     "email": "danielcustomer1@mail.com",
    //     "password": "customer123"
    // }