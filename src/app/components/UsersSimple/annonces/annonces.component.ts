import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AnnonceService } from '../../../Services/annonce.service';

@Component({
  selector: 'app-annonces',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.css'
})
export class AnnoncesComponent implements OnInit  {
  annonces: any[] = [];
  paginatedUrgences: any[] = [];
  paginatedCollectes: any[] = [];
  currentPageUrgence = 1;
  currentPageCollecte = 1;
  pageSize = 2; // Nombre d'annonces par page pour les urgences
  collectePageSize = 4; // Nombre d'annonces par page pour les collectes
  // Tableau des images pour l'alternance
  urgenceImages: string[] = [
    '/assets/images/urgence1.png',
    '/assets/images/urgence2.png'
  ];

  collecteImages: string[] = [
    '/assets/images/collecte1.png',
    '/assets/images/collecte2.png'
  ];

  constructor(private annonceService: AnnonceService) {}

  ngOnInit(): void {
    this.getAnnonces();
    this.annonceService.onAnnonceAjoute().subscribe(() => {
      this.getAnnonces(); // Rafraîchir la liste quand une annonce est ajoutée
    }); 
  }
  getAnnonces() {
    this.annonceService.getAnnonces().subscribe({
      next: (data) => {
        console.log('Données des annonces:', data);
        this.annonces = data.sort((a, b) => new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime()); // Tri
        this.filterAnnonces();  // Appel à la méthode de filtrage ici
      },
      error: (err) => console.error('Erreur lors de la récupération des annonces:', err)
    });
  }


 filterAnnonces(): void {
  // Filtrer les annonces d'urgence
  const urgentAnnonces = this.annonces.filter(a => a.type_annonce === 'besoin_urgence');
  this.paginatedUrgences = urgentAnnonces.slice(
    (this.currentPageUrgence - 1) * this.pageSize, 
    this.currentPageUrgence * this.pageSize
  );
  
  
  // Filtrer les annonces de collecte
  const collecteAnnonces = this.annonces.filter(a => a.type_annonce === 'collecte');
  this.paginatedCollectes = collecteAnnonces.slice(
    (this.currentPageCollecte - 1) * this.collectePageSize, 
    this.currentPageCollecte * this.collectePageSize
  );
}
 
  // Méthode pour récupérer une image basée sur l'index
  getUrgenceImage(index: number): string {
    return this.urgenceImages[index % this.urgenceImages.length];  // Boucle à travers les images
  }

  getCollecteImage(index: number): string {
    return this.collecteImages[index % this.collecteImages.length];  // Boucle à travers les images
  
  }
  changePageUrgence(page: number): void {
    const maxPage = Math.ceil(this.annonces.filter(a => a.type_annonce === 'besoin_urgence').length / this.pageSize);
    if (page > 0 && page <= maxPage) {
      this.currentPageUrgence = page;
      this.filterAnnonces();
    }
  }

  changePageCollecte(page: number): void {
    const maxPage = Math.ceil(this.annonces.filter(a => a.type_annonce === 'collecte').length / this.collectePageSize);
    if (page > 0 && page <= maxPage) {
      this.currentPageCollecte = page;
      this.filterAnnonces();
    }
  }

 
  

}
