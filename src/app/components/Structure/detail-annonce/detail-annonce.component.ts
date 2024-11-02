import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  selecteRendezVousId: number | null = null;  // Sauvegarde l'ID de l'inscription pour laquelle on ajoute une poche
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,  // Import du router pour la navigation
    private annonceService: AnnonceService,
    private rendezVousService: RendezVousService

  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.annonceService.getAnnonce(+id).subscribe({
        next: (data) => {
          this.annonce = data;
          console.log(this.annonce.inscrits); 
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des détails de l\'annonce', err);
        }
      });
    }
  }
  redirectToUpdateEtat(rendezVousId: number): void {
    console.log('ID du rendez-vous:', rendezVousId);  // Ajoutez ceci pour déboguer
    this.router.navigate(['/sidebar1/update-etat', rendezVousId]);
  }
 }
//////////////////////////////////////////////////////

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { AnnonceService } from '../../../Services/annonce.service';
// import { CommonModule } from '@angular/common';
// import { RendezVousService } from '../../../Services/rendez-vous.service';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { error } from 'console';

// @Component({
//   selector: 'app-detail-annonce',
//   standalone: true,
//   imports: [RouterLink, CommonModule, ReactiveFormsModule],
//   templateUrl: './detail-annonce.component.html',
//   styleUrl: './detail-annonce.component.css'
// })
// export class DetailAnnonceComponent implements OnInit {
//   annonce: any;
//   //annonceId!: number; // Ajout de cette variable pour l'ID de l'annonce
//   rendezVousForm: FormGroup;
//   rendezVousId!: number;
  

//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private annonceService: AnnonceService,
//     private rendezVousService: RendezVousService

//   ) {
//     // Initialiser le formulaire avec des validations
//     this.rendezVousForm = this.fb.group({
//       etat: [false, Validators.required],
//       groupe_sanguin: ['', [Validators.required, Validators.pattern('^(A|B|O|AB)[+-]$')]],
//       date_prelevement: ['', Validators.required],
//       banque_sang_id: ['', Validators.required],
//       donneur_externe_id: ['']
//     });
//    }

//   ngOnInit(): void {
//     // Récupérer l'ID de l'annonce pour afficher ses détails
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.annonceService.getAnnonce(+id).subscribe({
//         next: (data) => {
//           this.annonce = data;
//         },
//         error: (err) => {
//           console.error('Erreur lors de la récupération des détails de l\'annonce', err);
//         }
//       });
//     }
//     // Récupérer l'ID du rendez-vous
//     const rendezVousIdParam = this.route.snapshot.paramMap.get('rendezvousId');
//     this.rendezVousId = rendezVousIdParam ? +rendezVousIdParam : 0;

//     if (this.rendezVousId <= 0) {
//       alert('Erreur : L\'ID du rendez-vous est invalide.');
//       return;
//     }
//     // Optionnel : Charger les détails du rendez-vous ici si nécessaire
//   this.loadRendezVousDetails(this.rendezVousId);
//   }
//   // Méthode pour charger les détails du rendez-vous
// loadRendezVousDetails(id: number) {
//   this.rendezVousService.getRendezVous(id).subscribe({
//     next: (data) => {
//       // Traitez les détails du rendez-vous ici
//       console.log('Détails du rendez-vous récupérés:', data);
//     },
//     error: (error) => {
//       console.error('Erreur lors de la récupération des détails du rendez-vous:', error);
//     }
//   });
// }
  
//   // changeEtat(rendezVousId: number, etat: boolean) {
//   //   /*if (!rendezVousId) {
//   //     console.error('ID du rendez-vous manquant');
//   //     return;
//   //   }*/
  
//   //   this.rendezVousService.updateEtat(rendezVousId, { etat }).subscribe({
//   //     next: (response) => {
//   //       console.log('État mis à jour avec succès', response);
//   //       // Mettre à jour l'état du rendez-vous dans l'annonce
//   //       const rendezVous = this.annonce?.rendezVous.find((rdv: { id: number; etat: boolean }) => rdv.id === rendezVousId);
//   //       if (rendezVous) {
//   //         rendezVous.etat = etat; // ou whatever property you're updating
//   //         // Si "effectué", afficher le formulaire d'ajout de poche
//   //         if (etat) {
//   //           this.isAddingPoche = true;
//   //           this.selectedrendezVousId = rendezVousId;
//   //         } else {
//   //           this.isAddingPoche = false;
//   //           this.selectedrendezVousId = null;
//   //         }
//   //       }

//   //     },
//   //     error: (error) => {
//   //       console.error('Erreur lors de la mise à jour de l\'état', error);
//   //       // Afficher un message d'erreur à l'utilisateur
//   //     }
//   //     /*complete: () => {
//   //       console.log('Mise à jour de l\'état terminée');
//   //     }*/
//   //   });      
//   // }
//   // // Soumettre le formulaire pour ajouter une poche sanguine
//   // submitPocheForm() {
//   //   if (!this.selectedrendezVousId) {
//   //     console.error('Rendez-vous non sélectionné pour ajouter une poche');
//   //     return;
//   //   }

//   //   this.pocheFormData.rendez_vouse_id = this.selectedrendezVousId;
//   //   this.pocheSangService.createPoche(this.pocheFormData).subscribe({
//   //     next: (response) => {
//   //       console.log('Poche ajoutée avec succès', response);
//   //       this.isAddingPoche = false; // Réinitialiser le formulaire
//   //       this.pocheFormData = {};
//   //     },
//   //     error: (error) => {
//   //       console.error('Erreur lors de l\'ajout de la poche sanguine', error);
//   //     }
//   //   });
//   // }
//   // Méthode pour soumettre le formulaire et appeler le service
//   onSubmit() {
//     if (this.rendezVousForm.valid) {
//       if (this.rendezVousId <= 0) {
//         alert('Erreur : L\'ID du rendez-vous est invalide.');
//         return;
//       }
//       const formData = this.rendezVousForm.value;
      

//       this.rendezVousService.updateEtat(this.rendezVousId, formData).subscribe({
//         next: (response:any) => {
//           console.log('Mise à jour réussie:', response);
//           alert(response?.message); // Afficher un message de succès
//         },
//         error:(error) => {
//           console.error('Erreur lors de la mise à jour:', error);
//           alert(`Une erreur est survenue lors de la mise à jour : ${error.message || error.error.message}`);
//         }
//     });
//     } else {
//       console.log('Formulaire invalide');
//     }
//   }

  
// }