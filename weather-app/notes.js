console.log('Starting');

setTimeout(() => {
  console.log('2 Second Timer');
}, 2000);

// Note this console.log call actually occurs after 'Stopping'!
// It all has to do with the Call Stack (where method calls are pushed onto), the Node APIs (where code handled by the C++ side of Node is handled, such as with
// our setTimeout function, which is a function implemented by Node. Here our setTimeOut calls wait for their duration), the Callback Queue (where callback functions wait in line at once they are deemed ready to be ran), and finally an Event Loop waits for the Call Stack to be completely empty before it decides to hand off the code waiting in the Callback Queue off to the Call Stack, at which point it is finally executed). Note that only once main() function has ended will these get called! No callbacks are ever going to run before the main function is done. Behind the scenes Node is using other threads for the Node APIs. In reality, JavaScript itself is single-threaded! This process is why Node is "None-Blocking"
setTimeout(() => {
  console.log('0 Second Timer');
}, 0);

console.log('Stopping');
