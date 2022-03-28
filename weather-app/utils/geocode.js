import fetch from 'node-fetch';
import 'dotenv/config';

const geocode = async (address, callback) => {
  const mapboxApiKey = process.env.MAPBOX_KEY;
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapboxApiKey}&limit=1`;

  const response = await fetch(geocodeURL);
  const data = await response.json();

  if (data.message) {
    callback(`Error with location services: ${data.message}`, undefined);
  } else {
    const latitude = data.features[0].center[1];
    const longitude = data.features[0].center[0];
    const location = data.features[0].place_name;

    callback(undefined, { latitude, longitude, location });
  }
};

export default geocode;
