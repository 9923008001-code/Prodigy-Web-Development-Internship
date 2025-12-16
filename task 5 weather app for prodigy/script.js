let isCelsius = true;
let lastTemp = 0;

// Date & Time
function updateDateTime() {
    const now = new Date();
    document.getElementById("dateTime").innerText =
        now.toLocaleDateString() + " | " + now.toLocaleTimeString();
}
updateDateTime();
setInterval(updateDateTime, 1000);

// Weather code → icon & text
function getCondition(code) {
    if (code === 0) return "☀ Clear Sky";
    if (code <= 3) return "⛅ Partly Cloudy";
    if (code <= 48) return "🌫 Fog";
    if (code <= 67) return "🌧 Rain";
    if (code <= 77) return "❄ Snow";
    return "⛈ Thunderstorm";
}

// Toggle Celsius ↔ Fahrenheit
function toggleUnit() {
    if (lastTemp === 0) return;

    isCelsius = !isCelsius;
    const temp = isCelsius
        ? lastTemp
        : (lastTemp * 9 / 5) + 32;

    document.getElementById("tempValue").innerText =
        temp.toFixed(1) + (isCelsius ? " °C" : " °F");
}

// Get weather by city
function getWeatherByCity() {
    const city = document.getElementById("cityInput").value;
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    showLoader(true);

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
        .then(res => res.json())
        .then(data => {
            if (!data.results) {
                showLoader(false);
                document.getElementById("weather").innerText = "City not found";
                return;
            }

            fetchWeather(data.results[0].latitude, data.results[0].longitude, city);
        });
}

// Get weather by location
function getWeatherByLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    showLoader(true);

    navigator.geolocation.getCurrentPosition(pos => {
        fetchWeather(pos.coords.latitude, pos.coords.longitude, "Your Location");
    });
}

// Fetch weather
function fetchWeather(lat, lon, place) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(res => res.json())
        .then(data => {
            showLoader(false);

            lastTemp = data.current_weather.temperature;
            isCelsius = true;

            document.getElementById("weather").innerHTML = `
                <h3>${place}</h3>
                <p id="tempValue">🌡 ${lastTemp} °C</p>
                <p>🌬 Wind: ${data.current_weather.windspeed} km/h</p>
                <p>${getCondition(data.current_weather.weathercode)}</p>
            `;
        });
}

// Loader
function showLoader(show) {
    document.getElementById("loader").style.display = show ? "block" : "none";
}
