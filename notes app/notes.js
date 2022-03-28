const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();

  // const duplicateNotes = notes.filter((note) => note.title === title);
  // This method will short-circuit once a duplicate is found!
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added'));
  } else {
    console.log(chalk.red.inverse('A note with this title already exists!'));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(
      chalk.green.inverse(`Note with the title of '${title}' has been removed!`)
    );
  } else
    console.log(
      chalk.red.inverse(`Note with the title of '${title}' was not found!`)
    );
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse('Your notes'));
  notes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
  const notes = loadNotes();

  const foundNote = notes.find((note) => note.title === title);

  if (foundNote) {
    console.log(chalk.green.inverse(foundNote.title));
    console.log(foundNote.body);
  } else {
    console.log(chalk.red.inverse(`Note with title '${title}' was not found!`));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveNotes = (notes) =>
  fs.writeFileSync('notes.json', JSON.stringify(notes));

module.exports = { addNote, removeNote, listNotes, readNote };
