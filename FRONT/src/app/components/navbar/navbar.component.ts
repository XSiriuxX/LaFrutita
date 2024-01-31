import { Component, HostBinding } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(
    public darkModeService: DarkModeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

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
