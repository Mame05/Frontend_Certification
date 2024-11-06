import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../../Services/Auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


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

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProfile();
  }

  // Initialiser le formulaire avec des validations
  initForm() {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8)]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/)]],
      adresse:[''],
      sexe: [''],
      date_naiss: [''],
      photo: [null],
      profession: [''],
      groupe_sanguin: ['']
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
  console.log('data', currentProfile)
    // Ajoutez seulement les champs qui ont été modifiés
    Object.keys(this.profileForm.value).forEach(key => {
      const value = this.profileForm.get(key)?.value;
      if (value) {
          formData.append(key, value);
      }
  });


    

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
  // Soumettre le formulaire de mise à jour
  // submitProfile() {
  //   if (this.profileForm.invalid) {
  //     Swal.fire('Erreur', 'Veuillez vérifier les champs du formulaire.', 'error');
  //     console.log(this.profileForm.errors); // Ajout d'un log pour vérifier les erreurs du formulaire
  //     return;
  //   }
  //   console.log(this.profileForm.value); // Vérifiez les données ici
  //   console.log('Initial Profile:', this.initialProfile); // Vérifiez les valeurs initiales

  //   this.loading = true;

  //   // Créer une instance de FormData
  //   const formData = new FormData();

  // //     // Type définissant les propriétés de l'objet profile
  //     type ProfileKeys = 'email' | 'nom' | 'prenom' | 'telephone' | 'adresse' | 'sexe' | 'date_naiss' | 'profession' | 'groupe_sanguin';

  // //   // Comparez les valeurs actuelles avec les valeurs du formulaire
  //   const currentProfile: Record<ProfileKeys, any> = {
  //     email: this.profileForm.get('email')?.value,
  //     nom: this.profileForm.get('nom')?.value,
  //     prenom: this.profileForm.get('prenom')?.value,
  //     telephone: this.profileForm.get('telephone')?.value,
  //     adresse: this.profileForm.get('adresse')?.value,
  //     sexe: this.profileForm.get('sexe')?.value === 'M' ? 'M' : 'F',
  //     date_naiss: this.profileForm.get('date_naiss')?.value,
  //     profession: this.profileForm.get('profession')?.value,
  //     groupe_sanguin: this.profileForm.get('groupe_sanguin')?.value,
  // };
  //   // Ajoutez seulement les champs qui ont été modifiés
  //   Object.keys(this.profileForm.value).forEach(key => {
  //     const value = this.profileForm.get(key)?.value;
  //     if (value) {
  //         formData.append(key, value);
  //     }
  // });


  //   // const photoControl = this.profileForm.get('photo');
  //   // if (photoControl?.value) {
  //   //   formData.append('photo', photoControl.value);
  //   // }

  //   this.authService.updateProfile(formData).subscribe(
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
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({
        photo: file
      });
    }
  }

}
