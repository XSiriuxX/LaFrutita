import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  API_URL: string = `${environment.API_URL}/payments`;
  constructor(private http: HttpClient) {}

  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.API_URL}/createorder`, order).pipe(
      tap((res) => {
        return res;
      })
    );
  }
}
