import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StructureService } from '../../../Services/structure.service';
import { AuthService } from '../../../Services/Auth/auth.service';
import { PocheSangService } from '../../../Services/poche-sang.service';
import { CommonModule } from '@angular/common';
import { BanqueSangService } from '../../../Services/banque-sang.service';
import { AnnonceService } from '../../../Services/annonce.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalStructures: number = 0;
  utilisateursSimples: any[] = [];
  stockData: { structureNom: string; nombre: number }[] = []; // Pour stocker les données du stock par structure
  annoncesRecientes: any[] = []; // Pour stocker les annonces récentes
  structures: any[] = []; // Ajoutez cette ligne pour déclarer structures
  

  constructor(
    private structureService: StructureService,
    private utilisateurService: AuthService,
    private pocheSangService: PocheSangService,
    private banqueSangService: BanqueSangService,
    private annonceService: AnnonceService
  ) {}

  ngOnInit() {
    this.fetchTotalStructures();
    this.getUtilisateursSimples();
    this.fetchStockParStructure();
    this.getRecentAnnonces(); // Appeler la méthode pour récupérer les annonces récentes

  }

  fetchTotalStructures() {
    this.structureService.getStructures().subscribe(
      (structures: any[]) => {
        this.totalStructures = structures.length;
      },
      (error) => {
        console.error("Erreur lors de la récupération des structures :", error);
      }
    );
  }

  getUtilisateursSimples() {
    this.utilisateurService.getUtilisateurs().subscribe(
      (response: any) => {
        // Accédez aux utilisateurs simples via response.data
        this.utilisateursSimples = response.data;
        console.log("Utilisateurs simples extraits :", this.utilisateursSimples);
      },
      (error) => {
        console.error("Erreur lors de la récupération des utilisateurs simples :", error);
      }
    );
  }

  fetchStockParStructure() {
     // Récupérer les structures
  this.structureService.getStructures().subscribe(
    (structures: any[]) => {
      console.log("Structures:", structures); // Vérifiez les structures

      // Récupérer les banques de sang pour chaque structure
      this.banqueSangService.getBanques().subscribe(
        (banques: any[]) => {
          console.log("Banques de Sang:", banques); // Vérifiez les banques de sang

          // Récupérer les poches
          this.pocheSangService.getPoches().subscribe(
            (poches: any[]) => {
              console.log("Poches:", poches); // Vérifiez les poches

              // Initialiser le stockData
              this.stockData = structures.map(structure => {
                // Filtrer les banques de sang de la structure actuelle
                const banquesDeLaStructure = banques.filter(banque => banque.structure_id === structure.id);
                
                // Compter les poches pour chaque banque
                const nombrePoches = banquesDeLaStructure.reduce((count, banque) => {
                  const pochesDeLaBanque = poches.filter(poche => poche.banque_sang_id === banque.id);
                  return count + pochesDeLaBanque.length; // Additionner les poches pour cette banque
                }, 0);
                
                return {
                  structureNom: structure.nom_structure,
                  nombre: nombrePoches // Compter le nombre total de poches pour cette structure
                };
              });

              console.log("Stock Data:", this.stockData); // Vérifiez le résultat final
            },
            (error) => {
              console.error("Erreur lors de la récupération des poches :", error);
            }
          );
        },
        (error) => {
          console.error("Erreur lors de la récupération des banques de sang :", error);
        }
      );
    },
    (error) => {
      console.error("Erreur lors de la récupération des structures :", error);
    }
  );
  }

  getRecentAnnonces() {
    this.annonceService.getAnnonces().subscribe(
      (annonces: any[]) => {
        console.log("Annonces reçues :", annonces);
        this.annoncesRecientes = annonces;

        // Tri des annonces par date (assurez-vous que structure_id est de type approprié)
        this.annoncesRecientes.sort((a, b) => new Date(a.date_debut).getTime() - new Date(b.date_debut).getTime());
      
        // Conserver seulement les 3 dernières annonces
        this.annoncesRecientes = this.annoncesRecientes.slice(-3);

        this.structureService.getStructures().subscribe(
          (structures: any[]) => {  // Utilisation de any[]
            console.log("Structures reçues :", structures);
            this.structures = structures;

            // Attribution des noms de structure aux annonces
            this.annoncesRecientes.forEach(annonce => {
              const structure = this.structures.find((s: any) => s.id === annonce.structure_id); // Utilisation de any ici aussi
              console.log(`Annonce ID: ${annonce.id}, Structure ID: ${annonce.structure_id}, Structure trouvée :`, structure);
              
              annonce.structureNom = structure ? structure.nom_structure : 'Inconnu';
              console.log(`Annonce ID: ${annonce.id}, Nom de la structure assigné: ${annonce.structureNom}`);
            });
          },
          (error) => {
            console.error("Erreur lors de la récupération des structures :", error);
          }
        );
      },
      (error) => {
        console.error("Erreur lors de la récupération des annonces :", error);
      }
    );
}




}
