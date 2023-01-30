let myAPI = '12b731178b784355e0fe1830a2375d2b';
let cityHistory = [];

let weatherForm = document.getElementById("weather-form");
let weatherInput = document.getElementById("weather-input");
let currentContainer = document.getElementById("current");
let fiveDayContainer = document.getElementById("five-day");
let historyContainer = document.getElementById("history");

function addToHistory () {
    // to be completed
}

function displayWeather(city,  data) {
  // to be completed
}
function getWeatherUsingApi (city,data) {
    // to be completed
    let {lat} = data;
    let {lon} = data;
    let wUrl = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={myAPI}&units=imperial`
    let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${myAPI}`;
    fetch (weatherUrl)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data){
            console.log( "data = ", data);
            displayWeather(city, data);
        })
        .catch ( function ( error) {
            console.error ( error);
        })

}

function getGeoCoordinatesUsingAPI(city) {
    // to  be completed
    let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${myAPI}`;
    fetch (geoUrl) 
        .then ( function (resp) {
            return resp.json();
        })
        .then ( function(jsonData){
            if(!jsonData[0]) {
                alert('Check the city name, not found');
            } else {
                console.log('jsonData  = ', jsonData);
                addToHistory(city);
                getWeatherUsingApi(city,jsonData[0]);
            }
        })
        .catch(function (error) {
            console.error(error);
        });

}
function searchHandler(e) {
    if(!weatherInput.value) {
        return;
    }
    e.preventDefault();
    let city = weatherInput.value.trim();
    console.log("city = ", city)
    getGeoCoordinatesUsingAPI(city);
}
weatherForm.addEventListener('submit', searchHandler)
