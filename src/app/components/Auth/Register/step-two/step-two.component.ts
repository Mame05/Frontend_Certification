import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css'
})
export class StepTwoComponent {
  @Input() parentForm!: FormGroup;
  @Output() previousStep = new EventEmitter();
  @Output() submitForm = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.parentForm.addControl('profession', this.fb.control('', Validators.required));
    this.parentForm.addControl('groupe_sanguin', this.fb.control('', Validators.required));
    this.parentForm.addControl('photo', this.fb.control(''));
    this.parentForm.addControl('email', this.fb.control('', [Validators.required, Validators.email]));
    this.parentForm.addControl('password', this.fb.control('', Validators.required));
  }

  onSubmit() {
    if (this.parentForm.valid) {
      this.submitForm.emit(this.parentForm);
    }
  }

}
