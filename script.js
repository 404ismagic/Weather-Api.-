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
function displayCurrentWeather(city, data) {
    let date = dayjs().format ('M/D/YYYY');
    let temp = data.main.temp;
    let wind = data.wind.speed;
    let hum = data.main.humidity;
    let icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let descr = data.weather[0].description || data[0].main; 

    let cardDiv = document.createElement('div');
    let cardBody = document.createElement('div');
    let heading2 = document.createElement('h2');
    let weatherIcon = document.createElement('img');
    let tempT = document.createElement('p');
    let windT = document.createElement('p');
    let humT = document.createElement('p');

    cardDiv.setAttribute('class', 'card');
    cardBody.setAttribute('class', 'card-body');
    cardDiv.append(cardBody);

    heading2.setAttribute('class', 'h3 card-title');
    tempT.setAttribute('class', 'card-text');
    windT.setAttribute('class', 'card-text');

    heading2.textContent = `${city} (${date})`;
    weatherIcon.setAttribute('src', icon);
    weatherIcon.setAttribute('alt', descr);
    weatherIcon.setAttribute('class','weather-img');
    heading2.append(weatherIcon);
    tempT.textContent = `Temp:  ${temp} F`;
    windT.textContent = `Wind:  ${wind} MPH`;
    humT.textContent = `Humidity:  ${hum} %`
    cardBody.append(heading2, tempT, windT, humT);

    currentContainer.innerHTML =  '';
    currentContainer.append(cardDiv)
    
}
function displayWeatherCard(data) {
    console.log(" displayWeatherCard");

    let url = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    let tempF = data.main.temp;
    let hum = data.main.hum;
    let wind = data.wind.speed;

    let newDiv = document.createElement('div');
    let newCard = document.createElement('div');
    let newCardBody = document.createElement('div');
    let newTitle = document.createElement('h4');
    let newIcon = document.createElement('img');
    let newTemp = document.createElement('p');
    let newWind = document.createElement('p');
    let newHum = document.createElement ('p');

    newDiv.append(newCard);
    newCard.append(newCardBody);
    newCardBody.append(newTitle, newIcon, newTemp, newWind, newHum);

    newDiv.setAttribute('class', 'col-md');
    newDiv.classList.add('five-day-card');
    newCard.setAttribute('class', 'card bg-primary h-100 text-white');
    newCardBody.setAttribute('class', 'card-body p-3');
    newTitle.setAttribute('class', 'card-title');
    newTemp.setAttribute('class', 'card-text');
    newWind.setAttribute('class', 'card-text');
    newHum.setAttribute('class','card-text');

    newTitle.textContent = dayjs(data.dt_txt).format('M/D/YYYY');
    newIcon.setAttribute('src', url);
    newIcon.setAttribute('alt', desc);
    newTemp.textContent = `Temp:${tempF} deg F`;
    newWind. textContent = `Wind: ${wind} MPH`;
    newHum .textContent = `Humidity: ${hum} %`;

    fiveDayContainer.append(newDiv);
}
function displayFiveDayForecast(city, data, timezone) {
    let start= dayjs().add(1, 'day').startOf('day').unix();
    let end = dayjs().add(6,'day').startOf('day').unix();

    let headC = document.createElement('div');
    let head = document.createElement('h3');

    headC.setAttribute('class', 'col-md-12');
    head.textContent = 'Five Day Forecast'
    headC.append(head);

    fiveDayContainer.innerHTML = '';
    fiveDayContainer.append(headC);

    for ( let i =0;   i <data.length; i++) {
        if (data[i].dt >= start && data[i].dt<end) {
            if (data[i].dt_txt.slice(11,13) == '12') {
                displayWeatherCard(data[i]);
            }
        }
    }
}
function displayWeather(city,  data) {
  // to be completed
  displayCurrentWeather(city, data.list[0]);
  displayFiveDayForecast(city, data.list, data.city.timezone);
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
