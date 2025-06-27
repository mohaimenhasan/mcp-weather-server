# 🛠️ Manual Installation Guide

If the one-click install buttons don't work, here are step-by-step manual installation methods:

## Method 1: VS Code Settings JSON

1. **Open VS Code Settings:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Preferences: Open User Settings (JSON)"
   - Click on it to open the settings.json file

2. **Add MCP Configuration:**
   Add this to your settings.json file (inside the outermost `{}`):

   ```json
   "mcp.servers": {
     "weather-mcp": {
       "type": "stdio",
       "command": "node",
       "args": [
         "C:\\YOUR_FULL_PATH\\mcp-weather-server\\dist\\index.js"
       ],
       "env": {
         "OPENWEATHER_API_KEY": "your_api_key_here"
       }
     }
   }
   ```

3. **Update the Path:**
   - Replace `C:\\YOUR_FULL_PATH\\mcp-weather-server\\dist\\index.js` with the actual full path to your project
   - Example: `C:\\Users\\YourName\\source\\repos\\mcp-weather-server\\dist\\index.js`

4. **Add Your API Key:**
   - Replace `your_api_key_here` with your actual OpenWeatherMap API key

## Method 2: VS Code Command Palette

1. **Open Command Palette:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "MCP: Add Server"
   - Select it

2. **Enter Server Details:**
   - **Name:** `weather-mcp`
   - **Type:** `stdio`
   - **Command:** `node`
   - **Args:** `["C:\\YOUR_FULL_PATH\\mcp-weather-server\\dist\\index.js"]`
   - **Environment:** `{"OPENWEATHER_API_KEY": "your_api_key_here"}`

## Method 3: Copy from Template

1. **Use the Template:**
   - Copy `.vscode/settings.template.json` to `.vscode/settings.json`
   - Open `.vscode/settings.json`
   - Replace `YOUR_API_KEY_HERE` with your actual API key

2. **Ensure Workspace is Open:**
   - Make sure you have the mcp-weather-server folder open as a workspace in VS Code
   - The `${workspaceFolder}` variable will automatically resolve to the correct path

## Method 4: Using .env File

1. **Create .env file:**
   ```bash
   OPENWEATHER_API_KEY=your_api_key_here
   ```

2. **Use Workspace Configuration:**
   ```json
   "mcp.servers": {
     "weather-mcp": {
       "type": "stdio",
       "command": "node",
       "args": ["${workspaceFolder}/dist/index.js"]
     }
   }
   ```

## 🚨 Troubleshooting

### Common Issues:

1. **Server doesn't appear:**
   - Check that `dist/index.js` exists (run `npm run build`)
   - Verify the path is correct (use absolute paths)
   - Restart VS Code after adding the configuration

2. **"Cannot find module" error:**
   - Run `npm install` in the project directory
   - Run `npm run build` to compile TypeScript

3. **API key errors:**
   - Verify your API key is valid at [OpenWeatherMap](https://openweathermap.org/api)
   - Check there are no extra spaces or quotes around the API key

4. **Path issues on Windows:**
   - Use double backslashes (`\\`) in JSON paths
   - Or use forward slashes (`/`) which also work on Windows
   - Example: `"C:/Users/YourName/repos/mcp-weather-server/dist/index.js"`

## 🔍 Verification

After installation, verify it works:

1. **Check Server Status:**
   - Open VS Code Command Palette
   - Type "MCP: List Servers"
   - You should see "weather-mcp" listed

2. **Test the Server:**
   - Open a chat in VS Code
   - Ask: "What's the weather in London?"
   - You should get a weather response

## 📞 Need Help?

If you're still having issues:
- Check the [main README.md](./README.md) for other installation methods
- Open an issue on [GitHub](https://github.com/mohaimenhasan/mcp-weather-server/issues)
- Contact @mohaimenhasan
