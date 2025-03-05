import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private apiService: ApiService) {}

  getUtilisateurs(): Observable<any[]> {
    return this.apiService.get<any[]>('utilisateurs');
  }

  getProduits(): Observable<any[]> {
    return this.apiService.get<any[]>('produits');
  }
}
