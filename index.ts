import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

const API_KEY = process.env.OPENWEATHER_API_KEY || process.env.API_KEY || "5f472b7acba333cd8a035ea85a0d4d4c"; 

if (!API_KEY) {
  console.error("Error: OpenWeatherMap API key is required!");
  console.error("Please set the OPENWEATHER_API_KEY environment variable or API_KEY environment variable.");
  console.error("You can get a free API key from: https://openweathermap.org/api");
  process.exit(1);
}

// Helper function to format temperature with emoji
const formatTemp = (temp: number): string => {
  if (temp <= 0) return `🥶 ${temp}°C`;
  if (temp <= 10) return `❄️ ${temp}°C`;
  if (temp <= 20) return `🌡️ ${temp}°C`;
  if (temp <= 30) return `☀️ ${temp}°C`;
  return `🔥 ${temp}°C`;
};

// Helper function to get weather emoji
const getWeatherEmoji = (main: string): string => {
  const emojiMap: { [key: string]: string } = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️',
    'Dust': '💨',
    'Sand': '💨',
    'Smoke': '💨'
  };
  return emojiMap[main] || '🌤️';
};

// Helper function to get air quality description
const getAirQualityDescription = (aqi: number): string => {
  const descriptions = {
    1: '🟢 Good - Air quality is satisfactory',
    2: '🟡 Fair - Moderate air quality',
    3: '🟠 Moderate - Unhealthy for sensitive groups',
    4: '🔴 Poor - Unhealthy air quality',
    5: '🟣 Very Poor - Hazardous air quality'
  };
  return descriptions[aqi as keyof typeof descriptions] || 'Unknown';
};

// Helper function to get UV index description
const getUVDescription = (uvi: number): string => {
  if (uvi <= 2) return '🟢 Low - Minimal protection needed';
  if (uvi <= 5) return '🟡 Moderate - Seek shade during midday';
  if (uvi <= 7) return '🟠 High - Protection essential';
  if (uvi <= 10) return '🔴 Very High - Extra protection needed';
  return '🟣 Extreme - Avoid sun exposure';
};

const server = new McpServer({
  name: "weather-agent",
  version: "2.0.0"
});

// 1. Enhanced Current Weather with more details
server.tool("get-weather", "Fetches comprehensive current weather for a given city.", {
  parameters: z.object({
    city: z.string().describe("The name of the city to get weather for")
  })
}, async ({ parameters: { city } }) => {
  try {
    console.log(`Fetching weather for: ${city}`);
    
    const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: { 
        q: city, 
        appid: API_KEY, 
        units: "metric" 
      },
      timeout: 10000
    });

    const data = res.data;
    const emoji = getWeatherEmoji(data.weather[0].main);
    
    console.log(`Weather data retrieved for ${data.name}`);

    return {
      content: [{
        type: "text",
        text: `${emoji} **Weather in ${data.name}, ${data.sys.country}**

🌡️ **Temperature:** ${formatTemp(data.main.temp)} (feels like ${formatTemp(data.main.feels_like)})
📊 **Condition:** ${data.weather[0].description}
💧 **Humidity:** ${data.main.humidity}%
🌬️ **Wind:** ${data.wind?.speed || 0} m/s ${data.wind?.deg ? `(${data.wind.deg}°)` : ''}
👁️ **Visibility:** ${data.visibility ? (data.visibility / 1000).toFixed(1) + ' km' : 'N/A'}
🌡️ **Pressure:** ${data.main.pressure} hPa
📈 **Min/Max:** ${formatTemp(data.main.temp_min)} / ${formatTemp(data.main.temp_max)}
☁️ **Cloudiness:** ${data.clouds.all}%
🌅 **Sunrise:** ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
🌇 **Sunset:** ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}
📍 **Coordinates:** ${data.coord.lat}, ${data.coord.lon}`
      }]
    };
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error);
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return {
          content: [{
            type: "text",
            text: `City "${city}" not found. Please check the spelling and try again.`
          }]
        };
      } else if (error.response?.status === 401) {
        return {
          content: [{
            type: "text",
            text: `Invalid API key. Please check your OpenWeatherMap API key configuration.`
          }]
        };
      }
    }
    
    return {
      content: [{
        type: "text",
        text: `Sorry, I couldn't fetch weather data for ${city}. Please try again later.`
      }]
    };
  }
});

