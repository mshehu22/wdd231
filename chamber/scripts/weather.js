const apiKey = "9b50979de6712dbcd1c70fdf65621859";

const currentURL =
    `https://api.openweathermap.org/data/2.5/weather?q=Abuja&units=metric&appid=${apiKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?q=Abuja&units=metric&appid=${apiKey}`;

const weatherContainer =
    document.querySelector("#current-weather");

const forecastContainer =
    document.querySelector("#forecast");

async function getWeather() {
    try {
        const response = await fetch(currentURL);
        const data = await response.json();

        displayCurrent(data);
    } catch (error) {
        console.error(error);
    }
}

async function getForecast() {
    try {
        const response = await fetch(forecastURL);
        const data = await response.json();

        displayForecast(data);
    } catch (error) {
        console.error(error);
    }
}

function displayCurrent(data) {
    weatherContainer.innerHTML = `
        <p><strong>${data.main.temp}°C</strong></p>
        <p>${data.weather[0].description}</p>
    `;
}

function displayForecast(data) {

    const forecast = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    let html = "";

    forecast.slice(0, 3).forEach(day => {

        const date = new Date(day.dt_txt);

        html += `
            <p>
                ${date.toLocaleDateString("en-US", {
                    weekday: "long"
                })} :
                ${day.main.temp}°C
            </p>
        `;
    });

    forecastContainer.innerHTML = html;
}

getWeather();
getForecast();