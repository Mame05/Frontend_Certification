import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnnonceService } from '../../../Services/annonce.service';
import { CommonModule } from '@angular/common';
import { DonneurExterneService } from '../../../Services/donneur-externe.service';

@Component({
  selector: 'app-donneur',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './donneur.component.html',
  styleUrl: './donneur.component.css'
})
export class DonneurComponent  implements OnInit {
  donneurs: any[] = [];

  constructor(private annonceService: AnnonceService, private donneurExterneService: DonneurExterneService) { }

  ngOnInit() {
     // Récupérer les utilisateurs simples
    this.annonceService.getUtilisateursWithCompletedInscriptions()
    .subscribe((utilisateursSimples: any) => {
      console.log('Utilisateurs simples récupérés :', utilisateursSimples);

      // Récupérer les donneurs externes de la structure
      this.donneurExterneService.getDonneursParStructure().subscribe(
        (response: any) => {
          if (response.status) {
            // Ici, on considère que response.donneurs est un tableau d'objets
            const donneursExternes = response.donneurs; // Type implicite

            console.log('Donneurs externes récupérés :', donneursExternes);

            // Mapper les donneurs externes pour correspondre aux attributs attendus
            const donneursExternesMap = donneursExternes.map((donneur: any) => ({ // Utiliser 'any' pour le type
              id: donneur.id,
              nom_complet: `${donneur.prenom} ${donneur.nom}`, // Combiner nom et prénom
              telephone: donneur.telephone,
              groupe_sanguin: donneur.groupe_sanguin ,
              nombre_de_dons: donneur.nombre_dons ,
              dernier_don: donneur.dernier_don 
            }));

            // Fusionner les utilisateurs simples et les donneurs externes
            this.donneurs = [...utilisateursSimples, ...donneursExternesMap];
            console.log('Données combinées récupérées :', this.donneurs);
          } else {
            console.error("Erreur lors de la récupération des donneurs externes :", response.error);
          }
        },
        (error) => {
          console.error("Erreur lors de la récupération des donneurs externes :", error);
        }
      );
    },
    (error) => {
      console.error("Erreur lors de la récupération des utilisateurs simples :", error);
    }
  );
}
}
