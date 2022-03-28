const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { name, add } = require('./utils.js');
const notes = require('./notes.js');

const argv = yargs(hideBin(process.argv)).argv;

fs.writeFileSync(
  'notes.txt',
  `Here are some notes being written from fs.writeFileSync by ${name}!`
);

fs.appendFileSync(
  'notes.txt',
  ' This additional note is being appended to the previously-written file using fs.appendFielSync!'
);

fs.appendFileSync('notes.txt', ` The sum of 4 and 9 is ${add(4, 9)}`);

// const notes = getNotes();
// console.log(notes);

const isEmail = validator.isEmail('matthew@gmail.com');
console.log('Is it an email? ', isEmail);

const isUrl = validator.isURL('https://mead.io');
console.log('Is it a URL?', isUrl);

console.log(chalk.green.bgWhite('Chalk successfully installed!'));

// This will show arguments passed when the script is ran, i.e 'node app.js Matthew'
console.log(process.argv);

// The 2nd index is where our argument lies, i.e the 'Matthew' above
console.log(process.argv[2]);

const command = process.argv[2];

// Command: 'node app.js add --title="This is my title"
// Note --title is not parsed for us automatically -- so lets use npm package yargs!
// switch (command) {
//   case 'remove':
//     console.log('Removing note');
//     break;
//   case 'add':
//     console.log('Adding note');
//     break;
//   default:
//     console.log('Command not recognized!');
// }

// console.log('From yargs', yargs.argv);

// Customize version
// yargs(hideBin(process.argv)).version = '1.1.0';

// We want yargs to be able to parse add, remove, read, and list commands

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(yargs) {
    notes.addNote(yargs.title, yargs.body);
  },
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'The title of the note to remove',
      demandOption: true,
      type: 'string',
    },
  },
  handler(yargs) {
    notes.removeNote(yargs.title);
  },
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'List all the notes',
  handler(yargs) {
    notes.listNotes();
  },
});

// Create the read command
yargs.command({
  command: 'read',
  describe: 'Reading a note',
  builder: {
    title: {
      describe: 'The title of the note to read',
      demandOption: true,
      type: 'string',
    },
  },
  handler(yargs) {
    notes.readNote(yargs.title);
  },
});

// MUST call this!
yargs.parse();
