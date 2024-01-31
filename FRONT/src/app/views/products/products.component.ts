import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FiltersService } from 'src/app/services/filters.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  originalProducts: Product[] = [];
  products: Product[] = [];

  searchTerm: string = '';

  selectedCategories: string[] = [];
  minPrice: number = 0;
  maxPrice: number = 0;
  sortBy: string = '';
  ascending: boolean = false;

  constructor(
    public productService: ProductService,
    private filtersService: FiltersService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((res: Product[]) => {
      this.originalProducts = res;
      this.applyFilters();
    });
  }

  searchByName() {
    this.products = this.filtersService.searchProductsByName(this.searchTerm);
  }

  applyFilters() {
    this.filtersService.getAllProducts(this.originalProducts);

    this.products = this.filtersService.filterAndSortProducts(
      this.selectedCategories,
      this.minPrice,
      this.maxPrice,
      this.sortBy,
      this.ascending
    );
  }

  onFiltersApplied(event: any) {
    this.selectedCategories = event.selectedCategories;
    this.minPrice = event.minPrice;
    this.maxPrice = event.maxPrice;
    this.sortBy = event.sortBy;
    this.ascending = event.ascending;

    this.filtersService.getAllProducts(this.products);

    this.applyFilters();
  }
}
