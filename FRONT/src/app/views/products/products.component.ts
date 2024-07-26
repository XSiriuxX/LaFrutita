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
  categories: string[] = [];
  searchTerm: string = '';

  selectedCategories: string[] = [];
  minPrice: number = 0;
  maxPrice: number = 0;
  sortBy: string = '';
  ascending: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 30;

  constructor(
    public productService: ProductService,
    private filtersService: FiltersService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getCategories() {
    this.productService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((res: Product[]) => {
      this.originalProducts = res;
      this.applyFilters();
    });
  }

  searchByName() {
    this.products = this.filtersService.searchProductsByName(this.searchTerm);
    this.applyFilters();
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

    this.currentPage = 1;
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

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
