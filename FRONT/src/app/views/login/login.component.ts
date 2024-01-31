import { Component, Provider } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin(form: NgForm): void {
    if (form.value.email === '' || form.value.password === '') {
      alert('Fill in all the fields.');
    } else {
      this.authService.logInEmailandPassword(form.value).then(() => {
        this.authService.logIn(form.value).subscribe(
          (res) => {
            form.reset();
            this.router.navigate(['/']);
          },
          (err) => {
            console.log(err.message);
          }
        );
      });
    }
  }

  providerAction(provider: string): void {
    if (provider === 'google') {
      this.logInWithGoogle();
    } else {
      this.logInWithFacebook();
    }
  }

  async logInWithGoogle(): Promise<void> {
    try {
      const result = await this.authService.signInGoogle();

      if (!result.user.email) {
        alert('Algo malio sal.');
      } else {
        let user = {
          email: result.user.email,
          password: result.user.email,
        };

        this.authService.logIn(user).subscribe(
          (res) => {
            this.router.navigate(['/']);
          },
          (err) => {
            alert('Algo malio sal.');
            console.log(err.message);
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async logInWithFacebook(): Promise<void> {
    try {
      const result = await this.authService.signInFacebook();
      // this.router.navigateByUrl('/');
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
