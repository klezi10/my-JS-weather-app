const apiKey = `2fc59c88fa863e451b6f4e4accf6d955`;
const cityInput = document.getElementById('city-input');
const form = document.getElementById('form');
const cityName = document.getElementById('city-name');
const temperature = document.querySelector('.temperature');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const weatherDescription = document.getElementById('weather-description');
const feelsLike = document.getElementById('feels-like');
const weatherIcon = document.getElementById('weather-icon');
const time = document.getElementById('time');
const currentDay = document.getElementById('day');
const geolocationBtn = document.getElementById('geolocation');
const forecastEl = document.querySelector('.five-day-forecast');

//====================TIME ==================

function updateTime() {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  });
  time.textContent = currentTime;
}

updateTime();

//===============CURRENT DAY===============

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const date = new Date();
const day = daysOfWeek[date.getDay()];

currentDay.textContent = day;

//=====================DISPLAY WEATHER=====================

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = cityInput.value;
  findCity(city);
});

function findCity(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

findCity('Phuket');

function displayWeather(response) {
  const description = response.data.weather[0].description;
  const icon = response.data.weather[0].icon;

  cityName.textContent = response.data.name;
  temperature.textContent = Math.round(response.data.main.temp);
  humidity.textContent = response.data.main.humidity;
  wind.textContent = Math.round(response.data.wind.speed);
  weatherDescription.textContent = description;
  feelsLike.textContent = Math.round(response.data.main.feels_like);
  weatherIcon.innerHTML = `
  <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
  `;
  getForecast(response.data.coord);
  cityInput.value = '';
}

//=================GEOLOCATION ==================

geolocationBtn.addEventListener('click', (event) => {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  });
});

function getForecast(coords) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const date = new Date(timestamp * 1000);
  let day = date.getDay();
  return daysOfWeek[day];
}

function displayForecast(response) {
  const forecastArray = response.data.daily;

  let forecastHTML = `
  <div class="five-day-forecast row">
  `;

  forecastArray.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `
      <div class="col">
            <p>${formatDay(forecastDay.dt)}</p>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="${forecastDay.weather[0].description}" />
            <p><strong>${Math.round(
              forecastDay.temp.max
            )}°</strong> / ${Math.round(forecastDay.temp.min)}°</p>
          </div>
      `;
    }
  });
  forecastHTML += `</div>`;
  forecastEl.innerHTML = forecastHTML;
}
