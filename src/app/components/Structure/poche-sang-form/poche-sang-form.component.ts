import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PocheSangService } from '../../../Services/poche-sang.service';
import { BanqueSangService } from '../../../Services/banque-sang.service';
import { CommonModule } from '@angular/common';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { DonneurExterneService } from '../../../Services/donneur-externe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-poche-sang-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './poche-sang-form.component.html',
  styleUrl: './poche-sang-form.component.css'
})
export class PocheSangFormComponent implements OnInit{
  pocheSangForm: FormGroup;
  banquesSang: any[] = [];
  donneursExternes: any[] = []; // Remplacez any par votre type de données approprié
  rendezVousList!: number // Remplacez any par votre type de données approprié
  isEditMode: boolean = false;
  donneurExterneId!: number;
  pocheId!: number;
  

  constructor(
    private fb: FormBuilder,
    private pocheSangService: PocheSangService,
    private banqueSangService: BanqueSangService,
    private donneurExterneService: DonneurExterneService,
    private rendezVousService: RendezVousService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pocheSangForm = this.fb.group({
      groupe_sanguin: ['', Validators.required],
      date_prelevement: ['', [Validators.required, this.datePrelevementValidator]],
      banque_sang_id: ['', Validators.required],
      nom: ['', [Validators.required,  Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ '-]*$/)]],
      prenom: ['', [Validators.required,  Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ '-]*$/)]],
      sexe: ['', Validators.required],
      date_naiss: ['', [Validators.required, this.ageValidator]],
      adresse: ['', [Validators.required, Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ0-9 ,.'-]*$/)]],
      telephone: ['', [Validators.required, Validators.pattern(/^(77|78|76|75|70)\s?\d{3}\s?\d{2}\s?\d{2}$/)]],
      profession: ['',[Validators.required, Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ0-9 ,.'-]*$/)]],
      rendez_vouse_id: [''],
      donneur_externe_id: [''] // Champ caché pour stocker l'ID du donneur externe  
    });
  }
  // Validators
  private datePrelevementValidator(control: AbstractControl): ValidationErrors | null {
    const datePrelevement = new Date(control.value);
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    if (datePrelevement > today) {
      return { futureDateNotAllowed: true };
    } else if (datePrelevement < sixMonthsAgo) {
      return { dateTooOld: true };
    }
    return null;
  }
  
private ageValidator(control: AbstractControl): ValidationErrors | null {
  const dateOfBirth = new Date(control.value);
  const age = new Date().getFullYear() - dateOfBirth.getFullYear();
  return age >= 18 && age <= 50 ? null : { ageNotAllowed: true };
}

  ngOnInit() {
    this.loadBanquesSang();
    this.loadDonneursExternes();
    //this.loadRendezVous();

    // Vérifier si nous sommes en mode édition
    this.pocheId = this.route.snapshot.params['id'];
    if (this.pocheId) {
      this.isEditMode = true;
      this.loadPocheSang(this.pocheId);
    }
  }

  loadBanquesSang() {
    // Appel au service pour récupérer les banques de sang associées à l'utilisateur
    this.banqueSangService.getBanques().subscribe((data) => {
      this.banquesSang = data;
    });
  }
  loadDonneursExternes() {
    // Appelez votre service pour récupérer les donneurs externes
    this.donneurExterneService.getDonneurExternes().subscribe((data) => {
      this.donneursExternes = data; // Assurez-vous que les données sont au bon format
    });
  }

  loadPocheSang(id: number) {
    this.pocheSangService.getPocheById(id).subscribe((data: any) => {
    /*if (data.donneur_externe_id) { // Vérifiez si donneur_externe_id est bien présent
      this.donneurExterneId = data.donneur_externe_id;*/
      this.pocheSangForm.patchValue({
        nom: data.donneur_externe.nom,
        prenom: data.donneur_externe.prenom,
        telephone: data.donneur_externe.telephone,
        adresse: data.donneur_externe.adresse,
        sexe: data.donneur_externe.sexe === 'M' ? 'M' : 'F',
        date_naiss: data.donneur_externe.date_naiss,
        profession: data.donneur_externe.profession,
        groupe_sanguin: data.groupe_sanguin,
        date_prelevement: data.date_prelevement,
        banque_sang_id: data.banque_sang_id,
        rendez_vouse_id: data.rendez_vouse_id,
        donneur_externe_id: data.donneur_externe_id // Remplir le champ avec la valeur du backend
      });
    /*} else {
      console.error("Erreur : donneur_externe_id n'est pas présent dans la réponse du backend.");
    }*/
  });
}
  onSubmit() {
    if (this.pocheSangForm.valid) {
      const formValue = this.pocheSangForm.value;
        console.log('Form Value:', formValue); // Ajoutez ce log pour déboguer
        if (this.isEditMode) {
          this.pocheSangService.updatePoche(this.pocheId, formValue).subscribe({
            next: () => {
              Swal.fire({
                title: 'Succès!',
                text: 'La poche de sang a été mise à jour avec succès.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000 // L'alerte disparaît après 2 secondes
              })
                // Rediriger vers la liste des annonces après la disparition de l'alerte
                 setTimeout(() => {
                this.router.navigate(['/sidebar1/poche-sang']);
              }, 2000);
            },
            error: (error) => {
              this.handleError(error);
            }
          });
        } else {
          this.pocheSangService.createPoche(formValue).subscribe({
            next: () => {
              Swal.fire({
                title: 'Succès!',
                text: 'La poche de sang a été ajoutée avec succès.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000 // L'alerte disparaît après 2 secondes
              })
                // Rediriger vers la liste des poches de sang après la disparition de l'alerte
                setTimeout(() => {
                this.router.navigate(['/sidebar1/poche-sang']);
              }, 2000);
            },
            error: (error) => {
              this.handleError(error);
            }
          });
        }
      }
  }
  private handleError(error: any) {
    if (error.status === 422 && error.error?.errors) {
      const errorMessages = Object.values(error.error.errors).flat().join('<br>');
      Swal.fire({
        title: 'Erreur de validation',
        html: errorMessages,
        icon: 'error',
        showConfirmButton: false,
        timer: 3000 // L'alerte disparaît après 3 secondes
      });
    } else {
      Swal.fire({
        title: 'Erreur!',
        text: 'Une erreur est survenue lors de l\'opération.',
        icon: 'error',
        showConfirmButton: false,
        timer: 3000 // L'alerte disparaît après 3 secondes
      });
    }
  }
}