import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../Services/Auth/auth.service'; 
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; // Import pour typer les erreurs HTTP


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response:  { token: string }) => {
          // Stocker le token JWT ou une autre information de session
          this.authService.storeToken(response.token);
          // Rediriger l'utilisateur après connexion réussie
          this.router.navigate(['/dashboard']); // Par exemple, un tableau de bord après la connexion
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = 'Identifiants invalides. Veuillez réessayer.';
        }
      );
    }
  }
}
