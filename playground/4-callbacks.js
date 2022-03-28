setTimeout(() => {
  console.log('Two seconds are up');
}, 2000);

const names = ['Matt', 'Caitlin', 'Dan'];
const shortNames = names.filter((name) => {
  return name.length <= 4;
});

// const geocode = (address) => {
//   setTimeout(() => {
//     const data = {
//       latitude: 34.2,
//       longitude: 8.0,
//     };

//     return data;
//   }, 2000);
// };

// const data = geocode('Redlands');
// console.log(data);

// The return pattern doesn't work for us when we want to use async things inside of our functions. We have to use callbacks pattern!
// Our async functions are NEVER going to finish before main finishes, so returning in them is pointless
const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 34.2,
      longitude: 8.0,
    };

    callback(data);
  }, 2000);
};

geocode('Redlands', (data) => {
  console.log(data);
});

// Challenge
// Goal: Mess around with the callback pattern
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2s delay
// 3. After 2 seconds are up, call the callback func with the sum

const add = (x, y, callback) => {
  setTimeout(() => {
    callback(x + y);
  }, 2000);
};

add(1, 4, (sum) => { 
  console.log(sum);
});
