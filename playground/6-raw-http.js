// Experimenting with raw HTTP requests, without axios, fetch, node-fetch, request, etc!
// We use HTTP or HTTPS modules provided by node.js
const http = require('http');

const apiKey = 'a0a5561b6b86fae8f361a4034e3a2a95';
const units = 'f';
const baseUrl = 'http://api.weatherstack.com/current';
const url = `${baseUrl}?access_key=${apiKey}&units=${units}&query=32,32`;

const request = http.request(url, (response) => {
  let data = '';

  // Have to listen to individual chunks of received data. Callback fired whenever a chunk of data comes in
  response.on('data', (chunk) => {
    //   A chunk is a buffer, we want a string!
    console.log(chunk);

    // Data is now what it was previously, plus the new chunk stringified
    data = data + chunk.toString();
  });

  // Figure out when we're done -- runs once, unlike possibly the above callback
  response.on('end', () => {
    // Long, ugly string
    console.log('Data when ending', data);

    // Parse the ugly string into an object
    const body = JSON.parse(data);
    console.log(body);
  });

  // Gets fired when an error occurs
  request.on('errror', (error) => {
    console.log('An error', error);
  });
});

// Program will hang if we don't end the request!
request.end();
