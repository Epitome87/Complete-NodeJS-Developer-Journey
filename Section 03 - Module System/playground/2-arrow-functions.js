// const square = function (x) {
//   return x * x;
// };

// const square = (x) => {
//   return x * x;
// };

// const square = (x) => x * x;

// console.log(square(4));

// const event = {
//   name: 'Birthday Party',
//   printGuestList: function () {
//     console.log(`Guest list for ${this.name}`);
//   },
// };

// ES6 - Syntantic sugar, we remove the ":" and "function" keyword
const event = {
  name: 'Birthday Party',
  guestList: ['Matthew', 'Caitlin', 'Daniel', 'Mitch', 'Linda'],
  printGuestList() {
    console.log(`Guest list for ${this.name}`);

    // The function passed this way in the forEach method has its own 'this' binding -- thus resulting in an error in this context!
    // We want the 'this' binding of its PARENT function here, so we actually do want an arrow function here
    // this.guestList.forEach(function (guest) {
    //   console.log(guest + ' is attending ' + this.name);
    // });

    this.guestList.forEach((guest) => {
      console.log(guest + ' is attending ' + this.name);
    });
  },
};

// Arrow functions don't bind their own "this" value, they access the 'this' value in the context in which they're created
// const event = {
//   name: 'Birthday Party',
//   printGuestList: () => {
//     console.log(`Guest list for ${this.name}`);
//   },
// };

event.printGuestList();

// TLDR: Arrow functions when we want this to refer to a parent, ES6 or earlier regular functions otherwise
// Arrow functions: poor candidates for object methods, great candidates for everything else

// Common standards:
// 1. If function is a method, use ES6 method definition syntax: "printGuestList()"
// 2. Otherwise, use most concise arrow function possible: "const printGuestList = () => { .. multiple lines}" or one line if it only returns a value!"
