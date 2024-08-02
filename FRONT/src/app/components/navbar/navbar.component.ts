import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  NavbarList = [
    { id: 1, title: 'Productos', ref: '/products' },
    { id: 2, title: 'Contacto', ref: '/contact' },
    { id: 3, title: 'Nosotros', ref: '/about' },
    { id: 4, title: 'Equipo', ref: '/team' },
    { id: 5, title: 'Carrito', ref: '/cart' },
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
