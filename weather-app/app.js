import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';

const yargs = _yargs(hideBin(process.argv));

yargs.command({
  command: 'forecast',
  describe: 'Get weather forecast',
  builder: {
    location: {
      describe: 'The Location to get the weather forecast of',
      demandOption: true,
      type: 'string',
    },
  },
  handler(yargs) {
    // Prevent destructuring of "undefined" by giving the destructure a default value of an empty object
    geocode(yargs.location, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return console.log('Error', error);
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return console.log('Error', error);
        }
        console.log(location);
        console.log(forecastData);
      });
    });
  },
});

yargs.parse();
