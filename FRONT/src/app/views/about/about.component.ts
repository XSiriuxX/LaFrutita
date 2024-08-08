import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  list1 = [
    {
      img: '',
      name: 'Promover la salud y el bienestar',
      description:
        'En La Frutita, nuestra misión es ofrecer opciones gastronómicas que nutran el cuerpo y deleiten el paladar, utilizando ingredientes frescos y locales para fomentar un estilo de vida saludable.',
    },
    {
      img: '',
      name: 'Compromiso con la frescura y la calidad',
      description:
        'Valoramos la frescura de nuestros ingredientes por encima de todo. Nos esforzamos por seleccionar los productos más frescos y de alta calidad.',
    },
    {
      img: '',
      name: 'Excelencia en el servicio al cliente.',
      description:
        'En La Frutita, nos esforzamos por brindar una experiencia acogedora y personalizada a cada cliente, asegurando que se sientan bienvenidos y satisfechos en cada visita.',
    },
    {
      img: '',
      name: 'Sostenibilidad y la responsabilidad',
      description:
        'Nos comprometemos a operar de manera sostenible, minimizando nuestro impacto ambiental mediante el uso de ingredientes orgánicos y prácticas de cocina que respeten el medio ambiente.',
    },
  ];

  list2 = ['', '', '', '', '', ''];

  slider: any;
  defaultTransform: any;

  goNext() {
    this.defaultTransform = this.defaultTransform - 400;
    if (Math.abs(this.defaultTransform) >= this.slider.scrollWidth / 1.7)
      this.defaultTransform = 0;
    this.slider.style.transform = 'translateX(' + this.defaultTransform + 'px)';
  }

  goPrev() {
    if (Math.abs(this.defaultTransform) === 0) this.defaultTransform = 0;
    else this.defaultTransform = this.defaultTransform + 400;
    this.slider.style.transform = 'translateX(' + this.defaultTransform + 'px)';
  }

  ngOnInit(): void {
    this.slider = document.getElementById('slider');
    this.defaultTransform = 0;
  }
}
