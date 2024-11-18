import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AnnonceService } from '../../../Services/annonce.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-annonce',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, FormsModule],
  templateUrl: './annonce.component.html',
  styleUrl: './annonce.component.css'
})
export class AnnonceComponent   implements OnInit{
  annonces: any[] = [];  // Utilisation d'un tableau d'objets brut
  filteredAnnonces: any[] = [];  // Liste des annonces filtrées
  selectedType: string = 'all';  // Type d'annonce sélectionné (collecte, besoin_urgence ou tous)
  filterValue: string = '';  // Valeur du filtre de recherche

  constructor(private annonceService: AnnonceService) {}

  ngOnInit() {
   this.getAnnonce();
   //this.getAnnonce(); // Rafraîchir la liste quand une annonce est ajoutée
  }

  // Récupérer les annonces à partir du service et appliquer les filtres
  getAnnonce() {
    this.annonceService.getAnnonces().subscribe( {
      next: (data) => {
        console.log('Données des annonces:', data);
        this.annonces = data.sort((a, b) => new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime()); // Tri;
        this.applyFilters();  // Appliquer les filtres initiaux
      },
      error: (err) => console.error('Erreur lors de la récupération des annonces:', err)
    });    
  }
   // Appliquer les filtres en fonction du type et de la valeur de recherche
   applyFilters() {
    this.filteredAnnonces = this.annonces.filter((annonce) => {
      // Filtrer par type en utilisant `type_annonce`
      const typeMatch = this.selectedType === 'all' || annonce.type_annonce === this.selectedType;

     // Filtrer par date en utilisant `startsWith` pour le filtrage progressif
     const formattedDate = this.formatDate(annonce.date_debut);  // Formater la date au format `dd/MM/yyyy`
     const searchMatch = !this.filterValue || formattedDate.startsWith(this.filterValue);

     return typeMatch && searchMatch;
    });
  }
   // Fonction pour convertir la date en `dd/MM/yyyy`
   formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  }

  deleteAnnonce(id: number) {
    // Trouver l'annonce par son ID pour vérifier le nombre d'inscrits
    const annonce = this.annonces.find(a => a.id === id);

    if (annonce && annonce.nombre_inscrits > 0) {
        // Si l'annonce a des inscrits, afficher un message d'avertissement
        Swal.fire('Suppression impossible', 'Cette annonce a des inscrits et ne peut pas être supprimée.', 'warning');
    } else {
        // Afficher la boîte de confirmation avant la suppression
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: 'Voulez-vous vraiment supprimer cette annonce?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si l'utilisateur confirme, procéder à la suppression
                this.annonceService.deleteAnnonce(id).subscribe(() => {
                    // Filtrer la liste pour retirer l'annonce supprimée
                    this.annonces = this.annonces.filter(a => a.id !== id);
                    Swal.fire('Supprimé!', 'L\'annonce a été supprimée avec succès.', 'success');
                }, error => {
                    console.error('Erreur lors de la suppression de l\'annonce:', error);
                    Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression de l\'annonce.', 'error');
                });
            }
        });
    }
}

}
