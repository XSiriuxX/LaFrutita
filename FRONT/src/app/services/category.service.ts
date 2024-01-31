import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  API_URL: string = `${environment.API_URL}/category`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/`).pipe(
      tap((res) => {
        return res;
      })
    );
  }
}
