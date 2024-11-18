import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BanqueSangService } from '../../../Services/banque-sang.service';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-rendez-vous',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './update-rendez-vous.component.html',
  styleUrl: './update-rendez-vous.component.css'
})
export class UpdateRendezVousComponent implements OnInit  {
  rendezVousId!: number;
  rendezVousForm!: FormGroup;
  banques: any[] = []; // Liste des banques de sang récupérées de l'API
  dateDebut!: string;
  dateFin!: string;
  annoncesDates: string[] = [];

  constructor(
    private fb: FormBuilder,
    private banqueSangService: BanqueSangService,
    private rendezVousService: RendezVousService,
    private route: ActivatedRoute,
    private router: Router
  ) {
      //this.rendezVousId = this.route.snapshot.params['id'];
      
  }
  ngOnInit(): void {
    this.rendezVousId = Number(this.route.snapshot.paramMap.get('id')); // Récupérer l'ID du rendez-vous depuis l'URL

    // Récupérer les données du rendez-vous et charger les dates d'annonce
    this.rendezVousService.getRendezVousWithAnnonceDates(this.rendezVousId).subscribe((response) => {
      console.log(response); // Vérifiez la réponse de l'API
      this.dateDebut = response.dateDebut;
      this.dateFin = response.dateFin;

      // Appel de la méthode pour générer la liste des dates
      this.loadAnnonceDates(this.dateDebut, this.dateFin);
    });
    // Initialiser le formulaire
    this.rendezVousForm = this.fb.group({
      etat: [null, Validators.required],
      groupe_sanguin: ['', Validators.required],
      date_prelevement: ['', Validators.required],
      banque_sang_id: ['', Validators.required]
    });
   // Ecouter les changements de valeur du champ 'etat' pour ajuster les validations

  this.rendezVousForm.get('etat')?.valueChanges.subscribe((etat: string) => {
    const isValid = etat === 'true';  // Conversion en booléen
    console.log('État converti :', isValid);  // Pour déboguer la valeur
  
    if (isValid) {
      this.rendezVousForm.get('groupe_sanguin')?.setValidators(Validators.required);
      this.rendezVousForm.get('date_prelevement')?.setValidators(Validators.required);
      this.rendezVousForm.get('banque_sang_id')?.setValidators(Validators.required);
    } else {
      this.rendezVousForm.get('groupe_sanguin')?.clearValidators();
      this.rendezVousForm.get('date_prelevement')?.clearValidators();
      this.rendezVousForm.get('banque_sang_id')?.clearValidators();
    }
  
    this.rendezVousForm.get('groupe_sanguin')?.updateValueAndValidity();
    this.rendezVousForm.get('date_prelevement')?.updateValueAndValidity();
    this.rendezVousForm.get('banque_sang_id')?.updateValueAndValidity();
  });

    // Charger les banques de sang
    this.loadBanquesSang();
  }

  // Méthode pour charger les banques de sang
  loadBanquesSang() {
    this.banqueSangService.getBanques().subscribe({
      next: (data) => {
        this.banques = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des banques de sang', error);
      }
    });
  }
  // Méthode pour générer les dates entre dateDebut et dateFin
  loadAnnonceDates(dateDebut: string, dateFin: string) {
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
    const dates = [];

    // Remplir la liste des dates entre dateDebut et dateFin
    for (let i = 0; i <= (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24); i++) {
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + i);
      dates.push(newDate.toISOString().split('T')[0]); // Format 'YYYY-MM-DD'
    }

    this.annoncesDates = dates;
    console.log('Dates générées :', this.annoncesDates); // Vérifiez que les dates sont générées correctement
  }
  // Méthode pour mettre à jour l'état du rendez-vous
  updateEtat() {
    if (this.rendezVousForm.invalid) {
      Swal.fire({
        title: 'Formulaire invalide',
        text: 'Veuillez remplir tous les champs requis.',
        icon: 'warning',
        confirmButtonColor: '#f0ad4e',
        confirmButtonText: 'OK'
      });
      return;
    }

    const formData = this.rendezVousForm.value;

     // Convertir 'etat' en booléen avant d'envoyer
     formData.etat = formData.etat === 'true' ? true : false;
     
    // Appel du service pour mettre à jour l'état du rendez-vous
    this.rendezVousService.updateEtatAddPoche(this.rendezVousId, formData).subscribe({
      next: (response: any) => {
        Swal.fire({
          title: 'Succès!',
          text: response.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000 // L'alerte disparaît après 2 secondes
        })
          // Rediriger vers la liste des poches de sang après la confirmation de l'alerte
          setTimeout(() => {
            // Rediriger vers la liste des annonces après confirmation
          this.router.navigate(['/sidebar1/poche-sang']); // Redirection après succès
        }, 2000);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du rendez-vous', error);
        if (error.status === 422 && error.error?.errors) {
          // Gestion des erreurs de validation
          const errors = error.error.errors;
          for (const field in errors) {
            const control = this.rendezVousForm.get(field);
            if (control) {
              control.setErrors({ serverError: errors[field] });
            }
          }
          Swal.fire({
            title: 'Erreur de validation',
            html: Object.values(errors).map(err => `<p>${err}</p>`).join(''),
            icon: 'error',
            showConfirmButton: false,
            timer: 3000 // L'alerte disparaît après 3 secondes
          });
        } else {
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

}