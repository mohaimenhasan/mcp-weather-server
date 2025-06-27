# MCP Weather Server Examples

Here are some example questions you can ask VS Code Copilot once the MCP Weather Server is set up:

## Basic Weather Queries
- "What's the weather like in London?"
- "How's the weather in Tokyo today?"
- "Tell me about the current weather in New York"
- "What's the temperature in Paris?"

## More Specific Queries
- "Is it raining in Seattle?"
- "What's the humidity in Miami?"
- "How windy is it in Chicago?"
- "What does the weather feel like in Dubai?"

## Travel Planning
- "Should I pack a jacket for my trip to San Francisco?"
- "What's the weather forecast for Rome?"
- "Is it a good day for outdoor activities in Sydney?"

## Multiple Cities
- "Compare the weather in London and Paris"
- "What's warmer, New York or Los Angeles?"

## Expected Response Format
The server returns weather information in this format:
```
Weather in [City Name]: [description], [temperature]°C (feels like [feels_like_temperature]°C). Humidity: [humidity]%, Wind: [wind_speed] m/s
```

Example:
```
Weather in London: clear sky, 22°C (feels like 24°C). Humidity: 65%, Wind: 3.2 m/s
```

## Error Handling
The server handles common errors gracefully:
- **City not found**: "City '[city_name]' not found. Please check the spelling and try again."
- **Invalid API key**: "Invalid API key. Please check your OpenWeatherMap API key configuration."
- **Network issues**: "Sorry, I couldn't fetch weather data for [city_name]. Please try again later."
