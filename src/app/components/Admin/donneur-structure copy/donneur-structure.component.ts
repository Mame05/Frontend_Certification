import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';  // Ajoutez cette ligne pour utiliser *ngFor dans le template
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-donneur-structure',
  standalone: true,
  imports: [RouterLink, NgFor],  // Ajoutez NgFor ici
  templateUrl: './donneur-structure.component.html',
  styleUrls: ['./donneur-structure.component.css']
})
export class DonneurStructureComponent implements OnInit {
  donneurs: any[] = [];  // Tableau pour stocker les donneurs récupérés
  structure: any = {};  // Stocker les informations de la structure et des banques de sang

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDonneurs();
    this.getStructureDetails();
  }

  getStructureDetails() {
    this.http.get<any>('http://127.0.0.1:8000/api/structures/2')  // Remplacez l'URL par celle de votre API
      .subscribe(
        data => {
          this.structure = data;  // Stocker les informations récupérées dans la variable structure
          console.log('Détails de la structure:', this.structure);
        },
        error => {
          console.error('Erreur lors de la récupération des détails de la structure', error);
        }
      );
  }

  getDonneurs() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/poche-sanguins/4')  // Remplacez l'URL par celle de votre API
      .subscribe(
        data => {
          this.donneurs = data;
          console.log('Donneurs récupérés:', this.donneurs);
        },
        error => {
          console.error('Erreur lors de la récupération des donneurs', error);
        }
      );
  }
}
