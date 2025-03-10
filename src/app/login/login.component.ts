import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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
  // constructor(private authService: AuthService, private router: Router) {}
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        // console.log('✅ Token reçu:', response.token);
        this.router.navigate(['/home']);
      },
      error: (e: HttpErrorResponse) =>
        console.error('Erreur de connexion:', e.message),
    });
  }
}
