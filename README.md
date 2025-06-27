# 🌤️ MCP Weather Server

A Model Context Protocol (MCP) server that provides real-time weather data for any city worldwide. Get instant weather information directly in your VS Code chat!

[![MCP Review Certified](https://img.shields.io/badge/MCP-Review%20Certified-blue)](https://mcpreview.com/mcp-servers/mohaimenhasan/mcp-weather-server)

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




## ✨ Features

- 🌍 **Global Weather Data**: Get weather information for any city worldwide
- 🔥 **Real-time Updates**: Fresh data from OpenWeatherMap API
- ⚡ **One-Click Installation**: Easy setup for VS Code and VS Code Insiders
- 🛡️ **Secure**: API key handled through environment variables
- 🎯 **MCP Certified**: Fully compatible with Model Context Protocol

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

## 🎯 Usage

Once installed, you can ask VS Code Copilot questions like:

- "What's the weather like in London?"
- "How's the weather in Tokyo today?"
- "Tell me about the current weather in New York"
- "What's the temperature in Paris?"

The MCP server will automatically fetch real-time weather data and provide detailed information including:
- Current temperature
- Weather conditions
- City name confirmation

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

## 📡 API Reference

### Available Tools

#### `get-weather`
Fetches current weather data for a specified city.

**Parameters:**
- `city` (string): Name of the city to get weather for

**Returns:**
- Weather description
- Current temperature in Celsius
- City name

**Example Response:**
```
Weather in London: clear sky, 22°C
```

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