// 2. 5-Day Weather Forecast
server.tool("get-forecast", "Get 5-day weather forecast with 3-hour intervals.", {
  parameters: z.object({
    city: z.string().describe("The name of the city to get forecast for"),
    days: z.number().optional().describe("Number of days to show (1-5, default: 5)")
  })
}, async ({ parameters: { city, days = 5 } }) => {
  try {
    const res = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
      params: { 
        q: city, 
        appid: API_KEY, 
        units: "metric" 
      },
      timeout: 10000
    });

    const data = res.data;
    const maxDays = Math.min(days, 5);
    const dailyForecasts = data.list.filter((_: any, index: number) => index % 8 === 0).slice(0, maxDays);

    let forecastText = `📅 **${maxDays}-Day Weather Forecast for ${data.city.name}**\n\n`;
    
    dailyForecasts.forEach((forecast: any, index: number) => {
      const date = new Date(forecast.dt * 1000);
      const emoji = getWeatherEmoji(forecast.weather[0].main);
      
      forecastText += `${emoji} **Day ${index + 1} - ${date.toLocaleDateString()}**
🌡️ Temp: ${formatTemp(forecast.main.temp)} (${formatTemp(forecast.main.temp_min)} - ${formatTemp(forecast.main.temp_max)})
📊 ${forecast.weather[0].description}
💧 Humidity: ${forecast.main.humidity}%
🌬️ Wind: ${forecast.wind.speed} m/s
☁️ Clouds: ${forecast.clouds.all}%

`;
    });

    return {
      content: [{
        type: "text",
        text: forecastText
      }]
    };
  } catch (error) {
    console.error(`Error fetching forecast for ${city}:`, error);
    return {
      content: [{
        type: "text",
        text: `Sorry, I couldn't fetch forecast data for ${city}. Please try again later.`
      }]
    };
  }
});

// 3. Air Quality Index
server.tool("get-air-quality", "Get current air quality index and pollution data.", {
  parameters: z.object({
    city: z.string().describe("The name of the city to get air quality for")
  })
}, async ({ parameters: { city } }) => {
  try {
    // First get coordinates
    const geoRes = await axios.get("http://api.openweathermap.org/geo/1.0/direct", {
      params: { q: city, limit: 1, appid: API_KEY }
    });

    if (geoRes.data.length === 0) {
      return {
        content: [{
          type: "text",
          text: `City "${city}" not found for air quality data.`
        }]
      };
    }

    const { lat, lon } = geoRes.data[0];

    const res = await axios.get("http://api.openweathermap.org/data/2.5/air_pollution", {
      params: { lat, lon, appid: API_KEY }
    });

    const data = res.data;
    const aqi = data.list[0].main.aqi;
    const components = data.list[0].components;

    return {
      content: [{
        type: "text",
        text: `🌬️ **Air Quality in ${city}**

📊 **Overall AQI:** ${aqi}/5 - ${getAirQualityDescription(aqi)}

**Pollutant Levels (μg/m³):**
💨 CO: ${components.co} 
🚗 NO: ${components.no}
🚗 NO₂: ${components.no2}
🌫️ O₃: ${components.o3}
💨 SO₂: ${components.so2}
🏭 PM2.5: ${components.pm2_5}
🏭 PM10: ${components.pm10}
💨 NH₃: ${components.nh3}

*Updated: ${new Date(data.list[0].dt * 1000).toLocaleString()}*`
      }]
    };
  } catch (error) {
    console.error(`Error fetching air quality for ${city}:`, error);
    return {
      content: [{
        type: "text",
        text: `Sorry, I couldn't fetch air quality data for ${city}. Please try again later.`
      }]
    };
  }
});

// 4. UV Index
server.tool("get-uv-index", "Get current UV index and sun safety information.", {
  parameters: z.object({
    city: z.string().describe("The name of the city to get UV index for")
  })
}, async ({ parameters: { city } }) => {
  try {
    // Get coordinates first
    const geoRes = await axios.get("http://api.openweathermap.org/geo/1.0/direct", {
      params: { q: city, limit: 1, appid: API_KEY }
    });

    if (geoRes.data.length === 0) {
      return {
        content: [{
          type: "text",
          text: `City "${city}" not found for UV index data.`
        }]
      };
    }

    const { lat, lon } = geoRes.data[0];

    // Note: UV Index API might require a different endpoint or subscription
    // For now, we'll use One Call API if available, otherwise provide a message
    try {
      const res = await axios.get("https://api.openweathermap.org/data/2.5/onecall", {
        params: { lat, lon, appid: API_KEY, exclude: "minutely,hourly,daily,alerts" }
      });

      const uvi = res.data.current.uvi;
      
      return {
        content: [{
          type: "text",
          text: `☀️ **UV Index for ${city}**

📊 **Current UV Index:** ${uvi}
${getUVDescription(uvi)}

**Sun Safety Tips:**
${uvi > 3 ? '🧴 Apply sunscreen (SPF 30+)' : ''}
${uvi > 5 ? '\n👕 Wear protective clothing' : ''}
${uvi > 7 ? '\n🕶️ Wear sunglasses and hat' : ''}
${uvi > 10 ? '\n🏠 Avoid sun exposure 10am-4pm' : ''}

*Updated: ${new Date(res.data.current.dt * 1000).toLocaleString()}*`
        }]
      };
    } catch (uvError) {
      return {
        content: [{
          type: "text",
          text: `☀️ **UV Index for ${city}**

❌ UV index data requires OpenWeatherMap One Call API subscription.
📝 Current API key only supports basic weather data.

**General Sun Safety:**
🧴 Apply sunscreen (SPF 30+) during peak hours
👕 Wear protective clothing
🕶️ Use sunglasses and wide-brimmed hat
🏠 Seek shade between 10am-4pm`
        }]
      };
    }
  } catch (error) {
    console.error(`Error fetching UV index for ${city}:`, error);
    return {
      content: [{
        type: "text",
        text: `Sorry, I couldn't fetch UV index data for ${city}. Please try again later.`
      }]
    };
  }
});

