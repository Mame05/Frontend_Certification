import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-portail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './portail.component.html',
  styleUrl: './portail.component.css'
})
export class PortailComponent {
  currentSection: string = '';
  menuOpen: boolean = false; // État du menu burger
  scrolled: boolean = false; // État pour la classe `scrolled`
  

  // Méthode pour définir la section active
  setActiveSection(section: string) {
    this.currentSection = section;
  }
   // Basculer l'ouverture du menu
   toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
   // Fermer le menu burger et naviguer vers une section
   navigateToSection(section: string): void {
    this.currentSection = section;
    this.menuOpen = false; // Fermer le menu burger
  }
  // Ajout de la classe `scrolled` au header lors du défilement
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrolled = window.scrollY > 50; // Ajouter `scrolled` si le scroll dépasse 50px
  }

}
