import { Component } from '@angular/core';
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
  

  // Méthode pour définir la section active
  setActiveSection(section: string) {
    this.currentSection = section;
  }

}
