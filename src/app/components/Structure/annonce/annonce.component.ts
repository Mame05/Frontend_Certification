import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AnnonceService } from '../../../Services/annonce.service';

@Component({
  selector: 'app-annonce',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './annonce.component.html',
  styleUrl: './annonce.component.css'
})
export class AnnonceComponent   implements OnInit{
  annonces: any[] = [];  // Utilisation d'un tableau d'objets brut
  constructor(private annonceService: AnnonceService) {}

  ngOnInit() {
   this.getAnnonce();
   //this.getAnnonce(); // Rafraîchir la liste quand une annonce est ajoutée
  }


  getAnnonce() {
    // Récupération des annonces à partir du service
    this.annonceService.getAnnonces().subscribe( {
      next: (data) => {
        console.log('Données des annonces:', data);
        this.annonces = data.sort((a, b) => new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime()); // Tri;
      },
      error: (err) => console.error('Erreur lors de la récupération des annonces:', err)
    });    
  }


  deleteAnnonce(id: number) {
    this.annonceService.deleteAnnonce(id).subscribe(() => {
      this.annonces = this.annonces.filter(s => s.id !== id);
    });
  }

}
