const express = require('express');
require('./db/mongoose.js');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

// Use a custom error handler middleware to replace Express' default
// It's important this comes after our routers!
app.use(errorHandler);

app.listen(5000, () => {
  console.log(`Server running on port ${port}!`);
});
