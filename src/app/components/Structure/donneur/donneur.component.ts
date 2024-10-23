import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnnonceService } from '../../../Services/annonce.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donneur',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './donneur.component.html',
  styleUrl: './donneur.component.css'
})
export class DonneurComponent  implements OnInit {
  donneurs: any[] = [];

  constructor(private annonceService: AnnonceService) { }

  ngOnInit() {
    this.annonceService.getUtilisateursWithCompletedInscriptions()
      .subscribe((data: any) => {
        this.donneurs = data;
        console.log('Données récupérées :', this.donneurs); // Pour le débogage
      }, error => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      });
  }

}
