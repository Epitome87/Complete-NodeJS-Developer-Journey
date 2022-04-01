const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be a positive number');
        }
      },
    },
    avatar: {
      type: Buffer,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.includes('password')) {
          throw new Error('Password cannot contain the phrase "password"');
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
});

// This func is available on an instance of a Model
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, 'thisisasecret');

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// userSchema.methods.getPublicProfile = async function () {
//   const user = this;

//   const userObject = user.toObject();

//   delete userObject.password;
//   delete userObject.tokens;

//   return userObject;
// }

// Instead of the above function, and calling it manually,
// we can use the toJSON method, which is called for us any time we res.send this Model!
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// This func is available on the Model itself
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  // No User with this email found
  if (!user) {
    console.log('User by that email not found');
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  // Password incorrect
  if (!isMatch) {
    console.log('User by that email found, but password incorrect');
    throw new Error('Unable to login');
  }

  // Note we intentionally use vague login errors -- for protection reasons
  console.log('User with that email/password found');
  return user;
};

// Hash the plain text password before savign
userSchema.pre('save', async function (next) {
  // This is the individual User we are about to save
  const user = this;

  console.log('Just before saving');

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  // Signal that we are done
  next();
});

// Delete user's tasks when the user is deleted
userSchema.pre('remove', async function (next) {
  // This is the individual User we are about to delete
  const user = this;

  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
