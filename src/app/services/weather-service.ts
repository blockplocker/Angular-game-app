import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Iweather } from '../interfaces/iweather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);

  getWeatherByCoordinates(latitude: number, longitude: number): Observable<Iweather> {
    const units = 'metric';
    const lang = 'en';
    const url = `${environment.weatherApiUrl}?lat=${latitude}&lon=${longitude}&units=${units}&lang=${lang}&appid=${environment.weatherApiKey}`;
    return this.http.get<Iweather>(url);
  }

  getWeather(city: string): Observable<Iweather> {
    return this.http.get<Iweather>(`${environment.weatherApiUrl}`, {
      params: {
        q: city,
        appid: environment.weatherApiKey,
        units: 'metric',
        lang: 'en',
      },
    });
  }
}
