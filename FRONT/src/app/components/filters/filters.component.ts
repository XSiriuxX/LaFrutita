import { Component, EventEmitter, Input, Output } from '@angular/core';
import { max } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  categories: any[] = [];
  @Input() selectedCategories: string[] = [];
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 0;
  @Input() sortBy: string = '';
  @Input() ascending: boolean = false;
  @Output() filtersApplied: EventEmitter<any> = new EventEmitter();

  constructor(
    public categoryService: CategoryService,
    public filtersService: FiltersService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res.map((category: any) => ({
        ...category,
        selected: false,
      }));
    });
  }

  applyFilters() {
    // Obtener solo las categorías seleccionadas
    this.selectedCategories = this.categories
      .filter((category) => category.selected)
      .map((category) => category.categoryName);

    this.filtersApplied.emit({
      selectedCategories: this.selectedCategories,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      sortBy: this.sortBy,
      ascending: this.ascending,
    });
  }

  setSorting(sortby: string, ascending: boolean) {
    this.sortBy = sortby;
    this.ascending = ascending;
    this.applyFilters();
  }

  resetFilters() {
    this.categories.forEach((category) => (category.selected = false));
    this.minPrice = 0;
    this.maxPrice = 0;
    this.sortBy = '';
    this.ascending = false;
    this.applyFilters();
  }
}
