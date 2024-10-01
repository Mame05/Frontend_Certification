import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AppComponent } // La page d'accueil, qui contient toutes les sections
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    scrollPositionRestoration: 'enabled',  // Restaure la position de défilement
    anchorScrolling: 'enabled',  // Active le scrolling par ancres
    scrollOffset: [0, 64]  // Décalage pour compenser la hauteur de la barre de navigation
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