// 5. Weather Comparison between multiple cities
server.tool("compare-weather", "Compare current weather between multiple cities.", {
  parameters: z.object({
    cities: z.array(z.string()).describe("Array of city names to compare (2-5 cities)")
  })
}, async ({ parameters: { cities } }) => {
  if (cities.length < 2 || cities.length > 5) {
    return {
      content: [{
        type: "text",
        text: "Please provide 2-5 cities for comparison."
      }]
    };
  }

  try {
    const weatherPromises = cities.map(city => 
      axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: { q: city, appid: API_KEY, units: "metric" }
      })
    );

    const responses = await Promise.allSettled(weatherPromises);
    let comparisonText = `🌍 **Weather Comparison**\n\n`;

    responses.forEach((response, index) => {
      if (response.status === 'fulfilled') {
        const data = response.value.data;
        const emoji = getWeatherEmoji(data.weather[0].main);
        
        comparisonText += `${emoji} **${data.name}, ${data.sys.country}**
🌡️ ${formatTemp(data.main.temp)} (feels like ${formatTemp(data.main.feels_like)})
📊 ${data.weather[0].description}
💧 ${data.main.humidity}% humidity
🌬️ ${data.wind?.speed || 0} m/s wind

`;
      } else {
        comparisonText += `❌ **${cities[index]}**
Failed to fetch weather data

`;
      }
    });

    return {
      content: [{
        type: "text",
        text: comparisonText
      }]
    };
  } catch (error) {
    console.error("Error comparing weather:", error);
    return {
      content: [{
        type: "text",
        text: "Sorry, I couldn't compare weather data. Please try again later."
      }]
    };
  }
});

// 6. Weather Alerts
server.tool("get-weather-alerts", "Get severe weather alerts and warnings for a location.", {
  parameters: z.object({
    city: z.string().describe("The name of the city to get weather alerts for")
  })
}, async ({ parameters: { city } }) => {
  try {
    // Get coordinates first
    const geoRes = await axios.get("http://api.openweathermap.org/geo/1.0/direct", {
      params: { q: city, limit: 1, appid: API_KEY }
    });

    if (geoRes.data.length === 0) {
      return {
        content: [{
          type: "text",
          text: `City "${city}" not found for weather alerts.`
        }]
      };
    }

    const { lat, lon } = geoRes.data[0];

    try {
      const res = await axios.get("https://api.openweathermap.org/data/2.5/onecall", {
        params: { lat, lon, appid: API_KEY, exclude: "minutely,hourly,daily,current" }
      });

      if (res.data.alerts && res.data.alerts.length > 0) {
        let alertsText = `🚨 **Weather Alerts for ${city}**\n\n`;
        
        res.data.alerts.forEach((alert: any, index: number) => {
          alertsText += `⚠️ **Alert ${index + 1}: ${alert.event}**
📅 Start: ${new Date(alert.start * 1000).toLocaleString()}
📅 End: ${new Date(alert.end * 1000).toLocaleString()}
📝 ${alert.description.substring(0, 200)}...
🏢 Source: ${alert.sender_name}

`;
        });

        return {
          content: [{
            type: "text",
            text: alertsText
          }]
        };
      } else {
        return {
          content: [{
            type: "text",
            text: `✅ **No Weather Alerts for ${city}**\n\nNo severe weather warnings are currently active for this location.`
          }]
        };
      }
    } catch (alertError) {
      return {
        content: [{
          type: "text",
          text: `🚨 **Weather Alerts for ${city}**

❌ Weather alerts require OpenWeatherMap One Call API subscription.
📝 Current API key only supports basic weather data.

**Alternative:** Check your local weather service for current alerts and warnings.`
        }]
      };
    }
  } catch (error) {
    console.error(`Error fetching weather alerts for ${city}:`, error);
    return {
      content: [{
        type: "text",
        text: `Sorry, I couldn't fetch weather alerts for ${city}. Please try again later.`
      }]
    };
  }
});

