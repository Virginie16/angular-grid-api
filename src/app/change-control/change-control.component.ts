import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeControl } from './change-control.models';

@Component({
  selector: 'app-change-control',
  imports: [FormsModule, CommonModule],
  templateUrl: './change-control.component.html',
  styleUrl: './change-control.component.css',
})
export class ChangeControlComponent implements OnInit {
  changeControls: ChangeControl[] = [];
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const site = params['site'];
      const produit = params['produit'];
      if (site && produit) {
        this.loadChangeControls(site, produit);
      } else {
        this.errorMessage = 'Paramètres manquants.';
      }
    });
  }

  loadChangeControls(site: string, produit: string): void {
    const url = `http://localhost:8080/api/lot/change-control?site=${site}&produit=${produit}`;

    this.http
      .get<ChangeControl[]>(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .subscribe(
        (data) => {
          console.log('oui', Array.isArray(data));
          console.log(url);
          console.log('Réponse API:', data);
          this.changeControls = data;
        },
        (error) => console.error('Erreur API:', error)
      );
  }
}
