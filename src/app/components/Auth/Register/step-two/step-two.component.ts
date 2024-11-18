import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      profession: ['',[Validators.required, Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ '-]*$/)]],
      groupe_sanguin: ['', Validators.required],
      photo: [null, this.imageValidator],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)]],
    });
  }

  onPrevious() {
    this.previousStep.emit();  // Retour à l'étape précédente
  }

  onPhotoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const isValidType = allowedTypes.includes(file.type);
      this.parentForm.patchValue({
        photo: file
      });
      const photoControl = this.parentForm.get('photo');
      if (photoControl) {
        photoControl.setErrors(isValidType ? null : { invalidImage: true });
      }
    }
  }
  imageValidator(control: FormControl) {
    const file = control.value;
    if (file && file instanceof File) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      return allowedTypes.includes(file.type) ? null : { invalidImage: true };
    }
    return null;
  }

  onSubmit() {
    if (this.parentForm.valid) {
      this.submitForm.emit(this.parentForm);  // Émettre le formulaire valide
    } else {
      console.log('Formulaire invalide dans Step Two');
      console.log('Statut profession :', this.parentForm.get('profession')?.status);
      console.log('Erreurs profession :', this.parentForm.get('profession')?.errors);
    }
  }
}
