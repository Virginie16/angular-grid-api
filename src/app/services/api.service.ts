import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BiochargeComponent } from '../biocharge/biocharge.component';
import { ChangeControlComponent } from '../change-control/change-control.component';
import { ChangeControl } from '../change-control/change-control.models';
import { Biocharge } from '../biocharge/biocharge.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
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
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.apiUrl + endpoint, {
      headers: this.getAuthHeaders(),
    });
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }
  getLotsBiocharges(site: string, produit: string): Observable<Biocharge[]> {
    const url = `http://localhost:8080/api/lot/biocharge?site=${site}&produit=${produit}`;
    return this.http.get<Biocharge[]>(url);
  }

  getLotsChangeControl(
    site: string,
    produit: string,
  ): Observable<ChangeControl[]> {
    const url = `http://localhost:8080/api/lot/change-control?site=${site}&produit=${produit}`;
    return this.http.get<ChangeControl[]>(url);
  }
}
