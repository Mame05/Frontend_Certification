import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../../Services/Auth/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AnnonceService } from '../../../Services/annonce.service';
import { RendezVousService } from '../../../Services/rendez-vous.service';


@Component({
  selector: 'app-modifier-profile',
  standalone: true,
  imports: [CommonModule,RouterLink,HeaderComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './modifier-profile.component.html',
  styleUrl: './modifier-profile.component.css'
})
export class ModifierProfileComponent implements OnInit {
  profileForm!: FormGroup;
  loading = false;
  initialProfile: any;
  utilisateur: any = {}; // Déclarer l'objet utilisateur
  nombreDeDons :number | null = null;
  groupeSanguin: string | null = null;
  photoProfile: string = 'assets/images/profil1.jpg'; // Image par défaut
  badgeCode: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private annonceService: AnnonceService, private rendezVousService: RendezVousService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProfile();
    this.loadDonationInfo();
    this.loadGamificationInfo();
  }

  // Initialiser le formulaire avec des validations
  initForm() {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)]],
      nom: ['', [Validators.required,  Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ '-]*$/)]],
      prenom: ['', [Validators.required,  Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ '-]*$/)]],
      telephone: ['', [Validators.required, Validators.pattern(/^(77|78|76|75|70)\s?\d{3}\s?\d{2}\s?\d{2}$/)]],
      adresse:['',[Validators.required,  Validators.pattern(/^[A-Za-zÀ-ÿ0-9 ,.'-]+$/)]],
      sexe: ['', Validators.required],
      date_naiss: ['',[Validators.required, this.ageValidator]],
      photo: ['', this.imageValidator],
      profession: ['',[Validators.required,  Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ '-]*$/)]],
      groupe_sanguin: ['', Validators.required]
    });
  }
  

  // Charger les informations du profil utilisateur
  loadProfile() {
    this.authService.getProfile().subscribe(
      (response: any) => {
        const data = response.data;
        this.initialProfile = {
            email: data.email,
            nom: data.nom,
            prenom: data.prenom,
            telephone: data.telephone,
            adresse: data.adresse,
            sexe: data.sexe, 
            date_naiss: data.date_naiss,
            profession: data.profession,
            groupe_sanguin: data.groupe_sanguin,
        };
        this.profileForm.patchValue(this.initialProfile);
      },
      (error) => {
        Swal.fire('Erreur', 'Impossible de charger le profil.', 'error');
      }
    );
  }
  // Charger les informations des dons et du groupe sanguin
  loadDonationInfo() {
    this.annonceService.getUtilisateursWithCompletedInscriptions().subscribe(
        (response: any) => {
            if (response.status && response.utilisateur) {
                this.utilisateur = response.utilisateur;
                this.groupeSanguin = this.utilisateur.groupe_sanguin || 'Non spécifié';
                this.nombreDeDons = this.utilisateur.nombre_de_dons ?? 'Non spécifié';
                this.photoProfile = this.utilisateur.photo ? `http://127.0.0.1:8000/storage/${this.utilisateur.photo}` : 'assets/images/profil1.jpg';
            } else {
                console.error('Les informations utilisateur sont manquantes dans la réponse.');
            }
        },
        (error) => {
            console.error('Erreur lors de la récupération des informations utilisateur :', error);
        }
    );
}
// Récupérer les informations de gamification
loadGamificationInfo(){
  this.rendezVousService.showGamification().subscribe(
    (response: any) => {
        if (response && response.badge_code) {
          this.badgeCode = response.badge_code;
          console.log('Badge Code:', this.badgeCode); // Vérifier la valeur de badgeCode
        } else {
            console.error('Les informations de gamification sont manquantes dans la réponse.');
        }
    },
    (error) => {
        console.error('Erreur lors de la récupération des informations de gamification :', error);
    }
  )
}
  submitProfile() {
    if (this.profileForm.invalid) {
      Swal.fire('Erreur', 'Veuillez vérifier les champs du formulaire.', 'error');
      return;
  }

  this.loading = true;

  const photo = this.profileForm.get('photo')?.value;
  const isPhotoFile = photo instanceof File;

  // Utiliser FormData si une photo est présente
  const formData = new FormData();
  formData.append('email', this.profileForm.get('email')?.value);
  formData.append('nom', this.profileForm.get('nom')?.value);
  formData.append('prenom', this.profileForm.get('prenom')?.value);
  formData.append('telephone', this.profileForm.get('telephone')?.value);
  formData.append('adresse', this.profileForm.get('adresse')?.value);
  formData.append('sexe', this.profileForm.get('sexe')?.value);
  formData.append('date_naiss', this.profileForm.get('date_naiss')?.value);
  formData.append('profession', this.profileForm.get('profession')?.value);
  formData.append('groupe_sanguin', this.profileForm.get('groupe_sanguin')?.value);

  if (isPhotoFile) {
      formData.append('photo', photo, photo.name);
  }

  console.log('Données envoyées:', formData);

  this.authService.updateProfile(formData).subscribe(
      (response) => {
          if (response.status) {
              Swal.fire('Succès', 'Profil mis à jour avec succès.', 'success');
              this.loadProfile();
          } else {
              Swal.fire('Erreur', response.message, 'error');
          }
          this.loading = false;
      },
      (error) => {
          console.log(error);
          Swal.fire('Erreur', 'Erreur lors de la mise à jour du profil.', 'error');
          this.loading = false;
      }
  );
}


  //  // Envoi du formulaire avec le FormData
  //   this.authService.updateProfile(formData, true).subscribe(
  //     (response) => {
  //       if (response.status) {
  //         Swal.fire('Succès', 'Profil mis à jour avec succès.', 'success');
  //          // Rechargez les données du profil après la mise à jour
  //          this.loadProfile();
  //       } else {
  //         Swal.fire('Erreur', response.message, 'error');
  //       }
  //       this.loading = false;
  //     },
  //     (error) => {
  //       console.log(error);
  //       Swal.fire('Erreur', 'Erreur lors de la mise à jour du profil.', 'error');
  //       this.loading = false;
  //     }
  //   );
  // }

  // Gestion du changement de fichier photo
  onPhotoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const isValidType = allowedTypes.includes(file.type);
      this.profileForm.patchValue({
        photo: file
      });
      const photoControl = this.profileForm.get('photo');
      if (photoControl) {
        photoControl.setErrors(isValidType ? null : { invalidImage: true });
      }
    }
  }
  private ageValidator(control: AbstractControl): ValidationErrors | null {
    const dateOfBirth = new Date(control.value);
    const age = new Date().getFullYear() - dateOfBirth.getFullYear();
    return age >= 18 && age <= 50 ? null : { ageNotAllowed: true };
  }
  imageValidator(control: FormControl) {
    const file = control.value;
    if (file && file instanceof File) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      return allowedTypes.includes(file.type) ? null : { invalidImage: true };
    }
    return null;
  }

}
