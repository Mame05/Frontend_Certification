import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.css'
})
export class StepOneComponent {
  stepOneForm: FormGroup;

  @Output() nextStep = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {
    this.stepOneForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      date_naissance: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.stepOneForm.valid) {
      this.nextStep.emit(this.stepOneForm);
    }
  }

}
