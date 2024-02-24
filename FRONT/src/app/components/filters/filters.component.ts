import { Component, EventEmitter, Input, Output } from '@angular/core';
import { max } from 'rxjs';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Input() categories: any[] = [];
  @Input() selectedCategories: string[] = [];
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 0;
  @Input() sortBy: string = '';
  @Input() ascending: boolean = false;
  @Output() filtersApplied: EventEmitter<any> = new EventEmitter();
  currentDetail: string = '';

  constructor(public filtersService: FiltersService) {}

  ngOnChanges() {
    if (this.categories.length > 0 && typeof this.categories[0] === 'string') {
      this.categories = this.categories.map((categoryName) => ({
        categoryName,
        selected: false,
      }));
    }
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
