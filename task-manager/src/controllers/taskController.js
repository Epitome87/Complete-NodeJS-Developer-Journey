const Task = require('../models/task');

// Get all Tasks
const getTasks = async (req, res) => {
  try {
    console.log('FETCHING TASKS FOR USER', req.user);
    // const tasks = await Task.find({});
    // Can also do this:
    // Note, if we were to grab the value returned by this populate call, it is NOT the tasks array -- it's the full User object, without a .task field
    await req.user.populate('tasks');
    res.status(200).send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a Task by its ID
const getTask = async (req, res) => {
  const { id } = req.params;
  console.log('Get Task');

  try {
    // Task must match Task ID and be owned by this user
    // const task = await Task.findById(id);
    // Rember, we use an auth middleware in our route -- it gives us access to req.user
    const task = await Task.findOne({ _id: id, owner: req.user._id });

    if (!task) {
      res.status(404).send();
    }
    res.status(200).send({ task, user: req.user });
  } catch (error) {
    res.status(500).send();
  }
};

// Create a new Task
const createTask = async (req, res) => {
  const { description, isCompleted } = req.body;

  // const newTask = new Task({ description, isCompleted });
  const newTask = new Task({ description, isCompleted, owner: req.user._id });
  try {
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a Task by its ID
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // const deletedTask = await Task.findByIdAndDelete(id);
    // Now with auth, need to make sure Task belongs to auth'd user
    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).send();
    }

    res.status(200).send(deletedTask);
  } catch (error) {
    res.status(500).send();
  }
};

// Update a Task by its ID
const updateTask = async (req, res) => {
  console.log('HUH');

  const { id } = req.params;

  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'isCompleted'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    // const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const updatedTask = await Task.findOne({ _id: id, owner: req.user._id });

    if (!updatedTask) {
      return res.status(404).send();
    }

    updates.forEach((update) => (updatedTask[update] = req.body[update]));
    await updatedTask.save();

    res.status(200).send(updatedTask);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { getTasks, getTask, createTask, deleteTask, updateTask };
