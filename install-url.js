// One-click install URL generator for MCP Weather Server
// This creates a URL that automatically installs the MCP server in VS Code

const mcpConfig = {
  name: "weather-mcp",
  type: "stdio",
  command: "node",
  args: [
    "${workspaceFolder}/dist/index.js"
  ],
  env: {
    "OPENWEATHER_API_KEY": "${input:openweatherApiKey}"
  }
};

// For VS Code
const vscodeUrl = `vscode:mcp/install?${encodeURIComponent(JSON.stringify(mcpConfig))}`;

// For VS Code Insiders
const vscodeInsidersUrl = `vscode-insiders:mcp/install?${encodeURIComponent(JSON.stringify(mcpConfig))}`;

console.log("🚀 One-Click Install URLs:");
console.log("\n📦 VS Code:");
console.log(vscodeUrl);
console.log("\n🧪 VS Code Insiders:");
console.log(vscodeInsidersUrl);

// Export for programmatic use
export { vscodeUrl, vscodeInsidersUrl, mcpConfig };
