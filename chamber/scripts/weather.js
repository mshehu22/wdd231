// OpenWeather API key
const apiKey = "9b50979de6712dbcd1c70fdf65621859";


// API URLs
const currentURL =
    `https://api.openweathermap.org/data/2.5/weather?q=Abuja,Nigeria&units=metric&appid=${apiKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?q=Abuja,Nigeria&units=metric&appid=${apiKey}`;


// Page elements
const weatherContainer = document.querySelector("#current-weather");
const forecastContainer = document.querySelector("#forecast");


// Get current weather
async function getWeather() {

    if (!weatherContainer) return;

    try {

        const response = await fetch(currentURL);

        if (!response.ok) {
            throw new Error("Weather data unavailable");
        }

        const data = await response.json();

        displayCurrent(data);

    } catch (error) {

        weatherContainer.innerHTML =
            "<p>Unable to load weather information.</p>";

        console.error(error);

    }
}


// Get forecast
async function getForecast() {

    if (!forecastContainer) return;

    try {

        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error("Forecast data unavailable");
        }

        const data = await response.json();

        displayForecast(data);

    } catch (error) {

        forecastContainer.innerHTML =
            "<p>Unable to load forecast.</p>";

        console.error(error);

    }
}



// Display current weather
function displayCurrent(data) {

    const icon =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;


    weatherContainer.innerHTML = `

        <img src="${icon}"
             alt="${data.weather[0].description}"
             loading="lazy">

        <p>
            <strong>${Math.round(data.main.temp)}°C</strong>
        </p>

        <p>
            ${data.weather[0].description}
        </p>

        <p>
            Humidity: ${data.main.humidity}%
        </p>

    `;
}



// Display 3-day forecast
function displayForecast(data) {

    const forecast = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );


    let html = "<h3>3-Day Forecast</h3>";


    forecast.slice(0, 3).forEach(day => {

        const date = new Date(day.dt_txt);


        html += `

            <p>
                <strong>
                    ${date.toLocaleDateString("en-US", {
                        weekday: "long"
                    })}
                </strong>

                :
                ${Math.round(day.main.temp)}°C

            </p>

        `;

    });


    forecastContainer.innerHTML = html;

}



// Run functions
getWeather();
getForecast();