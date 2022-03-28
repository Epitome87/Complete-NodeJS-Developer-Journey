const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Figure out our public directory path, using the path module system function
const publicDirectoryPath = path.join(__dirname, '../public');

// Now serve the directory up! express.static in some way configs our express app
app.use(express.static(path.join(__dirname, '../public')));

// Setup handlebars engine
app.set('view engine', 'hbs');

// Customize where we should find our 'views' at
const viewsPath = path.join(__dirname, '../templates/views');
app.set('views', viewsPath);

// Tell handlebars where we find our Partials
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

// Accepts a route, and a function that gets called when visiting that route. This function has request and response
app.get('/', (req, res) => {
  //   We now want to serve up a dynamic handlebars file, not a static one!
  res.render('index', {
    title: 'Weather App',
    name: 'Matthew',
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name: 'Matthew' });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Matthew',
    message: 'This is the help page',
  });
});

// Can also send back JSON!
app.get('/weather', (req, res) => {
  // Express automatically detects we're sending an object, stringifies the JSON for us!
  res.send([
    { forecast: 'It is snowing', location: 'Redlands' },
    { forecast: 'It is raining', location: 'Riverside' },
  ]);
});

const PORT = 5000;

// Accepts port and an OPTIONAL callback method that runs when server first runs
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
