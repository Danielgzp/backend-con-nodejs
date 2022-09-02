const express = require('express');
const router = express.Router();

const CategoriesService = require('../services/categoriesService');

const service = new CategoriesService();

router.get('/', (req, res) => {
  const categories = service.find();
  res.status(200).json(categories);
});

// router.get('/:categoryId/products/:productsId', (req, res) => {
//   const { categoryId, productsId } = req.params;
//   res.json({
//     categoryId,
//     productsId,
//     name: 'aLGO',
//   });
// });

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.findOne(id);
  res.status(200).json(category)
//   if (category) {
//     res.status(200).json(category);
//   } else {
//     res.status(404).json({
//       message: 'Not Found',
//     });
//   }
});

router.post('/', (req, res) => {
  const body = req.body;
  const newCategory = service.create(body);
  res.status(201).json(newCategory);
});

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const updateCategory = service.update(id, body);
  res.status(200).json(updateCategory);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleteCategory = service.delete(id);
  res.status(200).json(deleteCategory);
});

module.exports = router;
