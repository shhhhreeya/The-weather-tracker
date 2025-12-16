document.addEventListener("DOMContentLoaded", () => {
    const Cityinput = document.getElementById("city-input");
    const getweatherbtn = document.getElementById("get-weather-btn");
    const weatherinfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const TemperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorDisplay = document.getElementById("error-message");

    const API_KEY = `9b3b62d358a051d24663a81be4eed1e0`;

    getweatherbtn.addEventListener("click", async () => {
        const city = Cityinput.value.trim()
        if(!city) return;

        // it may throw an error
        // server/database is always in another continent

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    });


async function fetchWeatherData(city){
    //gets data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

    const response = await fetch(url);
    console.log(typeof response)
    console.log("RESPONSE", response)

    if (!response.ok){
        throw new Error("City not found!");
    }
    const data = await response.json();
    return data;
}
async function displayWeatherData(weatherData){
    //displays data
    console.log(weatherData); //shows the data fetched in web console
    const {name, main, weather} = weatherData; //name is string, main is obj and weather is array
    cityNameDisplay.textContent = name;
    TemperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    //unlock the display
    weatherinfo.classList.remove("hidden");
    errorDisplay.classList.add("hidden");

}
async function showError(){
    weatherinfo.classList.add("hidden");
    errorDisplay.classList.remove("hidden");
}

});
