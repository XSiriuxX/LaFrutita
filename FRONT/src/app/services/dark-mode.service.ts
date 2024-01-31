import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('DarkMode') || 'false')
  );

  constructor() {
    effect(() => {
      window.localStorage.setItem('DarkMode', JSON.stringify(this.darkMode()));
    });
  }
}
