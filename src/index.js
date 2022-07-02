function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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

function showTemperature(response) {
  let city = document.querySelector("#city");
  let currentTemperature = document.querySelector("#main-grade");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let minTemp = document.querySelector("#min-main-temp");
  let maxTemp = document.querySelector("#max-main-temp");
  let currentWeather = document.querySelector("#current-weather");
  let mainIcon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  city.innerHTML = response.data.name;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  currentWeather.innerHTML = response.data.weather[0].main;
  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainIcon.setAttribute("alt", response.data.weather[0].description);
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
function celGrades(event) {
  event.preventDefault();
  let celsiusChanging = document.querySelector("#main-grade");
  celsiusChanging.innerHTML = Math.round(celsiusTemperature);
}
let celChange = document.querySelector("#celsius-link");
celChange.addEventListener("click", celGrades);

function farGrades(event) {
  event.preventDefault();
  let fahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  let fahrenheitChanging = document.querySelector("#main-grade");
  fahrenheitChanging.innerHTML = fahrenheit;
}
let farChange = document.querySelector("#fahrenheit-link");
farChange.addEventListener("click", farGrades);

let celsiusTemperature = null;

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

searchCity("London");
