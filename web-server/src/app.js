// const path = require('path');
// const express = require('express');
// const hbs = require('hbs');
// const fetch = require('node-fetch');
// require('dotenv').config();

// const geocode = require('./utils/geocode');
// const forecast = require('./utils/forecast');
import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import hbs from 'hbs';
import fetch from 'node-fetch';
// import 'dotenv/config';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  const { address } = req.query;

  if (!address) {
    return res.send({
      error: 'Must provide an address',
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({ error });
      }

      return res.send({ forecast: forecastData, address, location });
    });
  });
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;

  console.log('ID', id);
  console.log('Query', req.query);

  if (!req.query.search) {
    return res.send({
      error: 'Must provide a search term',
    });
  }

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Matthew',
    errorMessage: 'Help article not found',
  });
});

// Unhandled routes -- needs to come last
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Matthew',
    errorMessage: 'Page Not Found',
  });
});

const PORT = 5000;

// Accepts port and an OPTIONAL callback method that runs when server first runs
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
