# 🌤️ Enhanced MCP Weather Server v2.0

A **comprehensive** Model Context Protocol (MCP) server that provides extensive weather data, forecasts, air quality, UV index, and much more! Get detailed weather information directly in your VS Code chat with 9 powerful tools.

[![MCP Review Certified](https://img.shields.io/badge/MCP-Review%20Certified-blue)](https://mcpreview.com/mcp-servers/mohaimenhasan/mcp-weather-server)

## 🚀 **What Makes This Special?**

This isn't just another weather tool - it's a **comprehensive weather intelligence system** that provides:

### 🎯 **9 Powerful Weather Tools:**

1. **🌡️ Enhanced Current Weather** - Detailed conditions with emojis and comprehensive data
2. **📅 5-Day Weather Forecast** - Complete weather predictions with trends
3. **🌬️ Air Quality Index** - Real-time pollution levels and health warnings
4. **☀️ UV Index & Sun Safety** - Solar radiation levels with safety recommendations
5. **🌍 Multi-City Comparison** - Compare weather across multiple locations
6. **🚨 Weather Alerts** - Severe weather warnings and emergency notifications
7. **🌅 Astronomy Data** - Sunrise, sunset, day length, and astronomical information
8. **📊 Weather Statistics** - Comprehensive trends, averages, and climate insights
9. **🗺️ Weather Maps** - Access to radar, satellite, and weather map data

### 💡 **Why Use This Tool?**

**For Developers:**
- 🏗️ **Building weather apps?** Get comprehensive data in one place
- 🌐 **Need location-based features?** Access weather, air quality, and astronomy data
- 📱 **Creating travel apps?** Compare weather across multiple destinations
- 🎯 **Building outdoor apps?** Get UV index, air quality, and safety information

**For Data Analysis:**
- 📊 **Weather trends and patterns** for business intelligence
- 🌡️ **Climate data analysis** for research projects
- 📈 **Multi-city comparisons** for location planning
- 🗺️ **Geographic weather mapping** for visualization projects

**For Personal Use:**
- ✈️ **Travel planning** with detailed forecasts and air quality
- 🏃 **Outdoor activities** with UV index and weather safety
- 🌍 **Multi-location monitoring** for family/business across cities
- 📱 **Comprehensive weather briefings** beyond basic conditions

**For Content Creation:**
- 📝 **Weather-aware content** with detailed environmental data
- 🎥 **Location scouting** with comprehensive weather analysis
- 📊 **Data visualization** with rich weather statistics
- 🌡️ **Climate storytelling** with historical and trend data

> **🚨 Quick Note:** If the install buttons below open in your browser instead of VS Code, use **Method 1** below for manual configuration - it's more reliable!

## 🚀 **Easy Installation Methods**

### 🎯 **Method 1: Manual Configuration (Most Reliable)**

1. **Clone and build:**
   ```bash
   git clone https://github.com/mohaimenhasan/mcp-weather-server.git
   cd mcp-weather-server
   npm run setup
   ```

2. **Get your API key:**
   - Visit [OpenWeatherMap](https://openweathermap.org/api) (free account)
   - Copy your API key

3. **Add to VS Code:**
   - Open VS Code
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Preferences: Open User Settings (JSON)"
   - Add this to your settings:
   ```json
   {
     "mcp.servers": {
       "weather-mcp": {
         "type": "stdio",
         "command": "node",
         "args": ["C:\\Users\\mohaimenkhan\\source\\repos\\mcp-weather-server\\dist\\index.js"],
         "env": {
           "OPENWEATHER_API_KEY": "your_api_key_here"
         }
       }
     }
   }
   ```

### 🔗 **Method 2: One-Click URLs (If MCP Extension is Installed)**

[![Open in Visual Studio Code Insiders](https://raw.githubusercontent.com/jongio/memealyzer/main/assets/open-in-vscode-insiders.svg)](https://tinyurl.com/mcpweatherinsiders)




## ✨ All Features & Examples

### �️ **Enhanced Current Weather**
```
🌤️ Weather in London, GB

🌡️ Temperature: ☀️ 22°C (feels like ☀️ 24°C)
📊 Condition: clear sky
💧 Humidity: 65%
🌬️ Wind: 3.2 m/s (120°)
👁️ Visibility: 10.0 km
🌡️ Pressure: 1013 hPa
📈 Min/Max: ☀️ 18°C / ☀️ 26°C
☁️ Cloudiness: 10%
🌅 Sunrise: 6:42:15 AM
🌇 Sunset: 8:15:30 PM
📍 Coordinates: 51.5074, -0.1278
```

### 📅 **5-Day Weather Forecast**
```
📅 5-Day Weather Forecast for Paris

☀️ Day 1 - 12/27/2024
🌡️ Temp: ☀️ 24°C (☀️ 20°C - ☀️ 28°C)
📊 clear sky
💧 Humidity: 68%
🌬️ Wind: 2.1 m/s
☁️ Clouds: 15%
```

### 🌬️ **Air Quality Index**
```
🌬️ Air Quality in Tokyo

📊 Overall AQI: 2/5 - 🟡 Fair - Moderate air quality

Pollutant Levels (μg/m³):
� CO: 233.75
🚗 NO: 0.01
🚗 NO₂: 8.13
🌫️ O₃: 78.32
💨 SO₂: 1.64
🏭 PM2.5: 5.15
🏭 PM10: 8.04
💨 NH₃: 0.63
```

### ☀️ **UV Index & Sun Safety**
```
☀️ UV Index for Sydney

📊 Current UV Index: 7.2
🟠 High - Protection essential

Sun Safety Tips:
🧴 Apply sunscreen (SPF 30+)
👕 Wear protective clothing
🕶️ Wear sunglasses and hat
```

### 🌍 **Multi-City Weather Comparison**
```
🌍 Weather Comparison

☀️ London, GB
🌡️ ☀️ 22°C (feels like ☀️ 24°C)
📊 clear sky
💧 65% humidity
🌬️ 3.2 m/s wind

🌧️ Seattle, US
🌡️ 🌡️ 16°C (feels like 🌡️ 14°C)
📊 moderate rain
💧 85% humidity
🌬️ 5.1 m/s wind
```

### 🚨 **Weather Alerts**
```
🚨 Weather Alerts for Miami

⚠️ Alert 1: Hurricane Warning
📅 Start: 12/27/2024, 2:00:00 PM
📅 End: 12/28/2024, 8:00:00 AM
📝 Hurricane conditions expected...
🏢 Source: National Weather Service
```

### 🌅 **Astronomy Data**
```
🌅 Astronomy Data for Tokyo

☀️ Currently: Daytime

🌅 Sunrise: 6:47:12 AM
🌇 Sunset: 4:32:45 PM
⏰ Day Length: 9h 45m

📍 Location: 35.6762°, 139.6503°
🌍 Timezone: UTC+9

⏳ Next sunset: in 3h 15m
```

### 📊 **Weather Statistics & Trends**
```
📊 Weather Statistics for Berlin

Current Conditions:
🌡️ Temperature: 🌡️ 18°C
💧 Humidity: 72%
🌡️ Pressure: 1015 hPa
👁️ Visibility: 8.5 km

24-Hour Trends:
🌡️ Temperature Range: 🌡️ 15°C to ☀️ 21°C
📊 Average Temperature: 🌡️ 18°C
📈 Temperature Trend: Rising 📈

💧 Average Humidity: 68.2%
🌡️ Average Pressure: 1014.8 hPa
📈 Pressure Trend: Rising 📈
```

### 🗺️ **Weather Maps**
```
🗺️ Weather Maps for New York

📍 Coordinates: 40.7128, -74.0060

Available Map Layers:
�️ Precipitation: Rainfall and snow patterns
☁️ Clouds: Cloud coverage and density
🌡️ Temperature: Temperature distribution
🌬️ Wind Speed: Wind patterns and speeds
🌡️ Pressure: Atmospheric pressure systems

Center Map On: Latitude 40.7128, Longitude -74.0060
Recommended Zoom: 10 for city view
```

### Alternative Installation Methods

#### Option 1: Interactive Install Page

Open `install.html` in your browser for a beautiful installation interface with one-click buttons!

```bash
# Open the install page
start install.html        # Windows
open install.html         # macOS  
xdg-open install.html     # Linux
```

#### Option 2: VS Code Workspace Setup

1. **Clone this repository:**
   ```bash
   git clone https://github.com/mohaimenhasan/mcp-weather-server.git
   cd mcp-weather-server
   ```

2. **Open in VS Code:**
   ```bash
   code .
   ```

3. **Run the setup task:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Tasks: Run Task"
   - Select "Setup MCP Server"
   - This will automatically install dependencies and build the project

4. **Get your API key:**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key

5. **The MCP server is pre-configured!** 
   - Copy `.vscode/settings.template.json` to `.vscode/settings.json`
   - Replace `YOUR_API_KEY_HERE` with your actual API key
   - The server configuration is ready to use

#### Option 3: Using Environment Variables (Development)

1. **Clone and setup:**
   ```bash
   git clone https://github.com/mohaimenhasan/mcp-weather-server.git
   cd mcp-weather-server
   npm run setup
   ```

2. **Set up your API key:**
 - In index.ts add your API key or use an env file

3. **The VS Code settings are pre-configured** - just start using it!

#### Option 4: Manual Setup

1. **Quick setup with script:**
   ```bash
   # Windows
   setup.bat
   
   # macOS/Linux  
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Add to VS Code MCP Settings:**
   - Open VS Code Settings (JSON)
   - Add the configuration from `mcp-config.json`
   - Replace `YOUR_API_KEY_HERE` with your actual API key
   - Replace the path with your project's absolute path

#### Option 5: VS Code Command Palette

1. **Install and build:**
   ```bash
   git clone https://github.com/mohaimenhasan/mcp-weather-server.git
   cd mcp-weather-server
   npm run setup
   ```

2. **Add MCP Server:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Search for "MCP: Add Server"
   - Use this configuration:
   ```json
   {
     "type": "stdio",
     "command": "node",
     "args": ["C:\\YOUR_PATH\\mcp-weather-server\\dist\\index.js"],
     "env": {
       "OPENWEATHER_API_KEY": "your_api_key_here"
     }
   }
   ```

## 🎯 Usage Examples

Once installed, you can ask VS Code Copilot questions like:

### 🌡️ **Basic Weather Queries:**
- "What's the weather like in London?"
- "Get me comprehensive weather data for Tokyo"
- "Show me detailed current conditions in New York"

### 📅 **Forecast Queries:**
- "What's the 5-day forecast for Paris?"
- "Give me the weather forecast for Seattle this week"
- "Show me a 3-day forecast for Berlin"

### 🌬️ **Air Quality & Health:**
- "What's the air quality in Beijing?"
- "Check pollution levels in Delhi"
- "Is the air quality safe in Los Angeles?"

### ☀️ **Sun & UV Safety:**
- "What's the UV index in Sydney?"
- "Do I need sunscreen in Miami today?"
- "Check sun safety for outdoor activities in Phoenix"

### 🌍 **Multi-City Comparisons:**
- "Compare weather between London, Paris, and Berlin"
- "Which city has better weather: Miami or San Diego?"
- "Show me weather comparison for Tokyo, Seoul, and Bangkok"

### 🚨 **Weather Alerts:**
- "Are there any weather warnings for Florida?"
- "Check for severe weather alerts in Texas"
- "Show me storm warnings for the East Coast"

### 🌅 **Astronomy & Timing:**
- "When does the sun rise in Moscow?"
- "What time is sunset in Hawaii?"
- "Show me astronomical data for Stockholm"

### 📊 **Weather Analysis:**
- "Give me weather statistics for Chicago"
- "Show weather trends for the past 24 hours in Denver"
- "Analyze weather patterns in San Francisco"

### 🗺️ **Weather Maps:**
- "How can I access weather radar for Dallas?"
- "Show me weather map information for Portland"
- "Get precipitation map data for the Pacific Northwest"

### 💡 **Advanced Usage Examples:**

**Travel Planning:**
"I'm planning a trip to Rome next week. Show me the forecast, air quality, and UV index."

**Outdoor Event Planning:**
"Compare weather conditions between Austin, Nashville, and Denver for an outdoor concert."

**Health & Safety:**
"Check air quality and UV index for Los Angeles - I have respiratory issues and need safe outdoor exercise conditions."

**Agricultural/Gardening:**
"Show me detailed weather statistics and forecast for Portland - I need to plan my garden watering schedule."

**Photography/Filming:**
"Give me sunrise/sunset times and weather conditions for Yosemite for a photo shoot."

## 🛠️ Development

### Prerequisites
- Node.js (>= 18.x)
- npm (>= 9.x)
- OpenWeatherMap API key

### Local Development
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start in development mode (with auto-rebuild)
npm run dev

# Test the server
npm start

# Generate install URLs for your own use
npm run install-urls

# Get manual configuration for VS Code settings
npm run config
```

### Project Structure
```
mcp-weather-server/
├── .vscode/
│   ├── settings.json           # Pre-configured MCP settings (user-specific)
│   ├── settings.template.json  # Template for settings.json
│   ├── tasks.json              # VS Code tasks for easy setup
│   ├── inputs.json             # Input prompts for API key
│   ├── launch.json             # Debug configuration
│   └── extensions.json         # Recommended extensions
├── dist/                       # Compiled JavaScript (generated)
├── index.ts                    # Main server code
├── mcp-config.json            # MCP configuration template
├── install.html               # Beautiful one-click install page
├── generate-install-urls.js   # Script to generate install URLs
├── setup.bat                  # Windows setup script
├── setup.sh                   # Unix setup script
├── .env                       # Environment variables (user-specific)
├── .gitignore                 # Git ignore rules
└── package.json
```

## 🔧 Configuration

The server uses environment variables for configuration:

- `OPENWEATHER_API_KEY` or `API_KEY`: Your OpenWeatherMap API key (required)

## 📡 Complete API Reference

### Available Tools

#### 🌡️ `get-weather`
**Enhanced current weather with comprehensive data**

**Parameters:**
- `city` (string): Name of the city to get weather for

**Returns:**
- Detailed temperature with emoji indicators
- Weather conditions with icons
- Humidity, wind speed, visibility
- Pressure, cloudiness, min/max temps
- Sunrise/sunset times
- Geographic coordinates

#### 📅 `get-forecast`
**5-day weather forecast with detailed predictions**

**Parameters:**
- `city` (string): Name of the city to get forecast for
- `days` (number, optional): Number of days to show (1-5, default: 5)

**Returns:**
- Daily temperature ranges with emojis
- Weather conditions for each day
- Humidity, wind, and cloud coverage
- Organized by day with clear formatting

#### 🌬️ `get-air-quality`
**Air quality index and pollution data**

**Parameters:**
- `city` (string): Name of the city to get air quality for

**Returns:**
- Overall Air Quality Index (1-5 scale)
- Detailed pollutant levels (CO, NO, NO₂, O₃, SO₂, PM2.5, PM10, NH₃)
- Health recommendations based on AQI
- Color-coded quality indicators

#### ☀️ `get-uv-index`
**UV index and sun safety information**

**Parameters:**
- `city` (string): Name of the city to get UV index for

**Returns:**
- Current UV index value
- Safety level description (Low/Moderate/High/Very High/Extreme)
- Specific sun protection recommendations
- Time-based safety advice

#### 🌍 `compare-weather`
**Compare weather between multiple cities**

**Parameters:**
- `cities` (array of strings): Array of city names to compare (2-5 cities)

**Returns:**
- Side-by-side weather comparison
- Temperature, conditions, humidity for each city
- Weather emojis for quick visual reference
- Organized display for easy comparison

#### 🚨 `get-weather-alerts`
**Severe weather alerts and warnings**

**Parameters:**
- `city` (string): Name of the city to get weather alerts for

**Returns:**
- Active weather warnings and alerts
- Alert severity and timing
- Detailed descriptions of weather threats
- Official source attribution

#### 🌅 `get-astronomy`
**Detailed sunrise, sunset, and astronomical data**

**Parameters:**
- `city` (string): Name of the city to get astronomy data for

**Returns:**
- Sunrise and sunset times
- Day length calculation
- Current day/night status
- Time until next sunrise/sunset
- Geographic coordinates and timezone
- Moon phase information (with additional API)

#### 📊 `get-weather-stats`
**Comprehensive weather statistics and trends**

**Parameters:**
- `city` (string): Name of the city to get weather statistics for

**Returns:**
- Current weather conditions summary
- 24-hour temperature trends and ranges
- Pressure and humidity patterns
- Weather trend indicators (rising/falling)
- Statistical analysis of recent conditions

#### 🗺️ `get-weather-maps`
**Weather map information and access URLs**

**Parameters:**
- `city` (string): Name of the city to get map information for

**Returns:**
- Geographic coordinates for mapping
- Available weather layer types
- Direct URLs for weather map tiles
- Integration instructions for mapping libraries
- Recommended zoom levels and center points

### API Response Format

All tools return responses in this format:
```json
{
  "content": [{
    "type": "text",
    "text": "Formatted weather information with emojis and detailed data"
  }]
}
```

### Error Handling

The server handles various error conditions:
- **404 Errors**: City not found - suggests checking spelling
- **401 Errors**: Invalid API key - prompts key configuration check
- **Network Errors**: Timeout or connection issues - suggests retrying
- **API Limitations**: Some features require premium OpenWeatherMap subscription

## 🆘 Troubleshooting

### Common Issues

1. **"Undefined input variable 'openweatherApiKey'" error:**
   - This happens when VS Code can't resolve the input variable
   - **Solution**: Copy `.vscode/settings.template.json` to `.vscode/settings.json` and replace `YOUR_API_KEY_HERE` with your actual API key
   - Or create a `.env` file with `OPENWEATHER_API_KEY=your_api_key_here`

2. **"API key is required" error:**
   - Make sure you've set your API key in the environment variables or `.env` file
   - Check that your API key is valid and active at [OpenWeatherMap](https://openweathermap.org/api)

3. **"Module not found" error:**
   - Run `npm run build` to compile TypeScript
   - Ensure all dependencies are installed with `npm install`

4. **MCP server not appearing in VS Code:**
   - Check that the path in your MCP configuration is correct
   - Ensure the `dist/index.js` file exists after building
   - Restart VS Code after adding the server configuration

5. **One-click install buttons not working:**
   - **If buttons open in browser instead of VS Code:**
     - The MCP extension might not be installed or URL handler not registered
     - Use Method 1 (Manual Configuration) instead - it's more reliable
     - Run `npm run config` to get the exact configuration to copy
   - Make sure you have VS Code or VS Code Insiders installed
   - Ensure your project is built before attempting installation

### Getting Help

- 📧 Contact: @mohaimenhasan
- 🐛 Issues: [GitHub Issues](https://github.com/mohaimenhasan/mcp-weather-server/issues)
- 📖 MCP Documentation: [Model Context Protocol](https://modelcontextprotocol.io/)

## 🎉 What's Next?

After installation, you can:
- Ask weather questions directly in VS Code chat
- Integrate weather data into your coding workflow  
- Build weather-aware applications with real-time data
- Explore other MCP servers for enhanced functionality

## 📄 License

MIT License - feel free to use this in your own projects!

---

Made with ❤️ for the VS Code and MCP community
