export const environment = {
  production: false,

  // External APIs
  apiKey: 'YOUR_API_NINJAS_KEY_HERE', // Get from https://api.api-ninjas.com/
  sudokuApiUrl: 'https://api.api-ninjas.com/v1/sudokugenerate',
  geocodingApiUrl: 'https://api.api-ninjas.com/v1/geocoding',
  weatherApiUrl: 'https://api.openweathermap.org/data/2.5/weather',
  weatherApiKey: 'YOUR_OPENWEATHER_API_KEY_HERE', // Get from https://openweathermap.org/api

  // Local APIs (these should point to your locally running backend services)
  CalendarApiUrl: 'https://localhost:44304', // Calendar API from https://github.com/blockplocker/calenderApi
  DiscusslyApiUrl: 'https://localhost:44314', // Discussly API from https://github.com/blockplocker/DiscusslyApi
};
