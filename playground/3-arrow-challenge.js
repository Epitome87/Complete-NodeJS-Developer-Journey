// Goal: Create method to get incomplete tasks
// 1. Define getTasksToDo method inside of tasks object
// 2. Use filter to retur njust the incompleted tasks (arrow function)
// 3. Test work

const tasks = {
  tasks: [
    {
      text: 'Grocery shopping',
      completed: true,
    },
    {
      text: 'Clean yard',
      completed: false,
    },
    {
      text: 'Film course',
      completed: false,
    },
  ],
  getTasksToDo() {
    return tasks.tasks.filter((task) => !task.completed);
  },
};

console.log(tasks.getTasksToDo());
