//API KEY = 71262e7cd94dcdc877c2e1756478119b

const iconElement = document.querySelector('.weather-container');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

//App data
const weather = {};
weather.temperature = {
    unit: 'celcius'
};

// Const and Variables
const KELVIN = 273;
//API KEY 
const key = '71262e7cd94dcdc877c2e1756478119b';

//Check if the browser supports Geo-location on
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.getElementsByClassName.display = 'block';
    notificationElement.innerHTML = `<p> Browser doesn't support Geo-Location</p>`;
}

//Set User Position
function setPosition(position){
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// Show error when there is issue with Geolocation service

function showError(error){
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p> ${error.message}`;
}

// Get the weather API Provider
function getWeather(latitude, longitude){
//API KEY = 71262e7cd94dcdc877c2e1756478119b
    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${key}`;
    console.log(api);
  fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        console.log(data);
        weather.temperature.value = Math.floor(data.current.temp - KELVIN);
        weather.description = data.current.weather[0].description;
        weather.iconId = data.current.weather[0].icon;
        weather.city = data.timezone.split("/")[1];
       // weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

// Display the weather to UI
function displayWeather() {
     iconElement.innerHTML = `<img src="./icons/${weather.iconId}.png"/>`;
     tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
     descElement.innerHTML = weather.description;
     locationElement.innerHTML = `${weather.city}, ${weather.country}`;
};