import axios from 'axios';

const API_KEY = process.env.OPENWEATHER_API_KEY || process.env.API_KEY;
const city = 'Toronto';

if (!API_KEY) {
  console.error("Error: OpenWeatherMap API key is required!");
  console.error("Please set the OPENWEATHER_API_KEY environment variable or API_KEY environment variable.");
  process.exit(1);
}

try {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric'
    }
  });

  const data = response.data;
  console.log(`🌤️ Weather in ${data.name}: ${data.weather[0].description}, ${data.main.temp}°C (feels like ${data.main.feels_like}°C). Humidity: ${data.main.humidity}%, Wind: ${data.wind?.speed || 0} m/s`);
} catch (error) {
  console.error('Error fetching weather:', error.message);
}
