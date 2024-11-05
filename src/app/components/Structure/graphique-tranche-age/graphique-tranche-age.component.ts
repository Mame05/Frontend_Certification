import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { AnnonceService } from '../../../Services/annonce.service';
import { DonneurExterneService } from '../../../Services/donneur-externe.service';

@Component({
  selector: 'app-graphique-tranche-age',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './graphique-tranche-age.component.html',
  styleUrl: './graphique-tranche-age.component.css'
})
export class GraphiqueTrancheAgeComponent implements OnInit {

  donneurs: any[] = [];
  chart: Chart<'bar'> | undefined;

  constructor(private annonceService: AnnonceService, private donneurExterneService: DonneurExterneService) {}

  ngOnInit() {
    this.fetchDonneurs();
  }

  fetchDonneurs() {
    this.annonceService.getUtilisateursWithCompletedInscriptions()
      .subscribe((utilisateurs: any) => {
        const utilisateursSimples = utilisateurs;

        this.donneurExterneService.getDonneursParStructure().subscribe(
          (response: any) => {
            if (response.status) {
              const donneursExternes = response.donneurs.map((donneur: any) => ({
                id: donneur.id,
                nom_complet: `${donneur.prenom} ${donneur.nom}`,
                telephone: donneur.telephone,
                groupe_sanguin: donneur.groupe_sanguin,
                sexe: donneur.sexe,
                date_naiss: donneur.date_naiss,
              }));

              this.donneurs = [...utilisateursSimples, ...donneursExternes];
              this.createChart();
            }
          },
          (error) => console.error("Erreur lors de la récupération des donneurs externes :", error)
        );
      },
      (error) => console.error("Erreur lors de la récupération des utilisateurs simples :", error));
  }

  calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  createChart() {
    // Initialiser les tranches d'âge pour les donneurs éligibles (18-50 ans)
    const ageTranches = {
      '18-25': 0,
      '26-35': 0,
      '36-45': 0,
      '46-50': 0,
    };

    // Filtrer et classer les donneurs par tranche d'âge
    this.donneurs.forEach(donneur => {
      const age = this.calculateAge(donneur.date_naiss);

      if (age >= 18 && age <= 25) {
        ageTranches['18-25']++;
      } else if (age >= 26 && age <= 35) {
        ageTranches['26-35']++;
      } else if (age >= 36 && age <= 45) {
        ageTranches['36-45']++;
      } else if (age >= 46 && age <= 50) {
        ageTranches['46-50']++;
      }
    });

    // Données pour le graphique
    const chartData: ChartData<'bar'> = {
      labels: Object.keys(ageTranches),
      datasets: [{
        label: 'Nombre de donneurs par tranche d\'âge',
        data: Object.values(ageTranches),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: '#FFC107'
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
              precision: 0,
              callback: (value) => `${value}`
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#4B0082'
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ${Math.floor(Number(context.raw))}`
            }
          }
        }
      }
    };

    const chartCanvas = document.getElementById('trancheAgeChart') as HTMLCanvasElement;
    if (chartCanvas) {
      this.chart = new Chart(chartCanvas, chartConfig);
    }
  }

}
