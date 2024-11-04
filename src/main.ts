import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { NgChartsModule } from 'ng2-charts';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  // Vérifiez si vous êtes en mode production

// Démarrez l'application en lui fournissant les modules nécessaires
bootstrapApplication(AppComponent, {
  providers: [
    // Ajoutez HttpClientModule ici pour pouvoir utiliser HttpClient dans vos services
    //{ provide: HttpClientModule, useValue: HttpClientModule },
    importProvidersFrom(HttpClientModule), // Ajoutez HttpClientModule ici
    importProvidersFrom(RouterModule.forRoot(routes)), // Configurez le routage
    importProvidersFrom(NgChartsModule) // Ajout de NgChartsModule aux providers
  ],
  
});
