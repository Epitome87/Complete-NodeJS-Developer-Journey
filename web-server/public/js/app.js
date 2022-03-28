console.log('Client-side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');

const messageOne = document.getElementById('message-one');
const messageTwo = document.getElementById('message-two');

const fetchForecast = async (location) => {
  const res = await fetch(`http://localhost:5000/weather?address=${location}`);
  const data = await res.json();

  if (data.error) {
    messageOne.textContent = `${data.error}`;
  } else {
    messageOne.textContent = `${data.location}`;
    messageTwo.textContent = `${data.forecast}`;
  }
};

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const location = searchElement.value;

  messageOne.textContent = `Fetching forecast for ${location}...`;
  messageTwo.textContent = '';

  fetchForecast(location);
});
