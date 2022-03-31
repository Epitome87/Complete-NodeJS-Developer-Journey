const express = require('express');
const auth = require('../middleware/auth.js');

const {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require('../controllers/taskController');
const router = new express.Router();

router
  .get('/', auth, getTasks)
  .get('/:id', auth, getTask)
  .post('/', auth, createTask)
  .delete('/:id', auth, deleteTask)
  .patch('/:id', auth, updateTask);

module.exports = router;
