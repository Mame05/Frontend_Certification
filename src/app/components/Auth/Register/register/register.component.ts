import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from '../step-one/step-one.component';  // Chemin correct vers StepOneComponent
import { StepTwoComponent } from '../step-two/step-two.component';  // Chemin correct vers StepTwoComponent
import { Router } from '@angular/router'; // Importer Router
import { AuthService } from '../../../../Services/Auth/auth.service'; 


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, StepOneComponent, StepTwoComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  step: number = 1;
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      nom: [''],
      prenom: [''],
      sexe: [''],
      date_naiss: [''],
      adresse: [''],
      telephone: [''],
      profession: [''],
      groupe_sanguin: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      photo: [null],
    });
  } // Injecter Router dans le constructeur

  goToNextStep(stepOneForm: FormGroup) {
    this.registrationForm.patchValue(stepOneForm.value);
    this.step = 2; // Passer à l'étape suivante
  }

  goToPreviousStep() {
    this.step = 1; // Retourner à l'étape précédente
  }

  submitForm(stepTwoForm: FormGroup) {
    this.registrationForm.patchValue(stepTwoForm.value);
    const formData = new FormData();
    Object.keys(this.registrationForm.controls).forEach(key => {
    const controlValue = this.registrationForm.get(key)?.value;
    // Si la clé est 'photo' et qu'il n'y a pas de fichier, ne pas ajouter le champ au FormData
    if (key === 'photo' && controlValue === null) {
      return;
    }
    formData.append(key, controlValue);
  });
    console.log('Formulaire final soumis:',  this.registrationForm.value); // Gérer l'envoi du formulaire final
     // Appel à votre service d'inscription
     this.authService.register(formData).subscribe({
      next: (response) => {
        console.log('Inscription réussie:', response);
        this.router.navigate(['/login']); // Rediriger vers la page de connexion
      },
      error: (err) => {
        console.error('Erreur complète:', err); // Afficher toute l'erreur retournée
        if (err.status === 422) {
          console.error('Erreurs de validation:', err.error.errors);
        } else {
          console.error('Erreur inattendue:', err);
        }
      }
    });         
}
}
