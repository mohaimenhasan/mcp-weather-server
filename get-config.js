#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const currentDir = process.cwd();
const distPath = path.join(currentDir, 'dist', 'index.js').replace(/\\/g, '\\\\');

console.log('🌤️  MCP Weather Server - Manual Configuration');
console.log('='.repeat(60));
console.log('\n📋 Copy this configuration to your VS Code settings:');
console.log('\n1. Press Ctrl+Shift+P in VS Code');
console.log('2. Type "Preferences: Open User Settings (JSON)"');
console.log('3. Add this to your settings.json:');
console.log('\n```json');
console.log(JSON.stringify({
  "mcp.servers": {
    "weather-mcp": {
      "type": "stdio",
      "command": "node",
      "args": [distPath],
      "env": {
        "OPENWEATHER_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}, null, 2));
console.log('```');

console.log('\n🔑 Replace "YOUR_API_KEY_HERE" with your actual OpenWeatherMap API key');
console.log('\n📍 Current project path:', currentDir);
console.log('📁 Dist file location:', distPath);

// Check if dist file exists
if (fs.existsSync(path.join(currentDir, 'dist', 'index.js'))) {
  console.log('✅ dist/index.js exists - ready to use!');
} else {
  console.log('❌ dist/index.js not found - run "npm run build" first');
}

console.log('\n💡 Alternative: Use environment variable');
console.log('Create a .env file with: OPENWEATHER_API_KEY=your_key_here');
