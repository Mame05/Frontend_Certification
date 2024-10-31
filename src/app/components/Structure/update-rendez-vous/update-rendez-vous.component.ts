import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BanqueSangService } from '../../../Services/banque-sang.service';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-rendez-vous',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './update-rendez-vous.component.html',
  styleUrl: './update-rendez-vous.component.css'
})
export class UpdateRendezVousComponent implements OnInit  {
  rendezVousId: number;
  rendezVousForm!: FormGroup;
  banques: any[] = []; // Liste des banques de sang récupérées de l'API

  constructor(
    private fb: FormBuilder,
    private banqueSangService: BanqueSangService,
    private rendezVousService: RendezVousService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.rendezVousId = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    // Initialiser le formulaire
    this.rendezVousForm = this.fb.group({
      etat: [null, Validators.required],
      groupe_sanguin: [''],
      date_prelevement: [''],
      banque_sang_id: ['']
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
  // Méthode pour mettre à jour l'état du rendez-vous
  updateEtat() {
    if (this.rendezVousForm.invalid) {
      return;
    }

    const formData = this.rendezVousForm.value;

     // Convertir 'etat' en booléen avant d'envoyer
     formData.etat = formData.etat === 'true' ? true : false;
     
    // Appel du service pour mettre à jour l'état du rendez-vous
    this.rendezVousService.updateEtatAddPoche(this.rendezVousId, formData).subscribe({
      next: (response: any) => {
        alert(response.message);
        this.router.navigate(['/sidebar1/poche-sang']); // Redirection après la mise à jour
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
        }
      }
    });
  }

}

