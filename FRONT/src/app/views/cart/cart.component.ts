import { Component, SimpleChanges } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart: {
    IMAGEN: string;
    CATEGORIAS: string;
    TIPO: string;
    NOMBRE: string;
    PRECIO: Number;
    DESCRIPCION: string;
    CANTIDAD: Number;
  }[] = [];
  userId: string = '';
  updatedProduct: any = {};
  subtotal: number = 0;
  total: number = 0;
  envioSeleccionado: boolean = true;
  envio: number = 4.9;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('Token') || '';
    this.getCart();
    setTimeout(() => {
      this.calculateSubtotal();
    }, 400);
  }

  getCart(): void {
    this.cartService.getCart(this.userId).subscribe(
      (res) => {
        res.cart.forEach((item: any) => {
          const productId = item.product;
          const quantity = item.quantity;

          this.productService.getProductDetail(productId).subscribe(
            (productDetail) => {
              productDetail.CANTIDAD = quantity;
              this.cart.push(productDetail);
            },
            (error) => {
              console.error('Error al obtener el detalle del producto:', error);
            }
          );
        });
      },
      (error) => {
        console.error('Error al obtener el carrito:', error);
      }
    );
  }

  aumentarCantidad() {
    // if (this.cantidad < 10) {
    //   this.cantidad++;
    // }
  }

  disminuirCantidad() {
    // if (this.cantidad > 1) {
    //   this.cantidad--;
    // }
  }

  toggleenvio() {
    this.envioSeleccionado = !this.envioSeleccionado;

    if (this.envioSeleccionado) {
      this.envio = 5.9;
    } else {
      this.envio = 0;
    }
    this.calculateSubtotal();
  }

  calculateSubtotal() {
    this.subtotal = this.cart.reduce((acc: number, product) => {
      return acc + +product.CANTIDAD * +product.PRECIO;
    }, 0);

    this.total = this.subtotal + this.envio;
  }

  // deleteProduct(id: string | undefined) {
  //   this.updatedProduct = {
  //     userId: this.userId,
  //     productId: id,
  //   };

  //   this.cartService
  //     .deleteProduct(this.updatedProduct)
  //     .subscribe((res) => this.getProductsCart());
  // }

  // deleteAllProduct(id: string | undefined, quantity: number) {
  //   this.updatedProduct = {
  //     userId: this.userId,
  //     productId: id,
  //     quantity: quantity,
  //   };

  //   this.cartService
  //     .deleteProduct(this.updatedProduct)
  //     .subscribe((res) => this.getProductsCart());
  // }

  // addNewProduct(id: string | undefined) {
  //   this.updatedProduct = {
  //     userId: this.userId,
  //     productId: id,
  //     quantity: 1,
  //   };

  //   this.cartService
  //     .addProduct(this.updatedProduct)
  //     .subscribe((res) => this.getProductsCart());
  // }
}
