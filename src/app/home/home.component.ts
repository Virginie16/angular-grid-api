import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // donnees: any = [];

  // produits: string[] = [];
  sites: string[] = [];
  selectedProduit = '';
  selectedSite = '';
  errorMessage = '';
  action: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    //this.loadProduits();
    this.loadSites();
  }

  loadSites(): void {
    this.apiService.get<string[]>('sites').subscribe(
      (data) => (this.sites = data),
      (error) => {
        console.error('Erreur de chargement des sites:', error);
        this.errorMessage = 'Erreur de chargement des sites.';
      },
    );
  }
  onSubmit(action: string): void {
    if (!this.selectedProduit || !this.selectedSite) {
      this.errorMessage = 'Veuillez sélectionner un site et un produit.';
      return;
    }
    this.router.navigate([`/${action}`], {
      queryParams: { site: this.selectedSite, produit: this.selectedProduit },
    });
  }
}
