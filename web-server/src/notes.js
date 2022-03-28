const path = require('path');
const express = require('express');
const hbs = require('hbs'); // Note that for serving dynamic pages, we didn't need to ever require this yet! But to use Partials, we have to

const app = express();

// Sending back a bunch of HTML written in a string inside a single method call is cumbersome, so we can set up express to serve up an entire directory of assets, including HTML!
// Typically serve these up in a 'public' folder

// Path must be ABSOLUTE path from root of our machine
// Luckily Node provides us with two handy variables to achieve this
console.log(__dirname); // E:Web Dev\Course\web-server\src
console.log(__filename); // E:Web Dev\Course\web-server\src\app.js

// We could manipulate one of the above paths to point to our public folder, or use a core Node module called Path!
// It handles this in a cross-OS compatible way
const publicDirectoryPath = path.join(__dirname, '../public'); // Current directory, but then back out one directory and then into public folder

// Now serve the directory up! express.static in some way configs our express app
app.use(express.static(path.join(__dirname, '../public')));

// Set a value for a given Express setting. Key (setting name) and value arguments
app.set('view engine', 'hbs'); // Here we say we want to set the view engine setting to use hbs

// Express expects all our views (handlebars templates) to live in a specific folder in our root -- 'views'
// We can actually customize where express looks for our dynamic views at. Default (and standard) is 'views'
// const viewsPath = path.join(__dirname, '../templates');
// app.set('views', viewsPath); // If we wanted to customize our views folder name -- which we don't!

// Accepts a route, and a function that gets called when visiting that route. This function has request and response
app.get('/', (req, res) => {
  // Sends text out to a console (browser or node)
  //   res.send('Hello, Express!');

  // Note that once we configed express to serve up static files in public folder, the above res no longer sends 'Hello, Express!' -- why?!
  // Because index.html has a special meaning in web servers, allowing us to leave the /index.html path off.
  // Basically express runs across the app.use(express.static) call first and returns that index.html, never getting a chance to visit this route here
  // We could actually remove this '/' route all together now

  //   We now want to serve up a dynamic handlebars file, not a static one!
  res.render('index', {
    title: 'Weather App',
    name: 'Matthew',
  }); // note we don't need the .hbs extension -- though we could use it
  // Note we assume this file name is located in the views folder, thus no path needed

  // To provide a value that's accessible in the template, we have to pass a second argument to res.render() -- an object containing all the values we wish the view to have access to
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name: 'Matthew' });
});

// Another GET route
app.get('/help', (req, res) => {
  // Can send HTML as text, too!
  //   res.send('<h1>Help Page</h1>');

  res.render('help', { title: 'Help', message: 'This is the help page' });
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
