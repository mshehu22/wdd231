const apiKey = "9b50979de6712dbcd1c70fdf65621859";


const currentURL =
    `https://api.openweathermap.org/data/2.5/weather?q=Abuja,Nigeria&units=metric&appid=${apiKey}`;


const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?q=Abuja,Nigeria&units=metric&appid=${apiKey}`;


const weatherContainer = document.querySelector("#current-weather");
const forecastContainer = document.querySelector("#forecast");



async function getWeather() {

    if (!weatherContainer) return;


    try {

        const response = await fetch(currentURL);


        if (!response.ok) {

            throw new Error("Weather unavailable");

        }


        const data = await response.json();


        weatherContainer.innerHTML = `

            <img 
            src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
            alt="${data.weather[0].description}">


            <p>
            <strong>
            ${Math.round(data.main.temp)}°C
            </strong>
            </p>


            <p>
            ${data.weather[0].description}
            </p>


            <p>
            Humidity: ${data.main.humidity}%
            </p>

        `;



    } catch(error) {


        weatherContainer.innerHTML =
        "<p>Unable to load weather information.</p>";


        console.error(error);

    }

}





async function getForecast() {


    if (!forecastContainer) return;


    try {


        const response = await fetch(forecastURL);


        if (!response.ok) {

            throw new Error("Forecast unavailable");

        }


        const data = await response.json();


        const days = data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        );


        forecastContainer.innerHTML =
        "<h3>3-Day Forecast</h3>";



        days.slice(0,3).forEach(day => {


            const date = new Date(day.dt_txt);


            forecastContainer.innerHTML += `

            <p>
            ${date.toLocaleDateString("en-US", {
                weekday:"long"
            })}
            :
            ${Math.round(day.main.temp)}°C
            </p>

            `;


        });



    } catch(error) {


        forecastContainer.innerHTML =
        "<p>Unable to load forecast.</p>";


        console.error(error);

    }


}




getWeather();

getForecast();