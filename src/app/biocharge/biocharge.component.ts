import { Biocharge } from './biocharge.models';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-biocharge',
  imports: [FormsModule, CommonModule],
  templateUrl: './biocharge.component.html',
  styleUrl: './biocharge.component.css',
})
export class BiochargeComponent implements OnInit {
  biocharges: Biocharge[] = [];
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const site = params['site'];
      const produit = params['produit'];
      if (site && produit) {
        this.loadBiocharges(site, produit);
      } else {
        this.errorMessage = 'Paramètres manquants.';
      }
    });
  }

  loadBiocharges(site: string, produit: string): void {
    const url = `http://localhost:8080/api/lot/biocharge?site=${site}&produit=${produit}`;

    this.http
      .get<Biocharge[]>(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .subscribe(
        (data) => {
          console.log('oui', Array.isArray(data));
          console.log(url);
          console.log('Réponse API:', data);
          this.biocharges = data;
        },
        (error) => console.error('Erreur API:', error),
      );
  }
}
