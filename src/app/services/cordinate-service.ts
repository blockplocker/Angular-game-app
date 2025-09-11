import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { Icordinates } from '../interfaces/icordinates';

@Injectable({
  providedIn: 'root',
})
export class CordinateService {
  private http = inject(HttpClient);

  getCityCoordinates(city: string): Observable<Icordinates[]> {
    const headers = new HttpHeaders({
      'X-Api-Key': environment.apiKey
    });

    const url = `${environment.geocodingApiUrl}?city=${encodeURIComponent(city)}`;
    return this.http.get<Icordinates[]>(url, { headers });
  }
}
