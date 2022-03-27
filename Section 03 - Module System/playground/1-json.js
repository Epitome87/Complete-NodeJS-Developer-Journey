const fs = require('fs');

// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
// };

// const bookJSON = JSON.stringify(book);
// const parsedData = JSON.parse(bookJSON);

// fs.writeFileSync('1-json.json', bookJSON);

// Not a string! It is a buffer
const dataBuffer = fs.readFileSync('1-json.json');
console.log(dataBuffer);

// Actual string of the file
const dataJSON = dataBuffer.toString();
console.log(dataJSON);

const data = JSON.parse(dataJSON);
console.log(data.title);

// Load data and parse it
const userDataBuffer = fs.readFileSync('1-users.json');
const userJSON = userDataBuffer.toString();
const userData = JSON.parse(userJSON);

// Alter data
userData.name = 'Caitlin';
userData.age = 31;

// Save data back to file
const alteredUserJSON = JSON.stringify(userData);
fs.writeFileSync('1-users.json', alteredUserJSON);
