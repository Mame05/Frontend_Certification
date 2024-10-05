import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent {
  @Input() parentForm!: FormGroup;  // Formulaire parent
  @Output() previousStep = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<FormGroup>(); // Changer le type à FormGroup

  constructor(private fb: FormBuilder) {
    this.parentForm = this.fb.group({
      profession: ['', Validators.required],
      groupe_sanguin: ['', Validators.required],
      photo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      telephone: ['', Validators.required],
    });
  }

  onPrevious() {
    this.previousStep.emit();  // Retour à l'étape précédente
  }

  onPhotoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.parentForm.patchValue({
        photo: file
      });
    }
  }

  onSubmit() {
    if (this.parentForm.valid) {
      this.submitForm.emit(this.parentForm);  // Émettre le formulaire valide
    } else {
      console.log('Formulaire invalide dans Step Two');
    }
  }
}
