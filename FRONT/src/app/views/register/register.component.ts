import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onRegister(form: NgForm): void {
    if (
      form.value.username === '' ||
      form.value.email === '' ||
      form.value.password === ''
    ) {
      alert('Fill in all the fields.');
    } else {
      this.authService.signUpEmailandPassword(form.value);
      this.authService.register(form.value).subscribe((res) => {
        form.reset();
        this.router.navigate(['/']);
      });
    }
  }

  providerAction(provider: string): void {
    if (provider === 'google') {
      this.singUpWithGoogle();
    } else {
      this.singUpWithFacebook();
    }
  }

  async singUpWithGoogle(): Promise<void> {
    try {
      const result = await this.authService.signInGoogle();

      if (!result.user.email) {
        alert('Algo malio sal.');
      } else {
        let user = {
          username: result.user.displayName?.replace(/\s+/g, ''),
          email: result.user.email,
          password: result.user.email,
        };

        this.authService.register(user).subscribe(
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

  async singUpWithFacebook(): Promise<void> {
    try {
      const result = await this.authService.signInFacebook();
      // this.router.navigateByUrl('/');
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
