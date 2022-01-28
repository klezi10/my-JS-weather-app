// const apiKey = `2fc59c88fa863e451b6f4e4accf6d955`;
const cityInput = document.getElementById('city-input');

// console.log(city);
// const searchBtn = document.getElementById('search-btn');
const form = document.getElementById('form');
const cityName = document.getElementById('city-name');

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
  cityName.innerHTML = response.data.name;
}
