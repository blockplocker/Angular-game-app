import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Isudoku } from '../interfaces/isudoku';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class SudokuService {
  http = inject(HttpClient);

  getSudokuFromApi(difficulty: string): Observable<Isudoku> {
  return this.http.get<Isudoku>(`${environment.apiUrl}?difficulty=${difficulty}`, {
    headers: { 'X-Api-Key': environment.apiKey },
  });
}

}
