import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.css'
})
export class StepOneComponent {
  @Output() nextStep = new EventEmitter<FormGroup>();
  stepOneForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.stepOneForm = this.fb.group({
      nom: ['', [Validators.required,  Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ '-]*$/)]],
      prenom: ['', [Validators.required,  Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ '-]*$/)]],
      sexe:['', Validators.required],
      date_naiss: ['',[Validators.required, this.ageValidator]],
      adresse: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ0-9 ,.'-]+$/)]],
      telephone: ['', [Validators.required, Validators.pattern(/^(77|78|76|75|70)\s?\d{3}\s?\d{2}\s?\d{2}$/)]],
    });
  }

  onSubmit() {
    if (this.stepOneForm.valid) {
      console.log('Formulaire valide, émettant nextStep', this.stepOneForm.value);
      this.nextStep.emit(this.stepOneForm);
    } else {
      console.log('Formulaire invalide');
    }
}

 // Validators
private ageValidator(control: AbstractControl): ValidationErrors | null {
  const dateOfBirth = new Date(control.value);
  const age = new Date().getFullYear() - dateOfBirth.getFullYear();
  return age >= 18 && age <= 50 ? null : { ageNotAllowed: true };
}
}
