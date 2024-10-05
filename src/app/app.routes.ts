import {  Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/Login/login/login.component'; // Assure-toi que LoginComponent est correctement importé
import { RegisterComponent } from './components/Auth/Register/register/register.component'; // Assure-toi que RegisterComponent est correctement importé
import { AuthGuard } from './guards/auth.guard';
import { PortailComponent } from './components/portail/portail.component';
const routes: Routes = [

  { path: '', component: PortailComponent },
  { path: 'login', component: LoginComponent }, // Page de connexion
  { path: 'register', component: RegisterComponent }, // Page d'inscription
  { path: '', pathMatch: 'full', redirectTo: 'portail' },
];

export { routes };  // Assure-toi que les routes sont bien exportées
