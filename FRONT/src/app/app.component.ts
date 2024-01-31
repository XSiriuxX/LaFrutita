import { Component, HostBinding } from '@angular/core';
import { DarkModeService } from './services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FRONT';

  constructor(public darkModeService: DarkModeService) {}

  @HostBinding('class.dark') get mode() {
    return this.darkModeService.darkMode();
  }
}
