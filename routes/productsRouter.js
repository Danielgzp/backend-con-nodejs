// const express = require('express');
// const router = express.Router();
// const ProductsService = require('../services/productsService');

// const service = new ProductsService();

// router.get('/', async (req, res) => {
//   try {
//     const products = await service.find();
//     res.json(products);
//   } catch (error) {
//     res.status(404).json({
//       message: error.message,
//     });
//   }
// });

// router.get('/filter', (req, res) => {
//   res.send('Yo soy un filter');
// });

// router.get('/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const product = await service.findOne(id);
//     res.json(product);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/', async (req, res) => {
//   const { name, price, image } = req.body;

//   const newProduct = await service.create({ name, price, image });
//   if (newProduct) {
//     res.status(201).json({
//       message: 'Product added',
//       data: newProduct,
//     });
//   } else res.status(501).json({ message: 'internal error' });
// });

// router.patch('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const body = req.body;
//     //body es para obtener los valores dentro del objeto
//     const product = await service.update(id, body);
//     res.json(product);
//   } catch (error) {
//     res.status(404).json({
//       message: error.message,
//     });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const response = await service.delete(id);
//     res.json(response);
//   } catch (error) {
//     res.status(404).json({
//       message: error.message,
//     });
//   }
// });

// module.exports = router;

const express = require('express');

const ProductsService = require('../services/productsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/productSchema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;