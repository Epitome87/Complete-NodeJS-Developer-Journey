const doWork = async () => {
  return 'Matthew';
};

// console.log(doWork());

// Async functions ALWAYS return a Promise
// That Promise is fullfilled with the value we as a developer choose to return with the function
// In the above example, the value returned is not a String -- it is a Promise that gets fulfilled with a String

// So we can chain on .then and .catch to an Async function
// doWork()
//   .then((result) => console.log(result))
//   .catch((err) => console.log('Error', err));

//   How does catch ever run? Well, if we throw an error from our async function, that's the same as Rejecting a Promise!
// const doMoreWork = async () => {
//   throw new Error('Something went terribly, terribly wrong!!!');
// };

// doMoreWork()
//   .then()
//   .catch((err) => console.log(err));

// But this is only one half of why Async / Await is useful -- the other is hte Await part!

// The best part -- when working with async / await, you don't have to change how your Promise-based functions work internally!
// So old-school methods that use Promise instead of async will work just fine with the await keyword!
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) return reject('Number cannot be negative!');

      resolve(a + b);
    }, 2000);
  });
};

const doBetterWork = async () => {
  const sum1 = await add(-1, 3);
  const sum2 = await add(sum1, 3);
  const sum3 = await add(sum2, 3);

  return sum3;
};

doBetterWork()
  .then((result) => {
    console.log('Result', result);
  })
  .catch((error) => console.log(error));

// But what hapens if one of the await add calls fails?
// Note that when our first add method runs (with a negative number), we don't bother waiting for the other two calls -- nice!
