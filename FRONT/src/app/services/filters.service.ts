import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  copyProducts: Product[] = [];
  filtersChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  getAllProducts(products: Product[]) {
    this.copyProducts = products;
  }

  filterAndSortProducts(
    categories: any,
    minPrice: number,
    maxPrice: number,
    sortBy: string,
    ascending: boolean
  ): any[] {
    // Aplicar filtros y ordenamiento usando this.selectedFilters
    let filteredProducts = [...this.copyProducts];

    if (
      categories.length == 0 &&
      minPrice == 0 &&
      maxPrice == 0 &&
      sortBy == ''
    ) {
      return filteredProducts;
    }

    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categories.some((category: any) =>
          product.CATEGORIAS.includes(category)
        )
      );
    } else {
      filteredProducts = [...this.copyProducts];
    }

    if (minPrice !== 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.PRECIO >= minPrice
      );
    }

    if (maxPrice !== 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.PRECIO <= maxPrice
      );
    }

    // Aplicar ordenamiento
    switch (sortBy) {
      case 'name':
        filteredProducts = this.sortProductsByName(filteredProducts, ascending);
        break;
      case 'price':
        filteredProducts = this.sortProductsByPrice(
          filteredProducts,
          ascending
        );
        break;
    }

    return filteredProducts;
  }

  searchProductsByName(searchTerm: string): Product[] {
    let products = [...this.copyProducts];
    return products.filter((product) =>
      product.NOMBRE.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  private sortProductsByName(
    products: Product[],
    ascending: boolean = true
  ): Product[] {
    return products
      .slice()
      .sort((a, b) =>
        ascending
          ? a.NOMBRE.localeCompare(b.NOMBRE)
          : b.NOMBRE.localeCompare(a.NOMBRE)
      );
  }

  private sortProductsByPrice(
    products: Product[],
    ascending: boolean = true
  ): Product[] {
    return products
      .slice()
      .sort((a, b) => (ascending ? a.PRECIO - b.PRECIO : b.PRECIO - a.PRECIO));
  }
}
