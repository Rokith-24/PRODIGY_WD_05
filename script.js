document.getElementById('location-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const location = document.getElementById('location-input').value;
    fetchWeatherData(location);
});

function fetchWeatherData(location) {
    const apiKey = '7183c5c0d71e901df2ffa3bbaa2952c5'; // Replace with your weather API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeatherData(data);
            } else {
                alert('Location not found!');
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
}

function displayWeatherData(data) {
    document.getElementById('location-name').textContent = data.name;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('weather-description').textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;

    const weatherIconClass = getWeatherIconClass(data.weather[0].icon);
    document.getElementById('weather-icon').className = `wi ${weatherIconClass}`;

    document.getElementById('weather-info').style.display = 'block';
}

function getWeatherIconClass(iconCode) {
    const iconMapping = {
        '01d': 'wi-day-sunny',
        '01n': 'wi-night-clear',
        '02d': 'wi-day-cloudy',
        '02n': 'wi-night-alt-cloudy',
        '03d': 'wi-cloud',
        '03n': 'wi-cloud',
        '04d': 'wi-cloudy',
        '04n': 'wi-cloudy',
        '09d': 'wi-showers',
        '09n': 'wi-showers',
        '10d': 'wi-day-rain',
        '10n': 'wi-night-alt-rain',
        '11d': 'wi-thunderstorm',
        '11n': 'wi-thunderstorm',
        '13d': 'wi-snow',
        '13n': 'wi-snow',
        '50d': 'wi-fog',
        '50n': 'wi-fog'
    };
    return iconMapping[iconCode] || 'wi-na';
}
