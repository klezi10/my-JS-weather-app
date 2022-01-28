const apiKey = `2fc59c88fa863e451b6f4e4accf6d955`;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Phuket&appid=2fc59c88fa863e451b6f4e4accf6d955`;

const cityInput = document.getElementById('city-input');
// const searchBtn = document.getElementById('search-btn');
const form = document.getElementById('form');
const cityName = document.getElementById('city-name');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(cityInput.value);
  cityName.innerHTML = cityInput.value;
});
