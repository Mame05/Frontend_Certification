import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { StepOneComponent } from '../step-one/step-one.component';  // Chemin correct vers StepOneComponent
import { StepTwoComponent } from '../step-two/step-two.component';  // Chemin correct vers StepTwoComponent

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, StepOneComponent, StepTwoComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  step: number = 1;
  registrationForm!: FormGroup;

  goToNextStep(form: FormGroup) {
    this.registrationForm = form;
    this.step = 2;
  }

  goToPreviousStep() {
    this.step = 1;
  }

  submitForm(form: FormGroup) {
    console.log(form.value);  // Vous pouvez gérer ici l'envoi du formulaire
  }
}
