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

  constructor(
    private cartService: CartService // private cartpopup: CartpopupComponent
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('ID') || '';
  }
}
