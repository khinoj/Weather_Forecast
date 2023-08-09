const API_Key = "18a1c6a969bf5f3e8eb4283a61d43a89";
let userInputEl = document.getElementById('userinput');
let searchbtnEl = document.getElementById('searchbtn');
// let majorCitiesEl = document.querySelectorAll('.majorcities');
let weeklyForecastEl = document.getElementById('weeklyForecast');
let day1CityEl = document.querySelector('.day1City');
let day1TemperatureEl = document.querySelector('.day1Temperature');
let day1HumidityEl = document.querySelector('.day1Humidity');
let day1WindEl = document.querySelector('.day1Wind');
let day1WeatherEl = document.querySelector('.day1Weather');
let fiveDaysForecastEl = document.getElementById('fiveDaysForecast')
const date = new Date();
const todaysDate = date.toLocaleDateString();

// shows the daily section upon button click with userinput
function todayWeather() {
    searchbtnEl.addEventListener('click', function () {
        console.log('Search BTN');
        let requesturl = `https://api.openweathermap.org/data/2.5/weather?q=${$('#userinput').val()}&units=imperial&appid=${API_Key}`;

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

                //creates a span and takes data into text.
                let cityName = document.createElement('span');
                cityName.textContent = (forecastResponse.name) + " - " + todaysDate;
                day1CityEl.appendChild(cityName);

                let cityTemp = document.createElement('span');
                cityTemp.textContent = (forecastResponse.main.temp) + " F ";
                day1TemperatureEl.appendChild(cityTemp);

                let cityHumidity = document.createElement('span');
                cityHumidity.textContent = (forecastResponse.main.humidity) + '%';
                day1HumidityEl.appendChild(cityHumidity);

                let cityWind = document.createElement('span');
                cityWind.textContent = (forecastResponse.wind.speed) + " " + 'MPH';
                day1WindEl.appendChild(cityWind);

                //checks to see what the weather is and put the correct icon
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

//clears the daily section
function clearWeather() {
    day1CityEl.textContent = " ";
    day1TemperatureEl.textContent = " ";
    day1HumidityEl.textContent = " ";
    day1WindEl.textContent = " ";
    day1WeatherEl.textContent = " ";
};

//Next Day Weather Report
function fiveDays(lat, lon) {
    let requesturl2 = `https://api.openweathermap.org/data/2.5/forecast?q=${$('#userinput').val()}&lat=${lat}&lon=${lon}&appid=${API_Key}&units=imperial`;

    fetch(requesturl2)
        .then(function (response) {
            return response.json();
        })
        .then(function (fiveData) {
            console.log('five Day', fiveData.list);

            // Clear existing content inside the fiveDaysForecastEl element
            fiveDaysForecastEl.innerHTML = '';

            for (let i = 0; i < fiveData.list.length; i += 8) {
                const forecast = fiveData.list[i];

                // Create a div element to hold each day's forecast
                const dayForecast = document.createElement('div');
                dayForecast.classList.add('day-forecast'); 

                // Create elements to display forecast details
                const dateEl = document.createElement('h3');
                dateEl.textContent = forecast.dt_txt.trim(); 

                const temperatureEl = document.createElement('p');
                temperatureEl.textContent = 'Temperature: ' + forecast.main.temp + ' F';

                const humidityEl = document.createElement('p');
                humidityEl.textContent = 'Humidity: ' + forecast.main.humidity + '%';

                const windEl = document.createElement('p');
                windEl.textContent = 'Wind Speed: ' + forecast.wind.speed + 'MPH';

                // Append the elements to the dayForecast div
                dayForecast.appendChild(dateEl);
                dayForecast.appendChild(temperatureEl);
                dayForecast.appendChild(humidityEl);
                dayForecast.appendChild(windEl);

                // Append the dayForecast div to the fiveDaysForecastEl element
                fiveDaysForecastEl.appendChild(dayForecast);
            }
        });
}




