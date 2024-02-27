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
  products: Product[] = [];
  userId: string = '';
  updatedProduct: any = {};
  cantidad: number = 1;
  @ViewChild('quantitySelect') quantitySelect!: ElementRef | undefined;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  getProducts(CATEGORIA: String | undefined) {
    this.productService.getAllProducts().subscribe((res: Product[]) => {
      this.products = res.filter((product) => product.CATEGORIAS === CATEGORIA);
    });
  }

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
          this.getProducts(this.product?.CATEGORIAS);
        });
    }
  }

  addNewProduct(id: string | undefined) {
    this.updatedProduct = {
      userId: this.userId,
      productId: id,
      quantity: this.cantidad,
    };

    this.cartService.addProduct(this.updatedProduct).subscribe((res) => {
      console.log(res);
    });
  }

  aumentarCantidad() {
    if (this.cantidad < 10) {
      this.cantidad++;
    }
  }

  disminuirCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }
}
