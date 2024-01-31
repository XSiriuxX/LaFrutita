import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cartpopup',
  templateUrl: './cartpopup.component.html',
  styleUrls: ['./cartpopup.component.css'],
})
export class CartpopupComponent {
  cart: {
    productId: string;
    name: string;
    description: string;
    quantity: number;
    productImage: string;
  }[] = [];
  userId: string = '';
  deletedProduct: any = {};

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('ID') || '';
    this.getProductsCart();
  }

  getProductsCart() {
    this.cartService.getProductsCart(this.userId).subscribe((res: any) => {
      this.cart = res;
    });
  }

  deleteProduct(id: string | undefined) {
    this.deletedProduct = {
      userId: this.userId,
      productId: id,
    };

    this.cartService
      .deleteProduct(this.deletedProduct)
      .subscribe((res) => this.getProductsCart());
  }
}
