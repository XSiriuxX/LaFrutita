import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  mapFrame: any;
  selectedMap: string = 'Puente Blanco';

  ngOnInit() {
    this.mapFrame = document.getElementById('mapFrame');
    this.mapFrame.src =
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d967.5016367182119!2d-75.74074962318691!3d-14.076790632541522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9110e324888ea7b5%3A0xc01c08279e743fd3!2sLa%20Frutita!5e0!3m2!1ses-419!2spe!4v1707432887115!5m2!1ses-419!2spe';
  }

  showMap(url: string, mapName: string): void {
    if (this.mapFrame instanceof HTMLIFrameElement && this.mapFrame !== null) {
      this.mapFrame.src = url;
    }
    this.selectedMap = mapName;
  }
}
