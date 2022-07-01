function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formatDate = day + ", " + hours + ":" + minutes;
  return formatDate;
}
let now = new Date();
let wholeDate = document.querySelector("#whole-date");
wholeDate.innerHTML = formatDate(new Date());

function celGrades(event) {
  event.preventDefault();
  let celsius = 23;
  let celsiusChanging = document.querySelector("#main-grade");
  celsiusChanging.innerHTML = celsius;
}
let celChange = document.querySelector("#celsius-link");
celChange.addEventListener("click", celGrades);

function farGrades(event) {
  event.preventDefault();
  let celsius = 23;
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  let fahrenheitChanging = document.querySelector("#main-grade");
  fahrenheitChanging.innerHTML = fahrenheit;
}
let farChange = document.querySelector("#fahrenheit-link");
farChange.addEventListener("click", farGrades);

function showTemperature(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let currentTemperature = document.querySelector("#main-grade");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  let minTemp = document.querySelector("#min-main-temp");
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  let maxTemp = document.querySelector("#max-main-temp");
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  let currentWeather = document.querySelector("#current-weather");
  currentWeather.innerHTML = response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "2c48af3f43b8d8d0dc03bb103b9b4d3e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function cities(event) {
  event.preventDefault();
  let city = document.querySelector("#cities").value;
  searchCity(city);
}
let form = document.querySelector("form");
form.addEventListener("submit", cities);

function handlePosition(position) {
  let apiKey = "2c48af3f43b8d8d0dc03bb103b9b4d3e";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

searchCity("Kyiv");
