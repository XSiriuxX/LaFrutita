import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent {
  selected = '';

  list1 = [
    {
      Name: 'Cocineros',
      Content: [
        {
          img: 'img',
          title: 'Nombre y Apellido',
          description: 'Descripcion del colaborador',
        },
        {
          img: 'img',
          title: 'Nombre y Apellido',
          description: 'Descripcion del colaborador',
        },
        {
          img: 'img',
          title: 'Nombre y Apellido',
          description: 'Descripcion del colaborador',
        },
        {
          img: 'img',
          title: 'Nombre y Apellido',
          description: 'Descripcion del colaborador',
        },
      ],
    },
    {
      Name: 'Administracion',
      Content: [
        {
          img: 'img2',
          title: 'Nombre y Apellido',
          description: 'Descripcion del colaborador',
        },
        {
          img: 'img2',
          title: 'Nombre y Apellido',
          description: 'Descripcion del colaborador',
        },
        {
          img: 'img2',
          title: 'Nombre y Apellido',
          description: 'Descripcion del colaborador',
        },
      ],
    },
    {
      Name: 'Atencion',
      Content: [
        {
          img: 'img3',
          title: 'Nombre y Apellido',
          description: 'Descripcion del colaborador',
        },
        {
          img: 'img3',
          title: 'Nombre y Apellido',
          description: 'Descripcion del colaborador',
        },
        {
          img: 'img3',
          title: 'Nombre y Apellido',
          description: 'Descripcion del colaborador',
        },
      ],
    },
    {
      Name: 'Barman',
      Content: [
        {
          img: 'img',
          title: 'Nombre y Apellido',
          description: 'Descripcion del colaborador',
        },
      ],
    },
  ];

  content = this.list1[0].Content;

  newselectect(name: string) {
    this.selected = name;
    const selected = this.list1.find((item) => item.Name === name);

    this.content = selected?.Content || [];
  }

  ngOnInit(): void {
    this.newselectect('Cocineros');
  }
}
