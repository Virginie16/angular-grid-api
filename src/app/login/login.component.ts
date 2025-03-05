import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import e from 'cors';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `<form (ngSubmit)="onSubmit()">
    <input [(ngModel)]="username" name="username" required />
    <br /><br />
    <input
      [(ngModel)]="password"
      type="password"
      name="password"
      required
    /><br /><br />
    <button type="submit">Login</button>
  </form>`,
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = 'admin';
  password = 'admin';
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  onSubmit() {
    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe(
        {
          next: () => this.router.navigate(['/home']),
          error: (e) => console.error(e),
        },
        // () => {
        //   this.router.navigate(['/home']);
        // },
        // (error) => {
        //   console.error('ahahahah', error);
        // },
      );
  }
}
