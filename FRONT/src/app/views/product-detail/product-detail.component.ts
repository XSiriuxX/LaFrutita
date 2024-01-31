import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  product: Product | null = null;
  productID: string | null = null;
  userId: string = '';
  updatedProduct: any = {};
  @ViewChild('quantitySelect') quantitySelect!: ElementRef | undefined;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('ID') || '';
    this.route.paramMap.subscribe((param) => {
      this.productID = param.get('id') || null;
    });
    this.getProduct();
  }

  getProduct() {
    if (this.productID) {
      this.productService
        .getProductDetail(this.productID)
        .subscribe((res: Product) => {
          this.product = res;
        });
    }
  }

  addNewProduct(id: string | undefined) {
    this.updatedProduct = {
      userId: this.userId,
      productId: id,
      quantity: +this.quantitySelect?.nativeElement.value,
    };

    this.cartService.addProduct(this.updatedProduct).subscribe((res) => {
      console.log(res);
    });
  }
}
