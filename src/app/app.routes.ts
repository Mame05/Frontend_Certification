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
import { MesInscriptionsComponent } from './components/UsersSimple/mes-inscriptions/mes-inscriptions.component';
import { ModifierProfileComponent } from './components/UsersSimple/modifier-profile/modifier-profile.component';
import { ListBanqueSangComponent } from './components/Structure/list-banque-sang/list-banque-sang.component';
import { DetailBanqueSangComponent } from './components/Structure/detail-banque-sang/detail-banque-sang.component';
import { BanqueSangFormComponent } from './components/Structure/banque-sang-form/banque-sang-form.component';
import { PocheSangFormComponent } from './components/Structure/poche-sang-form/poche-sang-form.component';
import { ListPocheSangComponent } from './components/Structure/list-poche-sang/list-poche-sang.component';
import { DetailPocheSangComponent } from './components/Structure/detail-poche-sang/detail-poche-sang.component';
import { UpdateRendezVousComponent } from './components/Structure/update-rendez-vous/update-rendez-vous.component';
import { UpdatePocheRendezVousComponent } from './components/Structure/update-poche-rendez-vous/update-poche-rendez-vous.component';
import { GraphiqueSexeComponent } from './components/Structure/graphique-sexe/graphique-sexe.component';


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
    { path: 'banque-sang', component: ListBanqueSangComponent},
    { path: 'banque-sang/ajouter', component: BanqueSangFormComponent},
    { path: 'banque-sang/detail-banque-sang/:id', component: DetailBanqueSangComponent},
    { path: 'banque-sang/modifier/:id', component: BanqueSangFormComponent},
    { path: 'poche-sang', component: ListPocheSangComponent},
    { path: 'poche-sang/ajouter', component: PocheSangFormComponent},  // POUR LES DONEUR EXTERNE
    { path: 'poche-sang/detail-poche-sang/:id', component: DetailPocheSangComponent},
    { path: 'poche-sang/modifier-poche-sang-DE/:id', component: PocheSangFormComponent},
    { path: 'update-etat/:id', component: UpdateRendezVousComponent }, // Route pour changer l'état du rendez-vous et ajouter la poche.
    { path: 'poche-sang/modifier-poche-sang-US/:id', component: UpdatePocheRendezVousComponent},
    { path: 'statistique', component: StatistiqueComponent },
    { path: 'graphSexe', component: GraphiqueSexeComponent}
  ]
},

//  Routes pour les utilisateurs siimples

    { path: 'accueil', component: AccueilComponent  },
    { path: 'annonces', component:AnnoncesComponent},
    { path: 'detail-annonce-user/:id', component: DetailAnnonceUserComponent},
    { path: 'mes-dons', component:MesInscriptionsComponent},
    { path: 'profil', component:ModifierProfileComponent}
    
    // Ajouter les autres routes pour les utilisateurs si simples ici

];


