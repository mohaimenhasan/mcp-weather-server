import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

const API_KEY = process.env.OPENWEATHER_API_KEY || process.env.API_KEY || "ADD_YOUR_API_KEY_HERE"; 

if (!API_KEY) {
  console.error("Error: OpenWeatherMap API key is required!");
  console.error("Please set the OPENWEATHER_API_KEY environment variable or API_KEY environment variable.");
  console.error("You can get a free API key from: https://openweathermap.org/api");
  process.exit(1);
}

const server = new McpServer({
  name: "weather-agent",
  version: "1.0.0"
});

server.tool("get-weather", "Fetches the current weather for a given city.", {
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
      timeout: 10000 // 10 second timeout
    });

    const data = res.data;
    
    console.log(`Weather data retrieved for ${data.name}`);

    return {
      content: [{
        type: "text",
        text: `Weather in ${data.name}: ${data.weather[0].description}, ${data.main.temp}°C (feels like ${data.main.feels_like}°C). Humidity: ${data.main.humidity}%, Wind: ${data.wind?.speed || 0} m/s`
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

const transport = new StdioServerTransport();

console.log("🌤️  Starting MCP Weather Server...");
console.log("📡 Server name: weather-agent");
console.log("🔑 API key configured:", API_KEY ? "✅ Yes" : "❌ No");

try {
  await server.connect(transport);
  console.log("🚀 MCP Weather Server started successfully!");
} catch (error) {
  console.error("❌ Failed to start MCP Weather Server:", error);
  process.exit(1);
}
