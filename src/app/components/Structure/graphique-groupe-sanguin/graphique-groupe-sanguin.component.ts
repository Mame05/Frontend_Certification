import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData } from 'chart.js';
import { AnnonceService } from '../../../Services/annonce.service';
import { DonneurExterneService } from '../../../Services/donneur-externe.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-graphique-groupe-sanguin',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './graphique-groupe-sanguin.component.html',
  styleUrl: './graphique-groupe-sanguin.component.css'
})
export class GraphiqueGroupeSanguinComponent implements OnInit {

  donneurs: any[] = [];
  chart: Chart<'bar'> | undefined;

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
    const groupeSanguinCount = this.donneurs.reduce((acc: { [key: string]: number }, donneur: any) => {
      const groupe = donneur.groupe_sanguin || 'Inconnu'; // Gérer les cas sans groupe sanguin
      acc[groupe] = (acc[groupe] || 0) + 1;
      return acc;
    }, {});

    const chartData: ChartData<'bar'> = {
      labels: Object.keys(groupeSanguinCount),
      datasets: [{
        label: 'Nombre de donneurs',
        data: Object.values(groupeSanguinCount).map(num => Number(num)),
        backgroundColor: this.getColors(Object.keys(groupeSanguinCount)),
        hoverBackgroundColor: '#FFC107'  // Couleur de survol
      }]
    };

    const chartConfig: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0, // Afficher uniquement des entiers
              callback: (value) =>`${value}`  // Formater les ticks pour éviter les décimales
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#4B0082' // Couleur spécifique pour la légende
            }
          },
          tooltip: {
            callbacks: {
              label: (context) =>`${context.dataset.label}: ${Math.floor(Number(context.raw))}` // Afficher uniquement les entiers
            }
          }
        }
      }
    };

    const chartCanvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (chartCanvas) {
      this.chart = new Chart(chartCanvas, chartConfig);
    }
  }
  getColors(groups: string[]): string[] {
    // Définissez ici les couleurs pour chaque groupe sanguin
    const colors: { [key: string]: string } = {
      'A+': '#FF6384',
      'A-': '#36A2EB',
      'B+': '#FFCE56',
      'B-': '#FF9F40',
      'AB+': '#4BC0C0',
      'AB-': '#9966FF',
      'O+': '#FF6384',
      'O-': '#36A2EB',
      'Inconnu': '#CCCCCC' // Couleur pour les groupes inconnus
    };

    // Retourner un tableau de couleurs selon l'ordre des groupes
    return groups.map(group => colors[group] || '#CCCCCC'); // Couleur par défaut pour les groupes non définis
  }

}
