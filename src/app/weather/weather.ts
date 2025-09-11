import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather-service';
import { Iweather } from '../interfaces/iweather';

@Component({
  selector: 'app-weather',
  imports: [FormsModule],
  templateUrl: './weather.html',
  styleUrl: './weather.scss',
})
export class Weather {
  weatherService = inject(WeatherService);
  cityName: string = '';
  errorMessage: string = '';
  weatherData: Iweather | null = null;

  getweather() {
    if (this.cityName.trim().length > 0) {
      this.weatherService.getWeather(this.cityName.trim()).subscribe({
        next: (data) => {
          this.weatherData = data;
        },
        error: (err) => {
          this.errorMessage = 'Error fetching weather data.';
          this.weatherData = null;
        },

      });
    } else {
      this.errorMessage = 'Please enter a city name.';
    }
  }

  getcurrentlocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.weatherService.getWeatherByCoordinates(latitude, longitude).subscribe({
            next: (data) => {
            this.weatherData = data;
          },
          error: (err) => {
            this.errorMessage = 'Error fetching weather data.';
            this.weatherData = null;
          },
        });
      });
    }
  }
}
