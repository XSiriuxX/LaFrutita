import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() product?: Product;
  userId: string = '';
  newProduct: any = {};

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.userId = localStorage.getItem('ID') || '';
  }

  addNewProduct(id: string | undefined) {
    this.newProduct = {
      userId: this.userId,
      productId: id,
      quantity: 1,
    };

    this.cartService
      .addToCart(this.userId, id, 1)
      .subscribe((res) => this.cartService.getCart(this.userId));
  }
}
