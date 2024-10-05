import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';


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
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      date_naiss: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
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
}
