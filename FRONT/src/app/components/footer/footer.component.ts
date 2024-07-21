import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  navegacion = [
    { id: 1, name: 'Inicio', ref: '/' },
    { id: 2, name: 'Productos', ref: '/products' },
    { id: 3, name: 'Carta', ref: '/menu' },
    { id: 4, name: 'Contacto', ref: '/contact' },
  ];
  empresa = [
    { id: 1, name: 'Sobre nosotros', ref: '/about' },
    { id: 2, name: 'Nuestro Equipo', ref: '/team' },
    { id: 3, name: 'Únete a nosotros', ref: '/team' },
  ];
  redes = [
    { id: 1, name: '@LaFrutita', ref: '/', img: 'assets/instagram.svg' },
    { id: 2, name: 'La Frutita', ref: '/', img: 'assets/facebook.svg' },
    { id: 3, name: 'LaFrutita', ref: '/', img: 'assets/tiktok.svg' },
  ];
}
