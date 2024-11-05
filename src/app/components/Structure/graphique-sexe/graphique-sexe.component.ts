import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../../Services/annonce.service';
import { DonneurExterneService } from '../../../Services/donneur-externe.service';
import { Chart, ChartConfiguration, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-graphique-sexe',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './graphique-sexe.component.html',
  styleUrl: './graphique-sexe.component.css'
})
export class GraphiqueSexeComponent implements OnInit {

  donneurs: any[] = [];
  chart: Chart<'pie'> | undefined;



  constructor(private annonceService: AnnonceService, private donneurExterneService: DonneurExterneService) {}

  ngOnInit() {
    this.fetchDonneurs();
  }
  fetchDonneurs() {
    // Récupérer les utilisateurs simples
    this.annonceService.getUtilisateursWithCompletedInscriptions()
      .subscribe((utilisateurs: any) => {
        const utilisateursSimples = utilisateurs;
        
        // Récupérer les donneurs externes
        this.donneurExterneService.getDonneursParStructure().subscribe(
          (response: any) => {
            if (response.status) {
              const donneursExternes = response.donneurs.map((donneur: any) => ({
                id: donneur.id,
                nom_complet: `${donneur.prenom} ${donneur.nom}`,
                telephone: donneur.telephone,
                groupe_sanguin: donneur.groupe_sanguin,
                sexe: donneur.sexe,
                date_naiss: donneur.date_naiss
              }));

              // Fusionner les deux listes
              this.donneurs = [...utilisateursSimples, ...donneursExternes];
              this.createChart();
            }
          },
          (error) => console.error("Erreur lors de la récupération des donneurs externes :", error)
        );
      },
      (error) => console.error("Erreur lors de la récupération des utilisateurs simples :", error));
  }

  createChart() {
    // Compter le nombre de donneurs par sexe
    const sexeCount = this.donneurs.reduce((acc: { [key: string]: number }, donneur: any) => {
      acc[donneur.sexe] = (acc[donneur.sexe] || 0) + 1;
      return acc;
    }, {});

    // Définir les données du graphique
    const totalDonneurs = this.donneurs.length;
    const chartData: ChartData<'pie', number[], string> = {
      labels: Object.keys(sexeCount),
      datasets: [{
        data: Object.values(sexeCount) as number[],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384']  // Garde la couleur inchangée au survol
      }]
    };

    // Configuration du graphique
    const chartConfig: ChartConfiguration<'pie'> = {
      type: 'pie', // Changez le type selon vos besoins ('bar', 'line', 'doughnut', etc.)
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw as number;
                const percentage = ((value / totalDonneurs) * 100).toFixed(2);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    };


    // Initialisation du graphique
   const chartCanvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (chartCanvas) {
      this.chart = new Chart(chartCanvas, chartConfig);
    }
  }

}
