const User = require('../models/user');

// Now that we enforce Auth, this controller is rather useless
// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).send(users);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const getUser = async (req, res) => {
  // Now that we use Auth middleware first, we already ahve access to user!
  console.log('USER IN GET USER', req.user);
  res.send(req.user);
};

const createUser = async (req, res) => {
  const { name, email, password, age } = req.body;
  const newUser = new User({ name, email, password, age });

  try {
    await newUser.save();
    console.log('HUH', newUser);

    // Generate Auth Token for this user
    const token = await newUser.generateAuthToken();
    // TODO: Why is user an empty object? It isn't until we send it
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
  console.log('LOGGING IN?!');
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    console.log('USER???', user);

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
};
