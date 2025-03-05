import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    return this.http
      .post<any>(`http://localhost:8081/api/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((response) => {
          // localStorage.setItem('token', response.token);
          console.dir(response);
        }),
      );
  }
  // login(credentials: { username: string; password: string }): Observable<any> {
  //   return this.http.post('http://localhost:8081/api/sites', credentials);
  // }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
