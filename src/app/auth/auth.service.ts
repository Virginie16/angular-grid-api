import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, {
      username,
      password,
    });
  }

  getDataWithToken(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Token:', token);
    return this.http.get('http://localhost:8080/api/protected-endpoint', {
      headers,
    });
  }

  // login(username: string, password: string) {
  //   const body = new String().concat(
  //     'username=',
  //     username,
  //     '&password=',
  //     password,
  //   );

  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');

  //   return this.http.post('http://localhost:8080/api/auth/login', body, {
  //     headers: headers,
  //   });
  // }

  // logout() {
  //   localStorage.removeItem('token');
  // }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    return !!localStorage.getItem('token');
  }
}