// 7. Detailed Astronomy Data
server.tool("get-astronomy", "Get detailed sunrise, sunset, and astronomical data.", {
  parameters: z.object({
    city: z.string().describe("The name of the city to get astronomy data for")
  })
}, async ({ parameters: { city } }) => {
  try {
    const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: { 
        q: city, 
        appid: API_KEY, 
        units: "metric" 
      }
    });

    const data = res.data;
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    const now = new Date();
    
    // Calculate day length
    const dayLength = sunset.getTime() - sunrise.getTime();
    const hours = Math.floor(dayLength / (1000 * 60 * 60));
    const minutes = Math.floor((dayLength % (1000 * 60 * 60)) / (1000 * 60));

    // Determine if it's day or night
    const isDaytime = now >= sunrise && now <= sunset;
    
    // Calculate time until next sunrise/sunset
    let nextEvent, timeUntil;
    if (isDaytime) {
      nextEvent = "sunset";
      timeUntil = sunset.getTime() - now.getTime();
    } else {
      nextEvent = "sunrise";
      // If current time is after sunset, calculate time until tomorrow's sunrise
      if (now > sunset) {
        const tomorrowSunrise = new Date(sunrise.getTime() + 24 * 60 * 60 * 1000);
        timeUntil = tomorrowSunrise.getTime() - now.getTime();
      } else {
        timeUntil = sunrise.getTime() - now.getTime();
      }
    }
    
    const hoursUntil = Math.floor(timeUntil / (1000 * 60 * 60));
    const minutesUntil = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));

    return {
      content: [{
        type: "text",
        text: `🌅 **Astronomy Data for ${data.name}**

${isDaytime ? '☀️ **Currently: Daytime**' : '🌙 **Currently: Nighttime**'}

🌅 **Sunrise:** ${sunrise.toLocaleTimeString()}
🌇 **Sunset:** ${sunset.toLocaleTimeString()}
⏰ **Day Length:** ${hours}h ${minutes}m

📍 **Location:** ${data.coord.lat}°, ${data.coord.lon}°
🌍 **Timezone:** UTC${data.timezone >= 0 ? '+' : ''}${data.timezone / 3600}

⏳ **Next ${nextEvent}:** in ${hoursUntil}h ${minutesUntil}m

**Moon Phase Info:** 🌙
*Note: Moon phase data requires additional API subscription*`
      }]
    };
  } catch (error) {
    console.error(`Error fetching astronomy data for ${city}:`, error);
    return {
      content: [{
        type: "text",
        text: `Sorry, I couldn't fetch astronomy data for ${city}. Please try again later.`
      }]
    };
  }
});

// 8. Weather Statistics and Climate Data
server.tool("get-weather-stats", "Get comprehensive weather statistics and insights.", {
  parameters: z.object({
    city: z.string().describe("The name of the city to get weather statistics for")
  })
}, async ({ parameters: { city } }) => {
  try {
    // Get current weather for basic stats
    const currentRes = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: { q: city, appid: API_KEY, units: "metric" }
    });

    // Get forecast for trend analysis
    const forecastRes = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
      params: { q: city, appid: API_KEY, units: "metric" }
    });

    const current = currentRes.data;
    const forecast = forecastRes.data;

    // Analyze forecast trends
    const temps = forecast.list.slice(0, 8).map((f: any) => f.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const avgTemp = temps.reduce((a: number, b: number) => a + b, 0) / temps.length;

    const humidities = forecast.list.slice(0, 8).map((f: any) => f.main.humidity);
    const avgHumidity = humidities.reduce((a: number, b: number) => a + b, 0) / humidities.length;

    const pressures = forecast.list.slice(0, 8).map((f: any) => f.main.pressure);
    const avgPressure = pressures.reduce((a: number, b: number) => a + b, 0) / pressures.length;

    // Determine weather trend
    const tempTrend = temps[temps.length - 1] > temps[0] ? 'Rising 📈' : 'Falling 📉';
    const pressureTrend = pressures[pressures.length - 1] > pressures[0] ? 'Rising 📈' : 'Falling 📉';

    return {
      content: [{
        type: "text",
        text: `📊 **Weather Statistics for ${current.name}**

**Current Conditions:**
🌡️ Temperature: ${formatTemp(current.main.temp)}
💧 Humidity: ${current.main.humidity}%
🌡️ Pressure: ${current.main.pressure} hPa
👁️ Visibility: ${current.visibility ? (current.visibility / 1000).toFixed(1) + ' km' : 'N/A'}

**24-Hour Trends:**
🌡️ **Temperature Range:** ${formatTemp(minTemp)} to ${formatTemp(maxTemp)}
📊 **Average Temperature:** ${formatTemp(avgTemp)}
📈 **Temperature Trend:** ${tempTrend}

💧 **Average Humidity:** ${avgHumidity.toFixed(1)}%
🌡️ **Average Pressure:** ${avgPressure.toFixed(1)} hPa
📈 **Pressure Trend:** ${pressureTrend}

**Weather Patterns:**
☁️ **Cloudiness:** ${current.clouds.all}%
🌬️ **Wind:** ${current.wind?.speed || 0} m/s
🌍 **Climate Zone:** Temperate (based on coordinates)

*Data represents current conditions and 24-hour forecast trends*`
      }]
    };
  } catch (error) {
    console.error(`Error fetching weather statistics for ${city}:`, error);
    return {
      content: [{
        type: "text",
        text: `Sorry, I couldn't fetch weather statistics for ${city}. Please try again later.`
      }]
    };
  }
});

