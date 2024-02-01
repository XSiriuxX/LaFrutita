import { Component, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart: {
    productId: string;
    name: string;
    description: string;
    quantity: number;
    productImage: string;
    productPrice: number;
  }[] = [];
  userId: string = '';
  updatedProduct: any = {};

  subtotal: number = 0;
  total: number = 0;
  envioSeleccionado: boolean = true;
  envio: number = 4.99;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.userId = localStorage.getItem('ID') || '';
    this.getProductsCart();
  }

  getProductsCart() {
    this.cartService.getProductsCart(this.userId).subscribe((res: any) => {
      this.cart = res;
      this.calculateSubtotal();
    });
  }

  toggleenvio() {
    this.envioSeleccionado = !this.envioSeleccionado;

    if (this.envioSeleccionado) {
      this.envio = 4.99;
    } else {
      this.envio = 0;
    }
    this.calculateSubtotal();
  }

  calculateSubtotal() {
    this.subtotal = this.cart.reduce((acc, product) => {
      return acc + product.quantity * product.productPrice;
    }, 0);
    this.total = this.subtotal + this.envio;
  }

  deleteProduct(id: string | undefined) {
    this.updatedProduct = {
      userId: this.userId,
      productId: id,
    };

    this.cartService
      .deleteProduct(this.updatedProduct)
      .subscribe((res) => this.getProductsCart());
  }

  deleteAllProduct(id: string | undefined, quantity: number) {
    this.updatedProduct = {
      userId: this.userId,
      productId: id,
      quantity: quantity,
    };

    this.cartService
      .deleteProduct(this.updatedProduct)
      .subscribe((res) => this.getProductsCart());
  }

  addNewProduct(id: string | undefined) {
    this.updatedProduct = {
      userId: this.userId,
      productId: id,
      quantity: 1,
    };

    this.cartService
      .addProduct(this.updatedProduct)
      .subscribe((res) => this.getProductsCart());
  }
}
