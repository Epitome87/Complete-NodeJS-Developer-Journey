const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    //   Get the value of the token from the Authorization Header
    const token = req.header('Authorization');
    console.log('Your Auth Token: ', token); // 'Bearer {ourAuthToken}

    // Trim out the 'Bearer ' part of the token
    const parsedToken = token.replace('Bearer ', '');

    const decoded = jwt.verify(parsedToken, process.env.JWT_SECRET);

    // Remember, our Token's payload stores our user ID
    // Is this Token part of our User's Tokens array?
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': parsedToken,
    });

    if (!user) {
      // Throw error to trigger our catch statement
      console.log(
        'Unable to auth user with id and token of',
        decoded._id,
        token
      );
      throw new Error();
    }

    // No need for orute handler to fetch user again
    // Give routes access to user in the req
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = auth;
