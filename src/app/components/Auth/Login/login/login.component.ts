import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../Services/Auth/auth.service'; 
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; // Import pour typer les erreurs HTTP


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
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
      console.log('Form Value:', this.loginForm.value); // Ajoute cette ligne
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          // Stocker le token JWT ou une autre information de session
          this.authService.storeToken(response.access_token);
          localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('user', JSON.stringify(response.user));
          // Rediriger en fonction du role_id
        const roleId = response.role_id;
        if (roleId === 1) {
          this.router.navigate(['/sidebar/dashboard']);
        } else if (roleId === 2) {
          this.router.navigate(['/sidebar1/dashboard1']);
        } else if (roleId === 3) {
          this.router.navigate(['/accueil']);
        }  
         else {
          this.router.navigate(['/default']);
        }
         
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = 'Identifiants invalides. Veuillez réessayer.';
        }
      );
    }
  }
}
