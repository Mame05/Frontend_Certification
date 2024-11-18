import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { BanqueSangService } from '../../../Services/banque-sang.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-poche-rendez-vous',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './update-poche-rendez-vous.component.html',
  styleUrls: ['./update-poche-rendez-vous.component.css']
})
export class UpdatePocheRendezVousComponent implements OnInit {
  etat: boolean = false;
  groupeSanguin: string = '';
  datePrelevement: string = '';
  banqueSangId: number = 0;
  banqueSangMatricule: string = ''; // Nouveau champ pour stocker la matricule de la banque
  pocheId: number = 0;
  rendezVousId: number = 0; 
  banquesSang: any[] = []; // Stocker les banques de sang disponibles
  dateDebut!: string;
  dateFin!: string;
  annoncesDates: string[] = []; // Liste des dates valides pour la sélection

  constructor(
    private fb: FormBuilder,
    private rendezVousService: RendezVousService,
    private banqueSangService: BanqueSangService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pocheId = +this.route.snapshot.paramMap.get('id')!;
    
    // Charger les données de la poche sanguine
    this.rendezVousService.getPocheById(this.pocheId).subscribe(
      (response: any) => {
        this.groupeSanguin = response.groupe_sanguin;
        this.datePrelevement = response.date_prelevement;
        this.banqueSangMatricule = response.banque_sang_matricule; // Charge la matricule
        this.banqueSangId = response.banque_sang_id; // Si vous avez besoin de l'ID pour la mise à jour
        this.rendezVousId = response.rendez_vouse_id; // Récupère rendezVousId

        // Récupérer les dates de l'annonce associée
      this.rendezVousService.getRendezVousWithAnnonceDates(this.rendezVousId).subscribe(
        (response) => {
          this.dateDebut = response.dateDebut;
          this.dateFin = response.dateFin;
          // Appel de la méthode pour générer la liste des dates
        this.loadAnnonceDates(this.dateDebut, this.dateFin);
        },
        (error) => {
          console.error('Erreur lors de la récupération des dates de l\'annonce:', error);
        }
      );
    },
    (error) => {
      console.error('Erreur lors de la récupération des données de la poche:', error);
    }
  );

    // Charger les banques de sang
    this.banqueSangService.getBanques().subscribe(
      (response: any[]) => {
        this.banquesSang = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des banques de sang:', error);
      }
    );
  }
  // Méthode pour capturer la date sélectionnée
  onDateChange(event: any) {
    this.datePrelevement = new Date(event.target.value).toISOString().split('T')[0];
    console.log("Date de prélèvement sélectionnée :", this.datePrelevement);
  }


  // Générer les dates entre dateDebut et dateFin
  loadAnnonceDates(dateDebut: string, dateFin: string) {
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
    const dates = [];

    for (let i = 0; i <= (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24); i++) {
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + i);
      dates.push(newDate.toISOString().split('T')[0]);
    }

    this.annoncesDates = dates;
    console.log('Dates générées :', this.annoncesDates);
  }
  

  handleUpdatePoche() {
    const data = {
      groupe_sanguin: this.groupeSanguin,
      date_prelevement: this.datePrelevement,
      banque_sang_id: this.banqueSangId,
    };
    console.log("Données envoyées pour mise à jour :", data);

    this.rendezVousService.updatePocheUS(this.pocheId, data).subscribe({
      next: (response) => {
        // Message de succès avec SweetAlert
        Swal.fire({
          title: 'Mise à jour réussie!',
          text: 'Les informations de la poche de sang ont été mises à jour avec succès.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000 // L'alerte disparaît après 2 secondes
        })
          // Rediriger vers la liste des annonces après la confirmation de l'alerte
          setTimeout(() => {
          this.router.navigate(['/sidebar1/poche-sang']);
        }, 2000);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la poche:', error);
        if (error.status === 422 && error.error?.errors) {
          // Gestion des erreurs de validation
          const errors = error.error.errors;
          const errorMessages = Object.values(errors).flat().join('<br>');

          Swal.fire({
            title: 'Erreur de validation',
            html: errorMessages,
            icon: 'error',
            showConfirmButton: false,
            timer: 3000 // L'alerte disparaît après 3 secondes
          });
        } else {
          // Erreur générique
          Swal.fire({
            title: 'Erreur!',
            text: 'Une erreur est survenue lors de la mise à jour.',
            icon: 'error',
            showConfirmButton: false,
            timer: 3000 // L'alerte disparaît après 3 secondes
          });
        }
      }
    });
  }
  
  reloadPocheData() {
    this.rendezVousService.getPocheById(this.pocheId).subscribe(
      (response: any) => {
        this.groupeSanguin = response.groupe_sanguin;
        this.datePrelevement = response.date_prelevement; // Cette valeur devrait être la nouvelle date si la mise à jour a fonctionné
        console.log("Données de la poche rechargées :", response);
      },
      (error) => {
        console.error('Erreur lors du rechargement des données de la poche:', error);
      }
    );
}
}
