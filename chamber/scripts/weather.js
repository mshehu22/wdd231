const apiKey = "YOUR_OPENWEATHER_API_KEY";
const lat = 9.0765;
const lon = 7.3986;

const weatherURL =
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const forecastURL =
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const currentWeather = document.querySelector("#current-weather");
const forecast = document.querySelector("#forecast");

async function getWeather() {
  try {
    const response = await fetch(weatherURL);

    if (!response.ok) {
      throw new Error("Weather request failed");
    }

    const data = await response.json();
    displayCurrentWeather(data);
  } catch (error) {
    currentWeather.innerHTML = `
      <img src="images/weather.svg"
           alt="Weather icon"
           width="80"
           height="80">
      <p>Weather information unavailable.</p>
    `;
    console.error(error);
  }
}

async function getForecast() {
  try {
    const response = await fetch(forecastURL);

    if (!response.ok) {
      throw new Error("Forecast request failed");
    }

    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    forecast.innerHTML =
      "<p>Forecast unavailable.</p>";
    console.error(error);
  }
}

function displayCurrentWeather(data) {
  currentWeather.innerHTML = `
      <img src="images/weather.svg"
           alt="Weather icon"
           width="80"
           height="80">

      <p><strong>${Math.round(data.main.temp)}°C</strong></p>

      <p>${data.weather[0].description}</p>

      <p>Humidity: ${data.main.humidity}%</p>
  `;
}

function displayForecast(data) {
  forecast.innerHTML = "<h3>3-Day Forecast</h3>";

  const noonForecasts = data.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  noonForecasts.slice(0, 3).forEach(item => {
    const date = new Date(item.dt_txt);

    const day = date.toLocaleDateString("en-US", {
      weekday: "long"
    });

    forecast.innerHTML += `
      <p>${day}: ${Math.round(item.main.temp)}°C</p>
    `;
  });
}

getWeather();
getForecast();