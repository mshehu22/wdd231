// OpenWeather API Key
const apiKey = "9b50979de6712dbcd1c70fdf65621859";

// Abuja coordinates
const lat = 9.0765;
const lon = 7.3986;

// API URLs
const weatherURL =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const forecastURL =
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// Elements
const currentWeather = document.querySelector("#current-weather");
const forecast = document.querySelector("#forecast");

// Current Weather
async function getWeather() {
    try {
        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error("Weather unavailable");
        }

        const data = await response.json();

        displayCurrentWeather(data);

    } catch (error) {

        currentWeather.innerHTML =
            "<p>Unable to load weather information.</p>";

        console.error(error);
    }
}

// Forecast
async function getForecast() {
    try {
        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error("Forecast unavailable");
        }

        const data = await response.json();

        displayForecast(data);

    } catch (error) {

        forecast.innerHTML =
            "<p>Unable to load forecast.</p>";

        console.error(error);
    }
}

// Display Current Weather
function displayCurrentWeather(data) {

    const icon = data.weather[0].icon;

    currentWeather.innerHTML = `
        <img
            src="https://openweathermap.org/img/wn/${icon}@2x.png"
            alt="${data.weather[0].description}"
            width="80"
            height="80"
        >

        <p><strong>${Math.round(data.main.temp)}°C</strong></p>

        <p>${data.weather[0].description}</p>

        <p>Humidity: ${data.main.humidity}%</p>
    `;
}

// Display Forecast
function displayForecast(data) {

    const forecasts = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    let html = `
        <h3>3-Day Forecast</h3>
    `;

    forecasts.slice(0, 3).forEach(item => {

        const date = new Date(item.dt_txt);

        const day = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        html += `
            <p>
                ${day}: ${Math.round(item.main.temp)}°C
            </p>
        `;
    });

    forecast.innerHTML = html;
}

// Run
getWeather();
getForecast();