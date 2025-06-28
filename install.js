#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🌤️  Installing MCP Weather Server...\n');

// Step 1: Install and build
console.log('📦 Installing dependencies and building...');
try {
  execSync('npm install && npm run build', { stdio: 'inherit', cwd: __dirname });
  console.log('✅ Dependencies installed and built successfully\n');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Step 2: Get API key from user
import { createInterface } from 'readline';
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

const apiKey = await askQuestion('🔑 Please enter your OpenWeatherMap API key (get free at https://openweathermap.org/api): ');

if (!apiKey.trim()) {
  console.error('❌ API key is required');
  rl.close();
  process.exit(1);
}

rl.close();

// Step 3: Generate VS Code settings
const serverPath = resolve(__dirname, 'dist', 'index.js');

const mcpConfig = {
  mcpServers: {
    "weather": {
      command: "node",
      args: [serverPath],
      env: {
        OPENWEATHER_API_KEY: apiKey
      }
    }
  }
};

// Step 4: Try to find VS Code settings file
const possiblePaths = [
  // Windows
  process.env.APPDATA ? join(process.env.APPDATA, 'Code', 'User', 'settings.json') : null,
  // macOS
  process.env.HOME ? join(process.env.HOME, 'Library', 'Application Support', 'Code', 'User', 'settings.json') : null,
  // Linux
  process.env.HOME ? join(process.env.HOME, '.config', 'Code', 'User', 'settings.json') : null,
].filter(Boolean);

let settingsPath = null;
for (const path of possiblePaths) {
  if (existsSync(path)) {
    settingsPath = path;
    break;
  }
}

if (settingsPath) {
  try {
    // Read existing settings
    let settings = {};
    if (existsSync(settingsPath)) {
      const settingsContent = readFileSync(settingsPath, 'utf8');
      settings = settingsContent.trim() ? JSON.parse(settingsContent) : {};
    }
    
    // Merge MCP configuration
    settings.mcpServers = { ...settings.mcpServers, ...mcpConfig.mcpServers };
    
    // Write back
    writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    
    console.log('✅ VS Code settings updated automatically!');
    console.log(`📁 Settings file: ${settingsPath}`);
  } catch (error) {
    console.log('⚠️  Could not automatically update VS Code settings.');
    console.log('Please manually add this to your VS Code settings.json:');
    console.log(JSON.stringify(mcpConfig, null, 2));
  }
} else {
  console.log('⚠️  VS Code settings.json not found.');
  console.log('Please manually add this to your VS Code settings.json:');
  console.log(JSON.stringify(mcpConfig, null, 2));
}

console.log('\n🎉 Installation complete!');
console.log('🔄 Restart VS Code to activate the MCP Weather Server');
console.log('🌤️  You can now ask Claude about weather in any city!');