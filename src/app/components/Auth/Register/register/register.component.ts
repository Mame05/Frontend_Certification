import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from '../step-one/step-one.component';  // Chemin correct vers StepOneComponent
import { StepTwoComponent } from '../step-two/step-two.component';  // Chemin correct vers StepTwoComponent

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, StepOneComponent, StepTwoComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  step: number = 1;
  registrationForm!: FormGroup;

  goToNextStep(form: FormGroup) {
    console.log('Passage à l\'étape suivante avec le formulaire:', form.value);
    this.registrationForm = form; // Mettre à jour le formulaire parent
    this.step = 2; // Passer à l'étape suivante
  }

  goToPreviousStep() {
    this.step = 1; // Retourner à l'étape précédente
  }

  submitForm(form: FormGroup) {
    console.log('Formulaire final soumis:', form.value); // Gérer l'envoi du formulaire final
  }
}
