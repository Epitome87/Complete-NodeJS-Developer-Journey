const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  login,
  logout,
  logoutAll,
} = require('../controllers/userController');

router
  .get('/me', auth, getUser)
  .delete('/me', auth, deleteUser)
  .patch('/me', auth, updateUser)
  .post('/login', login)
  .post('/', createUser)
  .post('/logout', auth, logout)
  .post('/logoutAll', auth, logoutAll);

module.exports = router;
