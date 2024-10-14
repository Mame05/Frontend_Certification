import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnnonceService } from '../../../Services/annonce.service';
import { CommonModule } from '@angular/common';
import { RendezVousService } from '../../../Services/rendez-vous.service';

@Component({
  selector: 'app-detail-annonce',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './detail-annonce.component.html',
  styleUrl: './detail-annonce.component.css'
})
export class DetailAnnonceComponent implements OnInit {
  annonce: any;

  constructor(
    private route: ActivatedRoute,
    private annonceService: AnnonceService,
    private rendezVousService: RendezVousService

  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.annonceService.getAnnonce(+id).subscribe({
        next: (data) => {
          this.annonce = data;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des détails de l\'annonce', err);
        }
      });
    }
  }
  changeEtat(rendezVousId: number, etat: boolean) {
    if (!rendezVousId) {
      console.error('ID du rendez-vous manquant');
      return;
    }
  
    this.rendezVousService.updateEtat(rendezVousId, { etat }).subscribe({
      next: (response) => {
        console.log('État mis à jour avec succès', response);
        // Mettre à jour l'état du rendez-vous dans l'annonce
        const rendezVous = this.annonce?.rendezVous.find((rdv: { id: number; etat: boolean }) => rdv.id === rendezVousId);
        if (rendezVous) {
          rendezVous.etat = etat; // ou whatever property you're updating
        }

      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'état', error);
        // Afficher un message d'erreur à l'utilisateur
      },
      complete: () => {
        console.log('Mise à jour de l\'état terminée');
      }
    });      
  }
  
}


