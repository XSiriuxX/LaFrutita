import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backbutton',
  templateUrl: './backbutton.component.html',
  styleUrls: ['./backbutton.component.css'],
})
export class BackbuttonComponent {
  constructor(private router: Router) {}

  goback() {
    window.history.back();
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }
}
