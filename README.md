# MCP Weather Server

A simple Model Context Protocol (MCP) server providing weather data via an Express API.

## Prerequisites

- Node.js (>= 18.x)
- npm (>= 9.x)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohaimenhasan/mcp-weather-server.git
   cd mcp-weather-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```


## Configuration

- Add an API key in [index.ts](./index.ts) - line 6. Get your api key from openweathermap. If you need one PM me - (@mohaimenhasan)

## Build

Before using this MCP server in VS Code or deploying it, you must compile the TypeScript sources:

```bash
npm run build
```

This will produce a `dist/` folder containing the compiled JavaScript.

## Integrating with VS Code

Before opening this project in VS Code as an MCP server:

1. Run:
   ```bash
   npm run build
   ```
2. Go to VSCode. Add a MCP server, inside the servers: {} block as following:
```json
"weather-mcp": 
{
    "type": "stdio",
    "command": "node",
    "args": [
        "C:\\<PATH_TO_YOUR_REPO>\\mcp-weather-server\\dist\\index.js"
    ]
}
```
3. Go ahead and ask a question about your fave cities weather.

## API Endpoints

- `GET /weather?location={city}`: Returns current weather data for the specified city.

## License

MIT