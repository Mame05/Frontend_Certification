import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnnonceService } from '../../../Services/annonce.service';
import { CommonModule } from '@angular/common';
import { DonneurExterneService } from '../../../Services/donneur-externe.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donneur',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './donneur.component.html',
  styleUrl: './donneur.component.css'
})
export class DonneurComponent  implements OnInit {
//   donneurs: any[] = [];
//   filteredDonneurs: any[] = [];
//   filterValue: string = ''; // Valeur du filtre

//   constructor(private annonceService: AnnonceService, private donneurExterneService: DonneurExterneService) { }

//   ngOnInit() {
//      // Récupérer les utilisateurs simples
//     this.annonceService.getUtilisateursWithCompletedInscriptions()
//     .subscribe((utilisateursSimples: any) => {
//       console.log('Utilisateurs simples récupérés :', utilisateursSimples);

//       // Récupérer les donneurs externes de la structure
//       this.donneurExterneService.getDonneursParStructure().subscribe(
//         (response: any) => {
//           if (response.status) {
//             // Ici, on considère que response.donneurs est un tableau d'objets
//             const donneursExternes = response.donneurs; // Type implicite

//             console.log('Donneurs externes récupérés :', donneursExternes);

//             // Mapper les donneurs externes pour correspondre aux attributs attendus
//             const donneursExternesMap = donneursExternes.map((donneur: any) => ({ // Utiliser 'any' pour le type
//               id: donneur.id,
//               nom_complet: `${donneur.prenom} ${donneur.nom}`, // Combiner nom et prénom
//               telephone: donneur.telephone,
//               groupe_sanguin: donneur.groupe_sanguin ,
//               nombre_de_dons: donneur.nombre_dons ,
//               dernier_don: donneur.dernier_don 
//             }));

//             // Fusionner les utilisateurs simples et les donneurs externes
//             this.donneurs = [...utilisateursSimples, ...donneursExternesMap];
//             console.log('Données combinées récupérées :', this.donneurs);
//             this.filteredDonneurs = this.donneurs; // Initialiser les données filtrées
//           } else {
//             console.error("Erreur lors de la récupération des donneurs externes :", response.error);
//           }
//         },
//         (error) => {
//           console.error("Erreur lors de la récupération des donneurs externes :", error);
//         }
//       );
//     },
//     (error) => {
//       console.error("Erreur lors de la récupération des utilisateurs simples :", error);
//     }
//   );
// }
// // Méthode pour appliquer le filtre
// applyFilters() {
//   const value = this.filterValue.toLowerCase();
//   this.filteredDonneurs = this.donneurs.filter(donneur => 
//     donneur.nom_complet.toLowerCase().includes(value) ||
//     donneur.telephone.includes(value) ||
//     donneur.groupe_sanguin.toLowerCase().includes(value)
//   );
// }
utilisateursSimples: any[] = [];
donneursExternes: any[] = [];
filteredDonneurs: any[] = [];
selectedType: string = 'all'; // 'all', 'utilisateurs', 'donneursExternes'
filterValue: string = '';
structureId!: number;
nomStructure!: string;


constructor(private annonceService: AnnonceService, private donneurExterneService: DonneurExterneService) { }

ngOnInit() {
  // Récupérer les utilisateurs simples
  this.annonceService.getUtilisateursWithCompletedInscriptions()
    .subscribe((utilisateurs: any) => {
      this.utilisateursSimples = utilisateurs;
      this.fetchDonneursExternes();
    },
    (error) => {
      console.error("Erreur lors de la récupération des utilisateurs simples :", error);
    });
}

fetchDonneursExternes() {
  // Récupérer les donneurs externes de la structure
  this.donneurExterneService.getDonneursParStructure().subscribe(
    (response: any) => {
      if (response.status) {
        this.donneursExternes = response.donneurs.map((donneur: any) => ({
          id: donneur.id,
          nom_complet: `${donneur.prenom} ${donneur.nom}`,
          telephone: donneur.telephone,
          groupe_sanguin: donneur.groupe_sanguin,
          nombre_de_dons: donneur.nombre_dons,
          dernier_don: donneur.dernier_don
        }));

        // Initialiser la liste filtrée à tous les donneurs
        this.applyFilters();
      } else {
        console.error("Erreur lors de la récupération des donneurs externes :", response.error);
      }
    },
    (error) => {
      console.error("Erreur lors de la récupération des donneurs externes :", error);
    }
  );
}

applyFilters() {
  let donneursSource: any[] = [];
  
  // Filtrer en fonction du type sélectionné
  if (this.selectedType === 'utilisateurs') {
    donneursSource = this.utilisateursSimples;
  } else if (this.selectedType === 'donneursExternes') {
    donneursSource = this.donneursExternes;
  } else {
    donneursSource = [...this.utilisateursSimples, ...this.donneursExternes];
  }

  // Appliquer le filtre texte
  if (this.filterValue) {
    const lowerCaseFilterValue = this.filterValue.toLowerCase();
    this.filteredDonneurs = donneursSource.filter(donneur =>
      donneur.nom_complet.toLowerCase().includes(lowerCaseFilterValue) ||
      donneur.telephone.toLowerCase().includes(lowerCaseFilterValue) ||
      donneur.groupe_sanguin.toLowerCase().includes(lowerCaseFilterValue)
    );
  } else {
    this.filteredDonneurs = donneursSource;
  }
}
}
