const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
const express = require('express');

// const API = process.env.API_URL;
// const VERSION = process.env.API_VERSION;

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use(`/products`, productsRouter);
  router.use(`/users`, usersRouter);
  router.use(`/categories`, categoriesRouter);
}

module.exports = routerApi;
