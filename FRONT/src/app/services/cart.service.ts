import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable()
export class CartService {
  API_URL: string = `${environment.API_URL}/user/cart`;
  constructor(private http: HttpClient) {}

  getProductsCart(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/${id}`).pipe(
      tap((res) => {
        return res;
      })
    );
  }

  addProduct(newproduct: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}`, newproduct).pipe(
      tap((res) => {
        return res;
      })
    );
  }

  deleteProduct(deletedproduct: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: deletedproduct,
    };

    return this.http.request<any>('delete', `${this.API_URL}`, options).pipe(
      tap((res) => {
        return res;
      })
    );
  }
}
