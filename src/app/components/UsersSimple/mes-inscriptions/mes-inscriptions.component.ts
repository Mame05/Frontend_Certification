import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../../Services/annonce.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-mes-inscriptions',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './mes-inscriptions.component.html',
  styleUrl: './mes-inscriptions.component.css'
})
export class MesInscriptionsComponent implements OnInit {
  inscriptionsEnCours: any[] = [];
  historiqueInscriptions: any[] = [];

  constructor(private annonceService: AnnonceService) {}

  ngOnInit(): void {
    this.loadInscriptions();
  }

  loadInscriptions() {
    this.annonceService.getInscriptions().subscribe(
      (data: any) => {
        this.inscriptionsEnCours = data.inscriptionsEnCours;
        this.historiqueInscriptions = data.historiqueInscriptions;
      },
      (error) => {
        console.error('Erreur lors du chargement des inscriptions', error);
      }
    );
  }

  annulerInscription(rendezVousId: number) {
    this.annonceService.annulerInscription(rendezVousId).subscribe(
      (response: any) => {
        Swal.fire('Succès', response.message, 'success');
        this.loadInscriptions(); // Recharger les inscriptions
      },
      (error) => {
        Swal.fire('Erreur', 'Erreur lors de l\'annulation de l\'inscription.', 'error');
      }
    );
  }

  supprimerHistorique(rendezVousId: number) {
    this.annonceService.supprimerHistorique(rendezVousId).subscribe(
      (response: any) => {
        Swal.fire('Succès', response.message, 'success');
        this.loadInscriptions(); // Recharger l'historique
      },
      (error) => {
        Swal.fire('Erreur', 'Erreur lors de la suppression de l\'historique.', 'error');
      }
    );
  }

}
