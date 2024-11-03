import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnnonceService } from '../../../Services/annonce.service';
import { DonneurExterneService } from '../../../Services/donneur-externe.service';
import { PocheSangService } from '../../../Services/poche-sang.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard1',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard1.component.html',
  styleUrl: './dashboard1.component.css'
})
export class Dashboard1Component implements OnInit{
  totalPochesDeSang: number = 0;
  totalAnnonces: number = 0;
  totalDonneurs: number = 0;
  pochesParGroupeSanguin: { groupe: string, nombre: number }[] = []; // Initialisez la variable ici
  derniereAnnonces: any[] = [];

  


constructor(
  private pocheSangService: PocheSangService,
  private annonceService: AnnonceService,
  private donneurExterneService: DonneurExterneService
) {}
ngOnInit() {
  this.fetchTotalPochesDeSang();
  this.fetchTotalAnnonces();
  this.fetchTotalDonneurs();
  this.fetchPochesParGroupeSanguin();
  this.fetchDernieresAnnonces();
}
fetchTotalPochesDeSang() {
  this.pocheSangService.getPoches().subscribe(
    (poches: any[]) => {
      // Compte le nombre de poches de sang en stock
      this.totalPochesDeSang = poches.length;
    },
    (error) => {
      console.error("Erreur lors de la récupération des poches de sang :", error);
    }
  );
}
fetchTotalAnnonces() {
  this.annonceService.getAnnonces().subscribe(
    (annonces: any[]) => {
      // Compte le nombre d'annonces publiées
      this.totalAnnonces = annonces.length;
    },
    (error) => {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  );
}
fetchTotalDonneurs() {
  // Initialiser les comptes
  let utilisateursInscriptionsCount = 0;
  let donneursParStructureCount = 0;

  // Appel de la première méthode
  this.annonceService.getUtilisateursWithCompletedInscriptions().subscribe(
    (response: any) => {
      // Affiche le contenu de la réponse pour déboguer
      console.log("Réponse utilisateurs avec inscriptions :", response);

      // Vérifiez si la réponse est un tableau ou un objet contenant les données
      const utilisateurs = Array.isArray(response) ? response : response.data || [];
      utilisateursInscriptionsCount = Array.isArray(utilisateurs) ? utilisateurs.length : 0;

      // Appel de la deuxième méthode
      this.donneurExterneService.getDonneursParStructure().subscribe(
        (donneursResponse: any) => {
          console.log("Réponse donneurs par structure :", donneursResponse);

          // Vérifiez si la réponse contient bien le tableau des donneurs
          if (donneursResponse.status && Array.isArray(donneursResponse.donneurs)) {
            donneursParStructureCount = donneursResponse.donneurs.length;
          }

          // Addition des deux comptes pour obtenir le total
          this.totalDonneurs = utilisateursInscriptionsCount + donneursParStructureCount;
          console.log("Total des donneurs :", this.totalDonneurs);
        },
        (error) => {
          console.error("Erreur lors de la récupération des donneurs par structure :", error);
        }
      );
    },
    (error) => {
      console.error("Erreur lors de la récupération des utilisateurs avec inscriptions complètes :", error);
    }
  );
}

// Récupération pour le tableau
fetchPochesParGroupeSanguin() {
  this.pocheSangService.getPoches().subscribe(
    (poches: any[]) => {
      console.log("Réponse des poches :", poches); // Ajoutez ce log pour vérifier la réponse
      const groupes: { [key: string]: number } = {};
      
      // Itérer sur chaque poche pour les compter par groupe sanguin
      poches.forEach(poche => {
        console.log("Poche :", poche); // Ajoutez ce log pour chaque poche
        const groupe = poche.groupe_sanguin; // Vérifiez que c'est la bonne propriété
        if (groupes[groupe]) {
          groupes[groupe]++;
        } else {
          groupes[groupe] = 1;
        }
      });

      // Convertir l'objet en tableau pour l'affichage
      this.pochesParGroupeSanguin = Object.entries(groupes).map(([groupe, nombre]) => ({ groupe, nombre }));
      console.log("Poches par groupe sanguin :", this.pochesParGroupeSanguin);
    },
    (error) => {
      console.error("Erreur lors de la récupération des poches :", error);
    }
  );
}

// Récupération des dernières annonces
fetchDernieresAnnonces() {
  this.annonceService.getAnnonces().subscribe(
    (annonces: any[]) => {
      // Vérifiez si des annonces sont retournées
      if (annonces && annonces.length > 0) {
         // Trier les annonces par date (du plus ancien au plus récent)
          annonces.sort((a, b) => new Date(a.date_debut).getTime() - new Date(b.date_debut).getTime());
        // Prenez les deux dernières annonces aprés le tri
        this.derniereAnnonces = annonces.slice(-2); // Slice pour obtenir les 2 dernières annonces
      } else {
        console.warn("Aucune annonce trouvée.");
      }
    },
    (error) => {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  );
}
 // Méthode pour calculer la durée entre deux dates
 calculerDuree(dateDebut: string, dateFin: string): number {
  const debut = new Date(dateDebut);
  const fin = new Date(dateFin);
  const diffTime = Math.abs(fin.getTime() - debut.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir le temps en jours
  return diffDays + 1;
}


}
