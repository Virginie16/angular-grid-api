import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // getDonnees(): Observable<any> {
  //   // 🔹 Retourne un Observable !
  //   return this.http.get<any>(this.apiUrl);
  // }
  private apiUrl = 'http://localhost:8080/api/'; // URL de ton backend

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('⚠️ Aucun token trouvé !');
      return new HttpHeaders();
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Ajout du token
      'Content-Type': 'application/json',
    });
  }

  get<T>(endpoint: string) {
    return this.http.get<T>(this.apiUrl + endpoint, {
      headers: this.getAuthHeaders(),
    });
  }
  // get<T>(endpoint: string, p0: unknown): Observable<T> {
  //   return this.http.get<T>(`${this.apiUrl}/${endpoint}`);
  // }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }
}
