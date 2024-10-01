import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/Portail/header/header.component';  // Importer le composant autonome
import { AccueilComponent } from './components/Portail/accueil/accueil.component';
import { AboutComponent } from './components/Portail/about/about.component';
import { HowItWorksComponent } from './components/Portail/how-it-works/how-it-works.component';
import { StatisticsComponent } from './components/Portail/statistics/statistics.component';
import { FooterComponent } from './components/Portail/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AccueilComponent, AboutComponent, HowItWorksComponent, StatisticsComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend_certification';
}
