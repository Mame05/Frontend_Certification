import {  Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/Login/login/login.component'; // Assure-toi que LoginComponent est correctement importé
import { RegisterComponent } from './components/Auth/Register/register/register.component'; // Assure-toi que RegisterComponent est correctement importé
/*import { AuthGuard } from './guards/auth.guard';*/
import { PortailComponent } from './components/portail/portail.component';
import { SidebareComponent } from './components/Admin/sidebare/sidebare.component';
import { DashboardComponent } from './components/Admin/dashboard/dashboard.component';
import { StructureComponent } from './components/Admin/structure/structure.component';
import { AjoutStructureComponent } from './components/Admin/ajout-structure/ajout-structure.component';
import { ModifierStructureComponent } from './components/Admin/modifier-structure/modifier-structure.component';
import { DonneurStructureComponent } from './components/Admin/donneur-structure/donneur-structure.component';
import { Sidebare1Component } from './components/Structure/sidebare1/sidebare1.component';
import { Dashboard1Component } from './components/Structure/dashboard1/dashboard1.component';
import { AnnonceComponent } from './components/Structure/annonce/annonce.component';
import { AjoutAnnonceComponent } from './components/Structure/ajout-annonce/ajout-annonce.component';
import { DetailAnnonceComponent } from './components/Structure/detail-annonce/detail-annonce.component';
import { ModifierAnnonceComponent } from './components/Structure/modifier-annonce/modifier-annonce.component';
import { DonneurComponent } from './components/Structure/donneur/donneur.component';
import { StatistiqueComponent } from './components/Structure/statistique/statistique.component';
import { HeaderComponent } from './components/UsersSimple/header/header.component';
import { AccueilComponent } from './components/UsersSimple/accueil/accueil.component';
import { AnnoncesComponent } from './components/UsersSimple/annonces/annonces.component';
import { NotificationAnnonceComponent } from './components/UsersSimple/notification-annonce/notification-annonce.component';
import { DetailAnnonceUserComponent } from './components/UsersSimple/detail-annonce-user/detail-annonce-user.component';


export const routes: Routes = [
//Toute par defaut
  { path: '', pathMatch: 'full', redirectTo: 'portail' },

  // Authentification
  { path: '', component: PortailComponent },
  { path: 'login', component: LoginComponent }, // Page de connexion
  { path: 'register', component: RegisterComponent }, // Page d'inscription
  


 //  Routes Admin
 {
  path: 'sidebar',
  component: SidebareComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'structure', component: StructureComponent },
    { path: 'structure/ajouter', component: AjoutStructureComponent },
    { path: 'structure/modifier/:id', component: ModifierStructureComponent },
    { path: 'structure/donneur/:id', component: DonneurStructureComponent }
  ]
},

//  Routes Structures
{
  path: 'sidebar1',
  component: Sidebare1Component,
  children: [
    { path: 'dashboard1', component: Dashboard1Component },
    { path: 'annonce', component: AnnonceComponent },
    { path: 'annonce/ajouter', component: AjoutAnnonceComponent },
    { path: 'annonce/detail-annonce/:id', component: DetailAnnonceComponent },
    { path: 'annonce/modifier/:id', component: ModifierAnnonceComponent },
    { path: 'donneur', component: DonneurComponent },
    { path: 'statistique', component: StatistiqueComponent }
  ]
},

//  Routes pour les utilisateurs siimples

    { path: 'accueil', component: AccueilComponent  },
    { path: 'annonces', component:AnnoncesComponent},
    { path: 'detail-annonce-user/:id', component: DetailAnnonceUserComponent}
    
    // Ajouter les autres routes pour les utilisateurs si simples ici

];


