export const environment = {
  production: true,

  // External APIs
  apiKey: 'YOUR_API_NINJAS_KEY_HERE', // Get from https://api.api-ninjas.com/
  sudokuApiUrl: 'https://api.api-ninjas.com/v1/sudokugenerate',
  geocodingApiUrl: 'https://api.api-ninjas.com/v1/geocoding',
  weatherApiUrl: 'https://api.openweathermap.org/data/2.5/weather',
  weatherApiKey: 'YOUR_OPENWEATHER_API_KEY_HERE', // Get from https://openweathermap.org/api

  // Production APIs (these should point to your deployed backend services)
  CalendarApiUrl: 'YOUR_DEPLOYED_CALENDAR_API_URL', // Calendar API from https://github.com/blockplocker/calenderApi
  DiscusslyApiUrl: 'YOUR_DEPLOYED_DISCUSSLY_API_URL', // Discussly API from https://github.com/blockplocker/DiscusslyApi
};
