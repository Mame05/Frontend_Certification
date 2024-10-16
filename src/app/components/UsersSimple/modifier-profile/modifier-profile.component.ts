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
      adresse: [''],
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
        this.profileForm.patchValue({
          email: data.email,
          nom: data.nom,
          prenom: data.prenom,
          telephone: data.telephone,
          adresse: data.adresse,
          sexe: data.sexe,
          date_naiss: data.date_naiss,
          profession: data.profession,
          groupe_sanguin: data.groupe_sanguin
        });
      },
      (error) => {
        Swal.fire('Erreur', 'Impossible de charger le profil.', 'error');
      }
    );
  }

  // Soumettre le formulaire de mise à jour
  submitProfile() {
    if (this.profileForm.invalid) {
      Swal.fire('Erreur', 'Veuillez vérifier les champs du formulaire.', 'error');
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('email', this.profileForm.get('email')?.value);
    formData.append('password', this.profileForm.get('password')?.value || '');
    formData.append('nom', this.profileForm.get('nom')?.value);
    formData.append('prenom', this.profileForm.get('prenom')?.value);
    formData.append('telephone', this.profileForm.get('telephone')?.value);
    formData.append('adresse', this.profileForm.get('adresse')?.value);
    formData.append('sexe', this.profileForm.get('sexe')?.value);
    formData.append('date_naiss', this.profileForm.get('date_naiss')?.value);
    formData.append('profession', this.profileForm.get('profession')?.value);
    formData.append('groupe_sanguin', this.profileForm.get('groupe_sanguin')?.value);

    const photoControl = this.profileForm.get('photo');
    if (photoControl?.value) {
      formData.append('photo', photoControl.value);
    }

    this.authService.updateProfile(formData).subscribe(
      (response) => {
        Swal.fire('Succès', 'Profil mis à jour avec succès.', 'success')
        this.loading = false;
      },
      (error) => {
        Swal.fire('Erreur', 'Erreur lors de la mise à jour du profil.', 'error');
        this.loading = false;
      }
    );
  }

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
