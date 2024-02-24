import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable()
export class ProductService {
  API_URL: string = `${environment.API_URL}/product`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}`).pipe(
      tap((res) => {
        return res;
      })
    );
  }

  getProductDetail(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`).pipe(
      tap((res) => {
        return res;
      })
    );
  }

  getAllCategories(): Observable<string[]> {
    return this.getAllProducts().pipe(
      map((products) => {
        const categoriesSet = new Set<string>();

        products.forEach((product) => {
          const categoriesArray = product.CATEGORIAS.split(',');
          categoriesArray.forEach((category) => {
            categoriesSet.add(category.trim());
          });
        });

        return Array.from(categoriesSet);
      })
    );
  }
}
