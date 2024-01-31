import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userpopup',
  templateUrl: './userpopup.component.html',
  styleUrls: ['./userpopup.component.css'],
})
export class UserpopupComponent {
  @Input() isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
