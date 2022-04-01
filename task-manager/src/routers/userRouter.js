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
  getAvatar,
  deleteAvatar,
  uploadAvatar,
} = require('../controllers/userController');
const multer = require('multer');
const upload = multer({
  // By removing des, multer no longer saves images to our file directory
  // Instead, it passes the data through to our functions so we can do stuff with it!
  // dest: 'avatars',
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('File must be a .jpg, jpeg, or .png'));
    }

    // No error, successful!
    cb(undefined, true);
  },
});

router
  .get('/me', auth, getUser)
  .delete('/me', auth, deleteUser)
  .patch('/me', auth, updateUser)
  .post('/', createUser)
  .post('/login', login)
  .post('/logout', auth, logout)
  .post('/logoutAll', auth, logoutAll)
  .post('/me/avatar', auth, upload.single('avatar'), uploadAvatar)
  .delete('me/avatar', auth, upload.single('avatar'), deleteAvatar)
  .get('/:id/avatar', getAvatar);

module.exports = router;
