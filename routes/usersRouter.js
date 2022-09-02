const express = require('express');
const router = express.Router();
const UsersService = require('../services/usersService');

const service = new UsersService();

router.get('/', (req, res) => {
  const { offset, limit } = req.query;
  const users = service.find(offset, limit);

  res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);
  res.status(200).json(user);
});

router.post('/', (req, res) => {
  const { name, lastName, edad } = req.body;

  const newUser = service.create({ name, lastName, edad });
  if (newUser) {
    res.status(201).json({
      message: 'User added',
      data: newUser,
    });
  } else res.status(501).json({ message: 'internal error' });
});

// router.patch('/:id', (req, res) => {
//   const { id } = req.params;
//   const body = req.body
//   const user = service.u(id);
//   res.json(user);
// });

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.delete(id);

  res.status(200).json(user);
});

module.exports = router;
