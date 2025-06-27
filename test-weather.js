import axios from 'axios';

const API_KEY = '5f472b7acba333cd8a035ea85a0d4d4c';
const city = 'Toronto';

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
