// const fetch = require('node-fetch');
import fetch from 'node-fetch';
import 'dotenv/config';

const apiKey = process.env.WEATHERSTACK_KEY;
const units = 'f';
const longitudeLatitude = '37.8267,-122.4233';
const baseUrl = 'http://api.weatherstack.com/current';
const url = `${baseUrl}?access_key=${apiKey}&units=${units}&query=${longitudeLatitude}`;

// fetch(baseURL)
//   .then((response) => response.json())
//   .then((data) => console.log(data.current));

const response = await fetch(url);
const weather = await response.json();

console.log(weather);

console.log(
  `${weather.current.weather_descriptions[0]}. It is current ${weather.current.temperature} degrees out. It feels like ${weather.current.feelslike} degrees out.`
);
