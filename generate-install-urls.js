#!/usr/bin/env node

/**
 * Generate one-click install URLs for MCP Weather Server
 * Usage: node generate-install-urls.js
 */

// Configuration for workspace-relative path (requires project to be open in VS Code)
const mcpConfigWorkspace = {
  name: "weather-mcp",
  type: "stdio",
  command: "node", 
  args: ["${workspaceFolder}/dist/index.js"],
  env: {
    "OPENWEATHER_API_KEY": "${input:openweatherApiKey}"
  }
};

// Configuration for absolute path (works from anywhere)
const mcpConfigAbsolute = {
  name: "weather-mcp",
  type: "stdio",
  command: "node", 
  args: [process.cwd() + "\\dist\\index.js"], // Use current directory
  env: {
    "OPENWEATHER_API_KEY": "${input:openweatherApiKey}"
  }
};

// Generate URLs
const vscodeUrlWorkspace = `vscode:mcp/install?${encodeURIComponent(JSON.stringify(mcpConfigWorkspace))}`;
const vscodeInsidersUrlWorkspace = `vscode-insiders:mcp/install?${encodeURIComponent(JSON.stringify(mcpConfigWorkspace))}`;

const vscodeUrlAbsolute = `vscode:mcp/install?${encodeURIComponent(JSON.stringify(mcpConfigAbsolute))}`;
const vscodeInsidersUrlAbsolute = `vscode-insiders:mcp/install?${encodeURIComponent(JSON.stringify(mcpConfigAbsolute))}`;

console.log('🌤️  MCP Weather Server - One-Click Install URLs\n');
console.log('=' .repeat(60));
console.log('\n📦 VS Code (Workspace-relative - use when project is open):');
console.log(vscodeUrlWorkspace);
console.log('\n📦 VS Code (Absolute path - use from anywhere):');
console.log(vscodeUrlAbsolute);
console.log('\n🧪 VS Code Insiders (Workspace-relative):');
console.log(vscodeInsidersUrlWorkspace);
console.log('\n🧪 VS Code Insiders (Absolute path):');
console.log(vscodeInsidersUrlAbsolute);
console.log('\n' + '='.repeat(60));
console.log('\n💡 Usage:');
console.log('1. Build the project first: npm run setup');
console.log('2. Copy and paste these URLs in your browser or run from command line');
console.log('3. Use workspace-relative URLs when the project is open in VS Code');
console.log('4. Use absolute path URLs when VS Code is closed');
console.log('\n🛠️  Alternative methods if URLs don\'t work:');
console.log('- Manual: Copy mcp-config.json settings to VS Code settings');
console.log('- Command: Use "MCP: Add Server" from VS Code Command Palette');
console.log('- Browser: Open install.html for GUI interface');

console.log('\n🌐 Or open install.html in your browser for a GUI interface!');

// Generate markdown badges for README
console.log('\n📝 Markdown badges for README (workspace-relative):');
console.log('```markdown');
console.log(`[![Install in VS Code](https://img.shields.io/badge/Install%20in-VS%20Code-007acc?style=for-the-badge&logo=visual-studio-code)](${vscodeUrlWorkspace})`);
console.log(`[![Install in VS Code Insiders](https://img.shields.io/badge/Install%20in-VS%20Code%20Insiders-1db954?style=for-the-badge&logo=visual-studio-code)](${vscodeInsidersUrlWorkspace})`);
console.log('```');

console.log('\n📝 Markdown badges for README (absolute path):');
console.log('```markdown');
console.log(`[![Install in VS Code](https://img.shields.io/badge/Install%20in-VS%20Code-007acc?style=for-the-badge&logo=visual-studio-code)](${vscodeUrlAbsolute})`);
console.log(`[![Install in VS Code Insiders](https://img.shields.io/badge/Install%20in-VS%20Code%20Insiders-1db954?style=for-the-badge&logo=visual-studio-code)](${vscodeInsidersUrlAbsolute})`);
console.log('```');

// Generate HTML buttons
console.log('\n🎨 HTML buttons:');
console.log('```html');
console.log(`<a href="${vscodeUrl}" style="display:inline-block;padding:10px 20px;background:#007acc;color:white;text-decoration:none;border-radius:5px;">📦 Install in VS Code</a>`);
console.log(`<a href="${vscodeInsidersUrl}" style="display:inline-block;padding:10px 20px;background:#1db954;color:white;text-decoration:none;border-radius:5px;">🧪 Install in VS Code Insiders</a>`);
console.log('```');