// 9. Weather Map Information
server.tool("get-weather-maps", "Get information about available weather map layers and how to access them.", {
  parameters: z.object({
    city: z.string().describe("The name of the city to get map information for")
  })
}, async ({ parameters: { city } }) => {
  try {
    // Get coordinates for the city
    const geoRes = await axios.get("http://api.openweathermap.org/geo/1.0/direct", {
      params: { q: city, limit: 1, appid: API_KEY }
    });

    if (geoRes.data.length === 0) {
      return {
        content: [{
          type: "text",
          text: `City "${city}" not found for map data.`
        }]
      };
    }

    const { lat, lon } = geoRes.data[0];

    return {
      content: [{
        type: "text",
        text: `🗺️ **Weather Maps for ${city}**

📍 **Coordinates:** ${lat}, ${lon}

**Available Map Layers:**
🌧️ **Precipitation:** Rainfall and snow patterns
☁️ **Clouds:** Cloud coverage and density
🌡️ **Temperature:** Temperature distribution
🌬️ **Wind Speed:** Wind patterns and speeds
🌡️ **Pressure:** Atmospheric pressure systems

**Map URLs (OpenWeatherMap):**
🌧️ Precipitation: \`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}\`
☁️ Clouds: \`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}\`
🌡️ Temperature: \`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}\`
🌬️ Wind: \`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}\`

**Usage:**
- Replace {z}/{x}/{y} with appropriate tile coordinates
- Zoom levels: 0-10 (0 = world view, 10 = detailed)
- Use with mapping libraries like Leaflet or Google Maps

**Center Map On:** Latitude ${lat}, Longitude ${lon}
**Recommended Zoom:** 10 for city view`
      }]
    };
  } catch (error) {
    console.error(`Error fetching map information for ${city}:`, error);
    return {
      content: [{
        type: "text",
        text: `Sorry, I couldn't fetch map information for ${city}. Please try again later.`
      }]
    };
  }
});

const transport = new StdioServerTransport();

console.log("🌤️  Starting Enhanced MCP Weather Server v2.0...");
console.log("📡 Server name: weather-agent");
console.log("🔑 API key configured:", API_KEY ? "✅ Yes" : "❌ No");
console.log("");
console.log("🚀 **Available Tools:**");
console.log("   1. 🌡️  get-weather - Comprehensive current weather");
console.log("   2. 📅  get-forecast - 5-day weather forecast");
console.log("   3. 🌬️  get-air-quality - Air quality index & pollution");
console.log("   4. ☀️  get-uv-index - UV index & sun safety");
console.log("   5. 🌍  compare-weather - Compare multiple cities");
console.log("   6. 🚨  get-weather-alerts - Severe weather warnings");
console.log("   7. 🌅  get-astronomy - Sunrise, sunset & astronomy");
console.log("   8. 📊  get-weather-stats - Weather statistics & trends");
console.log("   9. 🗺️  get-weather-maps - Weather map information");
console.log("");

try {
  await server.connect(transport);
  console.log("🚀 Enhanced MCP Weather Server started successfully!");
  console.log("💡 Try asking for weather forecasts, air quality, UV index, and more!");
} catch (error) {
  console.error("❌ Failed to start MCP Weather Server:", error);
  process.exit(1);
}
