import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../../Services/Auth/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AnnonceService } from '../../../Services/annonce.service';


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
  photoUrl: string = 'assets/images/profil1.png'; // Image par défaut

  constructor(private fb: FormBuilder, private authService: AuthService, private annonceService: AnnonceService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProfile();
    this.loadDonationInfo();
  }

  // Initialiser le formulaire avec des validations
  initForm() {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)]],
      nom: ['', [Validators.required,  Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ '-]*$/)]],
      prenom: ['', [Validators.required,  Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ '-]*$/)]],
      telephone: ['', [Validators.required, Validators.pattern(/^(77|78|76|75|70)\s?\d{3}\s?\d{2}\s?\d{2}$/)]],
      adresse:['',[Validators.required,  Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ '-]*$/)]],
      sexe: ['', Validators.required],
      date_naiss: ['',[Validators.required, this.ageValidator]],
      photo: [null, this.imageValidator],
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
                this.photoUrl = this.utilisateur.photoUrl || 'assets/images/profil1.png';
            } else {
                console.error('Les informations utilisateur sont manquantes dans la réponse.');
            }
        },
        (error) => {
            console.error('Erreur lors de la récupération des informations utilisateur :', error);
        }
    );
}
  submitProfile() {
    if (this.profileForm.invalid) {
      Swal.fire('Erreur', 'Veuillez vérifier les champs du formulaire.', 'error');
      console.log(this.profileForm.errors); // Ajout d'un log pour vérifier les erreurs du formulaire
      return;
    }
    console.log(this.profileForm.value); // Vérifiez les données ici
    console.log('Initial Profile:', this.initialProfile); // Vérifiez les valeurs initiales

    this.loading = true;
    

    // Créer une instance de FormData
    const formData = new FormData();

  //     // Type définissant les propriétés de l'objet profile
      type ProfileKeys = 'email' | 'nom' | 'prenom' | 'telephone' | 'adresse' | 'sexe' | 'date_naiss' | 'profession' | 'groupe_sanguin';

  //   // Comparez les valeurs actuelles avec les valeurs du formulaire
    const currentProfile: Record<ProfileKeys, any> = {
      email: this.profileForm.get('email')?.value,
      nom: this.profileForm.get('nom')?.value,
      prenom: this.profileForm.get('prenom')?.value,
      telephone: this.profileForm.get('telephone')?.value,
      adresse: this.profileForm.get('adresse')?.value,
      sexe: this.profileForm.get('sexe')?.value === 'M' ? 'M' : 'F',
      date_naiss: this.profileForm.get('date_naiss')?.value,
      profession: this.profileForm.get('profession')?.value,
      groupe_sanguin: this.profileForm.get('groupe_sanguin')?.value,
  };
  console.log('Current Profile Data:', currentProfile)
   // Append each profile field to FormData
   for (const key in currentProfile) {
    if (currentProfile.hasOwnProperty(key)) {
      const profileKey = key as ProfileKeys;
      const value = currentProfile[profileKey];
      if (value) {
        formData.append(profileKey, value);
      }
    }
  }
   // Handle photo file upload
   const photo = this.profileForm.get('photo')?.value;
   if (photo) {
       formData.append('photo', photo, photo.name); // Add the photo file with its name
   }

   // Envoi du formulaire avec le FormData
    this.authService.updateProfile(currentProfile).subscribe(
      (response) => {
        if (response.status) {
          Swal.fire('Succès', 'Profil mis à jour avec succès.', 'success');
           // Rechargez les données du profil après la mise à jour
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
