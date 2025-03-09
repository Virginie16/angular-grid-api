import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  providers: [ApiService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  produits: string[] = [];
  sites: string[] = [];
  selectedProduit = '';
  selectedSite = '';
  errorMessage = '';
  action: any;

  private apiUrl = 'http://localhost:8080/api/'; // URL de ton backend

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.loadProduits();
    this.loadSites();
  }

  loadSites(): void {
    this.http
      .get<string[]>('http://localhost:8080/api/sites', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .subscribe(
        (data) => {
          console.log('Réponse API:', data);
          this.sites = data;
        },
        (error) => console.error('Erreur API:', error)
      );
  }

  loadProduits(): void {
    this.http
      .get<string[]>('http://localhost:8080/api/produits', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .subscribe(
        (data) => {
          console.log('Réponse API:', data);
          this.produits = data;
        },
        (error) => console.error('Erreur API:', error)
      );
  }

  onSubmit(action: string): void {
    if (!this.selectedProduit || !this.selectedSite) {
      this.errorMessage = 'Veuillez sélectionner un site et un produit.';
      return;
    }
    console.log(
      `Navigation vers : ${action} avec Site=${this.selectedSite}, Produit=${this.selectedProduit}`
    );
    this.router.navigate([`/${action}`], {
      queryParams: { site: this.selectedSite, produit: this.selectedProduit },
    });
  }
}
