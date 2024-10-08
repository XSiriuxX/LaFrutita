import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  @Input() products: Product[] = [];

  slider: any;
  defaultTransform: any;

  goNext() {
    this.defaultTransform = this.defaultTransform - 398;
    if (Math.abs(this.defaultTransform) >= this.slider.scrollWidth / 1.7)
      this.defaultTransform = 0;
    this.slider.style.transform = 'translateX(' + this.defaultTransform + 'px)';
  }

  goPrev() {
    if (Math.abs(this.defaultTransform) === 0) this.defaultTransform = 0;
    else this.defaultTransform = this.defaultTransform + 398;
    this.slider.style.transform = 'translateX(' + this.defaultTransform + 'px)';
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.slider = document.getElementById('slider');
    this.defaultTransform = 0;
  }

  redirectToProduct(productId: string) {
    this.router.navigate(['/product', productId]).then(() => {
      window.location.reload();
    });
  }
}
