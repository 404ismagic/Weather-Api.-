let myAPI = '12b731178b784355e0fe1830a2375d2b';
let cityHistory = [];

let weatherForm = document.getElementById("weather-form");
let weatherInput = document.getElementById("weather-input");
let currentContainer = document.getElementById("current");
let fiveDayContainer = document.getElementById("five-day");
let historyContainer = document.getElementById("history");

function getGeoCoordinatesUsingAPI(city) {
    // to  be completed
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
