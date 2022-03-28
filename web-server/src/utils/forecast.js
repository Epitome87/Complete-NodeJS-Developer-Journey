import fetch from 'node-fetch';
import 'dotenv/config';

const forecast = async (longitude, latitude, callback) => {
  const apiKey = process.env.WEATHERSTACK_KEY;
  const units = 'f';
  const baseUrl = 'http://api.weatherstack.com/current';
  const url = `${baseUrl}?access_key=a0a5561b6b86fae8f361a4034e3a2a95&units=${units}&query=${longitude},${latitude}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.error) {
    callback(`Error with weather services: ${data.error.info}`, undefined);
  } else {
    const forecastString = `${data.current.weather_descriptions[0]}. It is current ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out.`;
    callback(undefined, forecastString);
  }
};

export default forecast;
