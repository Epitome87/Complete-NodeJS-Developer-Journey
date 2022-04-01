const User = require('../models/user');
const sharp = require('sharp');
const {
  sendCancellationEmail,
  sendWelcomeEmail,
} = require('../emails/account.js');

const getAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    // Set response headers
    // We haven't had to set this before because Express is fairly smart when it comes to doing it automatically!
    // For instance, it's been setting Content-Type to 'application/json' when we send bock objects
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
};

const deleteAvatar = async (req, res) => {
  req.user.avatar = undefined;

  await res.user.save();
  res.status(200).send('Avatar successfully deleted');
};

const uploadAvatar = async (req, res) => {
  // Multer middleware gives us access to the file data on req.file!
  // req.user.avatar = req.file.buffer;
  // Instead, let's make use of the sharp library!
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer(); // Pass the original file data, png it, resize it, and convert back to a buffer
  req.user.avatar = buffer;

  // Save profile since we just made a change
  await req.user.save();
  res.status(200).send('Avatar uploaded successfully');
};

const getUser = async (req, res) => {
  // Now that we use Auth middleware first, we already ahve access to user!
  res.send(req.user);
};

const createUser = async (req, res) => {
  const { name, email, password, age } = req.body;
  const newUser = new User({ name, email, password, age });

  try {
    await newUser.save();

    sendWelcomeEmail(newUser.email, newUser.name);

    // Generate Auth Token for this user
    const token = await newUser.generateAuthToken();
    res.status(201).send({ user: newUser, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  // No longer want to find by :id, but the user himself
  // const { id } = req.params;

  try {
    // const deletedUser = await User.findByIdAndDelete(id);

    // const user = await User.findByIdAndDelete(req.user._id);

    // Simpler way to remove a Document from a Collection
    await req.user.remove();

    sendCancellationEmail(req.user.email, req.user.name);

    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send();
  }
};

const updateUser = async (req, res) => {
  // No longer need ID; the user can only delete / know himself
  // const { id } = req.params;

  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    // With Auth, we already have access to the User!
    // const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    //   new: true, // Return updated Document, not the old one
    //   runValidators: true,
    // });
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    // No longer need this check; we know the user exists
    // if (!updatedUser) {
    //   return res.status(404).send();
    // }

    res.status(200).send(req.user);
  } catch (error) {
    // Error -- 500 or validation-related issue.
    // We handle only validation scenario for now
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    // return res.status(200).send(user);
    return res.status(200).send({ user, token });
    // return res.status(200).send({user: user.getPublicProfile(), token })
  } catch (error) {
    res.status(400).send();
  }
};

const logoutAll = async (req, res) => {
  // Remvoe all Tokens for this User
  req.user.tokens = [];

  try {
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
};

const logout = async (req, res) => {
  try {
    // Remove only the Token used for this specific Auth
    // (A user can be logged in multiple devices, thus multiple Tokens)
    req.user.tokens = req.user.tokens.filter((token) => token !== req.token);

    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
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
};
