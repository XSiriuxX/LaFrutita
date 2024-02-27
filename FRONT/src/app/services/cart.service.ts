import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable()
export class CartService {
  API_URL: string = `${environment.API_URL}/cart`;
  constructor(private http: HttpClient) {}

  generateTempToken(): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/createtoken`, {});
  }

  getCart(token: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}`, { token });
  }

  addToCart(
    token: string,
    productId: string | undefined,
    quantity: number
  ): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/addproduct`, {
      token,
      productId,
      quantity,
    });
  }
}
