const express = require('express');
require('./db/mongoose.js');
const auth = require('./middleware/auth');
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');

const app = express();

const port = process.env.PORT || 5000;

// app.use(auth);
app.use(express.json());
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.listen(5000, () => {
  console.log(`Server running on port ${port}!`);
});
