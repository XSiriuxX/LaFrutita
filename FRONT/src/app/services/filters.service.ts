import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product.model';

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
          product.categories.includes(category)
        )
      );
    } else {
      filteredProducts = [...this.copyProducts];
    }

    if (minPrice !== 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.productPrice >= minPrice
      );
    }

    if (maxPrice !== 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.productPrice <= maxPrice
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
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
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
          ? a.productName.localeCompare(b.productName)
          : b.productName.localeCompare(a.productName)
      );
  }

  private sortProductsByPrice(
    products: Product[],
    ascending: boolean = true
  ): Product[] {
    return products
      .slice()
      .sort((a, b) =>
        ascending
          ? a.productPrice - b.productPrice
          : b.productPrice - a.productPrice
      );
  }
}
