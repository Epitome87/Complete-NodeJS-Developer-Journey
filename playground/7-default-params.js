// Default param must come last
const greeter = (age, name = 'Anonymous') => {
  console.log(`Hello, ${name}! Your age is ${age}`);
};

greeter(24, 'Matthew');
