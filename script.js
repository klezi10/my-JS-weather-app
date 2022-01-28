// const apiKey = `2fc59c88fa863e451b6f4e4accf6d955`;
const cityInput = document.getElementById('city-input');
// const searchBtn = document.getElementById('search-btn');
const form = document.getElementById('form');
const cityName = document.getElementById('city-name');
const temperature = document.querySelector('.temperature');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const weatherDescription = document.getElementById('weather-description');
const feelsLike = document.getElementById('feels-like');
const weatherIcon = document.getElementById('weather-icon');

//=================DEFAULT CITY=================
defaultCity('Phuket');

function defaultCity(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2fc59c88fa863e451b6f4e4accf6d955&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

//=====================DEFAULT CITY=====================

form.addEventListener('submit', (event) => {
  event.preventDefault();
  findCity();
});

function findCity() {
  const city = cityInput.value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2fc59c88fa863e451b6f4e4accf6d955&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  console.log(response.data);
  cityName.textContent = response.data.name;
  temperature.textContent = Math.round(response.data.main.temp);
  humidity.textContent = response.data.main.humidity;
  wind.textContent = Math.round(response.data.wind.speed);
  const description = response.data.weather[0].description;
  weatherDescription.textContent = description;
  feelsLike.textContent = Math.round(response.data.main.feels_like);
  const icon = response.data.weather[0].icon;
  weatherIcon.innerHTML = `
  <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
  `;
}
