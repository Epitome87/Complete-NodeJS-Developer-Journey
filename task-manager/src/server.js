const express = require('express');
const Task = require('./models/task.js');
require('./db/mongoose.js');
const User = require('./models/user');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => res.status(500).send(error));
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        // GET request was succesful, but no user exists
        return res.status(404).send('User not found');
      }

      // GET request was successful, and a user was actually found
      res.status(200).send(user);
    })
    .catch((error) => res.status(500).send());
});

app.post('/users', (req, res) => {
  const { name, email, password, age } = req.body;

  const newUser = new User({ name, email, password, age });
  newUser
    .save()
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(400).send(err));
});

app.get('/tasks', (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((error) => res.status(500).send(error));
});

app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;

  Task.findById(id)
    .then((task) => {
      if (!task) return res.status(404).send();
      res.status(200).send(task);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

app.post('/tasks', (req, res) => {
  const { description, isCompleted } = req.body;

  const newTask = new Task({ description, isCompleted });
  newTask
    .save()
    .then((task) => res.status(201).end(task))
    .catch((err) => res.status(400).send(err));
});

app.listen(5000, () => {
  console.log(`Server running on port ${port}!`);
});
