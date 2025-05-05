import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

const API_KEY = "<add you API key here>"; // Replace with your OpenWeatherMap API key

const server = new McpServer({
  name: "weather-agent",
  version: "1.0.0"
});

server.tool("get-weather", "Fetches the current weather for a given city.", {
  parameters: z.object({
    city: z.string()
  })
}, async ({ parameters: { city } }) => {
  const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: { q: city, appid: API_KEY, units: "metric" }
  });

  const data = res.data;

  return {
    content: [{
      type: "text",
      text: `Weather in ${data.name}: ${data.weather[0].description}, ${data.main.temp}°C`
    }]
  };
});

const transport = new StdioServerTransport();

await server.connect(transport);
