import {  Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/Login/login/login.component'; // Assure-toi que LoginComponent est correctement importé
import { RegisterComponent } from './components/Auth/Register/register/register.component'; // Assure-toi que RegisterComponent est correctement importé
import { AuthGuard } from './guards/auth.guard';
import { PortailComponent } from './components/portail/portail.component';
import { SidebareComponent } from './components/Admin/sidebare/sidebare.component';
import { DashboardComponent } from './components/Admin/dashboard/dashboard.component';
import { StructureComponent } from './components/Admin/structure/structure.component';

// Authentification
export const routes: Routes = [

  { path: '', component: PortailComponent },
  { path: 'login', component: LoginComponent }, // Page de connexion
  { path: 'register', component: RegisterComponent }, // Page d'inscription
  { path: '', pathMatch: 'full', redirectTo: 'portail' },


 //  Routes Admin
 {
  path: 'sidebar',
  component: SidebareComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'structure', component: StructureComponent }
   /* { path: 'projet/ajouter', component: AjoutProjetComponent },
    { path: 'projet/detail/projet/:id', component: DetailProjetComponent },
    { path: 'projet/modifier/:id', component: ModificationProjetComponent },
    { path: 'habitant', component: HabitantComponent },
    { path: 'habitant/detail/habitant/:id', component: DetailHabitantComponent },
    { path: 'habitant/detail/projet/:id', component: DetailProjetHabitantComponent },
    {path: 'parametre', component: ParametreComponent},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }*/
  ]
},

];


