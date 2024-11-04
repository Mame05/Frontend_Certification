import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnnonceService } from '../../../Services/annonce.service';
import { DonneurExterneService } from '../../../Services/donneur-externe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donneur-structure',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],  // Ajoutez NgFor ici
  templateUrl: './donneur-structure.component.html',
  styleUrls: ['./donneur-structure.component.css']
})
export class DonneurStructureComponent implements OnInit {
  utilisateursSimples: any[] = [];
  donneursExternes: any[] = [];
  filteredDonneurs: any[] = [];
  selectedType: string = 'all';
  filterValue: string = '';
  structureId: number | null = null;


  constructor(private annonceService: AnnonceService, private donneurExterneService: DonneurExterneService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const structureId = +params.get('id')!;
      console.log("Structure ID:", structureId); // Vérifiez si l'ID est correct

      if (structureId) {
        this.fetchUtilisateursWithCompletedInscriptions(structureId); // Passer structureId
        this.fetchDonneursParStructure(structureId); // Si vous souhaitez récupérer les donneurs externes aussi
      } else {
        console.error('Structure ID is not provided');
      }
    });
  }
  fetchUtilisateursWithCompletedInscriptions(structureId: number) {
    this.annonceService.getUtilisateursWithCompletedInscriptions(structureId)
      .subscribe((response: any) => {
        console.log("Réponse des utilisateurs:", response); // Ajout de log pour vérifier la réponse
        this.utilisateursSimples = response; // Utilisez une valeur par défaut vide
      }, error => {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      });
  }

  // Méthode pour récupérer les donneurs d'une structure spécifique
  fetchDonneursParStructure(structureId: number) {
    this.donneurExterneService.getDonneursParStructure(structureId).subscribe(
      (response: any) => {
        console.log("Réponse des donneurs externes:", response); // Ajout de log pour vérifier la réponse
        if (response.status) {
          this.donneursExternes = response.donneurs.map((donneur: any) => ({
            id: donneur.id,
            nom_complet: `${donneur.prenom} ${donneur.nom}`,
            telephone: donneur.telephone,
            groupe_sanguin: donneur.groupe_sanguin,
            nombre_de_dons: donneur.nombre_dons,
            dernier_don: donneur.dernier_don
          }));
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

    if (this.selectedType === 'utilisateurs') {
      donneursSource = this.utilisateursSimples;
    } else if (this.selectedType === 'donneursExternes') {
      donneursSource = this.donneursExternes;
    } else {
      donneursSource = [...this.utilisateursSimples, ...this.donneursExternes];
    }

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
