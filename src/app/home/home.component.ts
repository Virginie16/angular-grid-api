import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  imports: [],
  template: `<h1>Accueil</h1>
    <hr />`,
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  donnees: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getDonnees().subscribe(
      (data) => {
        this.donnees = data;
        console.log(this.donnees);
      },
      (error) => {
        console.error(
          'Grosse Erreur lors de la récupération des données',
          error,
        );
      },
    );
  }
}
