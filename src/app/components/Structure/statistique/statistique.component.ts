import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'; // Importer Chart.js
import { StatistiqueService } from '../../../Services/statistique.service';
import { Poche } from '../../../Services/poche'; // Importer l'interface Poche


Chart.register(...registerables); // Enregistrer les éléments de Chart.js

@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [],
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css'],
})


export class StatistiqueComponent implements OnInit {
  public chart: any; // Déclaration de la variable pour le diagramme

  constructor(private statistiqueService: StatistiqueService) {} // Injection du service

  ngOnInit(): void {
    this.getPochesData();
  }

  getPochesData() {
    this.statistiqueService.getPochesSanguinsParMois().subscribe(
      (data: Poche[]) => {
        console.log(data); // Vérifiez le format des données ici
        this.createChart(data); // Passer les données au créateur de graphique
      },
      error => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }
  
  createChart(data: any[]) {
    const mois = data.map(item => item.mois); // Extraire les mois
    const nombres = data.map(item => item.nombre_poches); // Extraire le nombre de poches
  
    // Définir une couleur spécifique pour chaque mois
    const couleurs = [
      'rgba(255, 99, 132, 0.2)',  // Couleur pour Janvier
      'rgba(54, 162, 235, 0.2)',  // Couleur pour Février
      'rgba(255, 206, 86, 0.2)',  // Couleur pour Mars
      'rgba(75, 192, 192, 0.2)',  // Couleur pour Avril
      'rgba(153, 102, 255, 0.2)', // Couleur pour Mai
      'rgba(255, 159, 64, 0.2)',  // Couleur pour Juin
      'rgba(99, 132, 255, 0.2)',  // Couleur pour Juillet
      'rgba(235, 54, 162, 0.2)',  // Couleur pour Août
      'rgba(86, 206, 255, 0.2)',  // Couleur pour Septembre
      'rgba(192, 75, 192, 0.2)',  // Couleur pour Octobre
      'rgba(102, 153, 255, 0.2)', // Couleur pour Novembre
      'rgba(64, 159, 255, 0.2)'   // Couleur pour Décembre
    ];
  
    this.chart = new Chart('myChart', {
      type: 'bar', // Type de graphique
      data: {
        labels: mois, // Labels des mois
        datasets: [{
          label: `Nombre de poches (${mois.join(', ')})`,
          data: nombres, // Données des nombres de poches
          backgroundColor: couleurs.slice(0, data.length), // Appliquer les couleurs en fonction du nombre de données
          borderColor: couleurs.slice(0, data.length).map(c => c.replace('0.2', '1')), // Couleur de bordure correspondante
          borderWidth: 1 // Épaisseur de la bordure
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true // Commencer l'axe y à zéro
          }
        }
      }
    });
  }
  
}
