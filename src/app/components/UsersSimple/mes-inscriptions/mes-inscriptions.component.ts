import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  filtreEtat: boolean | null = null; // Variable pour stocker le filtre de l'état

  constructor(private annonceService: AnnonceService) {}

  // Méthode pour formater la date
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    // Formater la date avec Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);

    // Mettre la première lettre en majuscule
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

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
  // Nouvelle méthode pour calculer la durée entre deux dates
  calculerDuree(dateDebut: string, dateFin: string): number {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const diffTime = Math.abs(fin.getTime() - debut.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir le temps en jours
    return diffDays + 1;
  }

}
