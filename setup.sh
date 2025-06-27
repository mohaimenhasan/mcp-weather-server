#!/bin/bash

echo "🌤️  Setting up MCP Weather Server..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ -f "dist/index.js" ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 MCP Weather Server is ready!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Get your free API key from: https://openweathermap.org/api"
    echo "2. In VS Code, open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)"
    echo "3. Search for 'MCP: Add Server'"
    echo "4. Use the configuration from mcp-config.json"
    echo "5. Replace YOUR_API_KEY_HERE with your actual API key"
    echo "6. Replace the path with your actual project path"
    echo ""
    echo "💡 Or use the VS Code workspace settings for automatic setup!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
