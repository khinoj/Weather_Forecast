const API_Key = "18a1c6a969bf5f3e8eb4283a61d43a89";
let userInputEl = document.getElementById('userinput');
let searchbtnEl = document.getElementById('searchbtn');
let majorCitiesEl = document.querySelectorAll('.majorcities');
let weeklyForecastEl = document.getElementById('weeklyForecast');
let day1CityEl = document.querySelector('.day1City');
let day1TemperatureEl = document.querySelector('.day1Temperature');
let day1HumidityEl = document.querySelector('.day1Humidity');
let day1WindEl = document.querySelector('.day1Wind');
let day1WeatherEl = document.querySelector('.day1Weather');
const date = new Date();
const todaysDate = date.toLocaleDateString();


function todayWeather() {
    searchbtnEl.addEventListener('click', function () {
        console.log('Search BTN');
        let requesturl = `http://api.openweathermap.org/data/2.5/weather?q=${$('#userinput').val()}&units=imperial&appid=${API_Key}`;

        fiveDays();

        fetch(requesturl)
            .then(function (response) {
                return response.json();
            })
            .then(function (forecastResponse) {
                console.log(forecastResponse);
                console.log('City Name', forecastResponse.name);
                console.log('Temp', parseInt(forecastResponse.main.temp));
                console.log('Humidity', forecastResponse.main.humidity);
                console.log('Wind Speed', forecastResponse.wind.speed);
                console.log('Clouds', forecastResponse.weather[0].main);

                const lat = forecastResponse.coord.lat;
                const lon = forecastResponse.coord.lon;

                let cityName = document.createElement('span');
                cityName.textContent = (forecastResponse.name) + " " + todaysDate;
                day1CityEl.appendChild(cityName);

                let cityTemp = document.createElement('span');
                cityTemp.textContent = (forecastResponse.main.temp) + "F";
                day1TemperatureEl.appendChild(cityTemp);

                let cityHumidity = document.createElement('span');
                cityHumidity.textContent = (forecastResponse.main.humidity) + '%';
                day1HumidityEl.appendChild(cityHumidity);

                let cityWind = document.createElement('span');
                cityWind.textContent = (forecastResponse.wind.speed) + " " + 'MPH';
                day1WindEl.appendChild(cityWind);

                if (forecastResponse.weather[0].main === 'Clear') {
                    let cityWeather = document.createElement('span');
                    cityWeather.textContent = (forecastResponse.weather[0].main) + " " + " ⛅ "
                    day1WeatherEl.appendChild(cityWeather);
                } else if (forecastResponse.weather[0].main === 'Clouds') {
                    let cityWeather = document.createElement('span');
                    cityWeather.textContent = (forecastResponse.weather[0].main) + " " + " ☁️ "
                    day1WeatherEl.appendChild(cityWeather);
                } else if (forecastResponse.weather[0].main === 'Rain') {
                    let cityWeather = document.createElement('span');
                    cityWeather.textContent = (forecastResponse.weather[0].main) + " " + " 🌧️ "
                    day1WeatherEl.appendChild(cityWeather);
                } else if (forecastResponse.weather[0].main === 'Thunderstorm') {
                    let cityWeather = document.createElement('span');
                    cityWeather.textContent = (forecastResponse.weather[0].main) + " " + " ⛈️ "
                    day1WeatherEl.appendChild(cityWeather);
                } else {
                    let cityWeather = document.createElement('span');
                    cityWeather.textContent = (forecastResponse.weather[0].main) + " " + " ☀️ "
                    day1WeatherEl.appendChild(cityWeather);
                };
            })
        clearWeather()
    });
};

todayWeather()

function clearWeather() {
    day1CityEl.textContent = " ";
    day1TemperatureEl.textContent = " ";
    day1HumidityEl.textContent = " ";
    day1WindEl.textContent = " ";
    day1WeatherEl.textContent = " ";
};

function fiveDays(lat, lon) {
    let requesturl2 = `http://api.openweathermap.org/data/2.5/forecast?q=${$('#userinput').val()}&lat=${lat}&lon=${lon}&appid=${API_Key}&units=imperial`;
    fetch(requesturl2)
        .then(function (response) {
            return response.json();
        })
        .then(function (fiveData) {
            console.log('five Day', fiveData);
        })
}