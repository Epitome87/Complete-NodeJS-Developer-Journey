const doWorkCallback = (callback) => {
  setTimeout(() => {
    // callback('This is an error!', undefined);
    callback(undefined, [1, 3, 5]);
  }, 2000);
};

doWorkCallback((error, result) => {
  if (error) {
    return console.log(error);
  }

  console.log(result);
});

const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // Things didn't go well
    reject("Things didn't go as planned!");

    // Things went well!
    // resolve([1, 3, 5]);
  }, 2000);
});

// .then only gets executed if things go well!
doWorkPromise
  .then((result) => {
    console.log('Success!', result);
  }) // .catch only gets executed if things didn't go well!
  .catch((error) => {
    console.log('Error! ', error);
  });

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
      // reject('Error');
    }, 2000);
  });
};

// Ugly! Super nested with only 2 async tasks
// add(1, 3)
//   .then((sum) => {
//     console.log('Sum 1', sum);

//     add(sum, 5)
//       .then((sum2) => {
//         console.log('Sum 2', sum2);
//       })
//       .catch((err2) => console.log('Error 2'));
//   })
//   .catch((err) => console.log(err));

// SOLUTIONI: Promise-Chaining!
// Notice we return the function call rather than just calling it. And we only need one final .catch at the end
add(1, 2)
  .then((sum) => {
    console.log(sum);

    return add(sum, 4);
  })
  .then((sum2) => {
    console.log('Sum 2', sum2);
  })
  .catch((error) => {
    console.log(error);
  });
