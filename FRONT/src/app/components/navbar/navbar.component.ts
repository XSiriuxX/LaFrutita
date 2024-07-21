import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  NavbarList = [
    { id: 1, title: 'PRODUCTOS', ref: '/products' },
    { id: 2, title: 'CONTACTO', ref: '/contact' },
    { id: 3, title: 'NOSOTROS', ref: '/about' },
    { id: 4, title: 'EQUIPO', ref: '/team' },
    { id: 5, title: 'CARRITO', ref: '/cart' },
  ];

  ngOnInit(): void {
    const menuToggle = document.getElementById(
      'menu-toggle'
    ) as HTMLInputElement;
    const mobileMenu = document.getElementById('mobile-menu')!;

    menuToggle.addEventListener('change', () => {
      if (menuToggle.checked) {
        mobileMenu.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
      }
    });
  }
}
