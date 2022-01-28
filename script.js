const cityInput = document.getElementById('city-input');

// const apiKey = `2fc59c88fa863e451b6f4e4accf6d955`;

// const searchBtn = document.getElementById('search-btn');
const form = document.getElementById('form');
const cityName = document.getElementById('city-name');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  findCity();
});

function findCity() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=2fc59c88fa863e451b6f4e4accf6d955&units=metric`;
  axios.get(apiUrl).then(searchCity);
}

function searchCity(response) {
  console.log(response);
  cityName.innerHTML = response.data.name;
}
