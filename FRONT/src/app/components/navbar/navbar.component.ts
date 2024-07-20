import { Component, HostBinding } from '@angular/core';

import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showCart: boolean = false;
  showUser: boolean = false;
  isLoggedIn: boolean = false;

  NavbarList = [
    { id: 1, title: 'PRODUCTOS', ref: '/products' },
    { id: 2, title: 'CONTACTO', ref: '/contact' },
    { id: 3, title: 'NOSOTROS', ref: '/about' },
    { id: 4, title: 'EQUIPO', ref: '/team' },
    { id: 5, title: 'CARRITO', ref: '/cart' },
  ];

  constructor(public darkModeService: DarkModeService) {}

  toggleUser() {
    this.showUser = !this.showUser;
    if (this.showUser) {
      this.showCart = false;
    }
  }

  toggleCart() {
    this.showCart = !this.showCart;
    if (this.showCart) {
      this.showUser = false;
    }
  }

  toggleDarkMode() {
    this.darkModeService.darkMode.set(!this.darkModeService.darkMode());
  }
}
