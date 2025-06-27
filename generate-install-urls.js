#!/usr/bin/env node

/**
 * Generate one-click install URLs for MCP Weather Server
 * Usage: node generate-install-urls.js
 */

const mcpConfig = {
  name: "weather-mcp",
  type: "stdio",
  command: "node", 
  args: ["${workspaceFolder}/dist/index.js"],
  env: {
    "OPENWEATHER_API_KEY": "${input:openweatherApiKey}"
  }
};

// Generate URLs
const vscodeUrl = `vscode:mcp/install?${encodeURIComponent(JSON.stringify(mcpConfig))}`;
const vscodeInsidersUrl = `vscode-insiders:mcp/install?${encodeURIComponent(JSON.stringify(mcpConfig))}`;

console.log('🌤️  MCP Weather Server - One-Click Install URLs\n');
console.log('=' .repeat(60));
console.log('\n📦 VS Code:');
console.log(vscodeUrl);
console.log('\n🧪 VS Code Insiders:');
console.log(vscodeInsidersUrl);
console.log('\n' + '='.repeat(60));
console.log('\n💡 Usage:');
console.log('1. Build the project first: npm run setup');
console.log('2. Copy and paste these URLs in your browser');
console.log('3. Or use them in markdown/HTML as clickable links');
console.log('\n🌐 Or open install.html in your browser for a GUI interface!');

// Generate markdown badges for README
console.log('\n📝 Markdown badges for README:');
console.log('```markdown');
console.log(`[![Install in VS Code](https://img.shields.io/badge/Install%20in-VS%20Code-007acc?style=for-the-badge&logo=visual-studio-code)](${vscodeUrl})`);
console.log(`[![Install in VS Code Insiders](https://img.shields.io/badge/Install%20in-VS%20Code%20Insiders-1db954?style=for-the-badge&logo=visual-studio-code)](${vscodeInsidersUrl})`);
console.log('```');

// Generate HTML buttons
console.log('\n🎨 HTML buttons:');
console.log('```html');
console.log(`<a href="${vscodeUrl}" style="display:inline-block;padding:10px 20px;background:#007acc;color:white;text-decoration:none;border-radius:5px;">📦 Install in VS Code</a>`);
console.log(`<a href="${vscodeInsidersUrl}" style="display:inline-block;padding:10px 20px;background:#1db954;color:white;text-decoration:none;border-radius:5px;">🧪 Install in VS Code Insiders</a>`);
console.log('```');
