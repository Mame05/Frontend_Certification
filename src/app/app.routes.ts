import { Routes } from '@angular/router';
import { AppComponent } from './app.component'; // Assure-toi que cette ligne importe correctement le composant AppComponent

const routes: Routes = [
  { path: '', component: AppComponent }
];

export { routes };  // Assure-toi que les routes sont bien exportées
