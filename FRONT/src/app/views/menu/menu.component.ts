import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  groupedProducts: { [category: string]: Product[] } = {};

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.productService.getAllCategories().subscribe((res: string[]) => {
      this.categories = res.sort((a, b) => a.localeCompare(b));
    });
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((res: Product[]) => {
      const sortedProducts = res.sort((a, b) =>
        a.CATEGORIAS.localeCompare(b.CATEGORIAS)
      );

      this.groupedProducts = sortedProducts.reduce((acc, product) => {
        (acc[product.CATEGORIAS] = acc[product.CATEGORIAS] || []).push(product);
        return acc;
      }, {} as { [category: string]: Product[] });
    });
  }

  scrollToCategory(category: string) {
    const productsSection = document.getElementById('products-section');
    const targetElement = document.getElementById(category);

    if (productsSection && targetElement) {
      const targetPosition = targetElement.offsetTop - 120;

      productsSection.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  }

  getCategoriesList(): string[] {
    return Object.keys(this.groupedProducts);
  }
}
