import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../login/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';
  private http = inject(HttpClient);
  private _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();
  isConnected = computed(() => this.currentUser() !== null);

  login(
    username: string,
    password: string
  ): Observable<{ accessToken: string; tokenType: string }> {
    return this.http
      .post<{ accessToken: string; tokenType: string }>(this.apiUrl, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          console.log(response); // Vérifie bien la réponse
          localStorage.setItem('accessToken', response.accessToken); // Stocke le token
          console.log(response.accessToken);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Méthode pour rafraîchir les tokens. Utilisée par l'intercepteur HTTP
  revokeToken(): Observable<any> {
    return this.http
      .post<any>('/api/revoke-token', {}, { withCredentials: true })
      .pipe(
        tap((response) => {
          // Les nouveaux tokens sont automatiquement stockés dans des cookies HTTP-only
          console.log('Tokens refreshed successfully');
        })
      );
  }
  logout(): Observable<any> {
    return this.http
      .post<any>('/api/logout', {}, { withCredentials: true })
      .pipe(
        tap(() => {
          // Le backend devrait supprimer les cookies
          this._currentUser.set(null);
        })
      );
  }
}
