const mongoose = require('mongoose');
// const validator = require('validator');
// const User = require('./models/user');
// const Task = require('./models/task');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  //   useCreateIndex: true,
});

// const matt = new User({
//   name: '    Matthew   ',
//   email: 'matt@hotmail.com   ',
//   password: 'lolmypassword',
// });

// matt
//   .save()
//   .then((mattStill) => console.log(mattStill))
//   .catch((error) => console.log(error));

// const newTask = new Task({
//   description: 'Buy Gas',
//   isCompleted: false,
// });

// newTask
//   .save()
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));
