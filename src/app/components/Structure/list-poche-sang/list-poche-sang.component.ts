import { Component, OnInit } from '@angular/core';
import { PocheSangService } from '../../../Services/poche-sang.service';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BanqueSangService } from '../../../Services/banque-sang.service';

@Component({
  selector: 'app-list-poche-sang',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './list-poche-sang.component.html',
  styleUrl: './list-poche-sang.component.css'
})
export class ListPocheSangComponent implements OnInit{
  poches: any[] = [];
  banquesSang: { [key: number]: any } = {};
  filteredPoches: any[] = []; // Poches filtrées
  searchQuery: string = ''; // Variable pour stocker le texte de recherche


  constructor(private pocheSangService: PocheSangService, private banqueSangService: BanqueSangService) { }

  ngOnInit() {
    this.getPoches();
  }
  getPoches() {
    this.pocheSangService.getPoches().subscribe(data => {
      this.poches = data;
      this.filteredPoches = data; // Par défaut, afficher toutes les poches
      this.poches.forEach(poche => {
        this.getBanqueSang(poche.banque_sang_id); // Récupère la banque pour chaque poche
      });
    });
  }
  filterPoches(type: string) {
    if (type === 'donneur_externe') {
      this.filteredPoches = this.poches.filter(poche => poche.donneur_externe_id !== null && poche.rendez_vouse_id === null);
    } else if (type === 'utilisateur_simple') {
      this.filteredPoches = this.poches.filter(poche => poche.donneur_externe_id === null && poche.rendez_vouse_id !== null);
    } else {
      this.filteredPoches = this.poches; // Afficher toutes les poches
    }
    this.applySearchFilter();
  }
  onFilterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Typage explicite
    const selectedValue = selectElement.value;
    this.filterPoches(selectedValue);
  }
  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value.toLowerCase();
    this.applySearchFilter();
  }

  applySearchFilter() {
    this.filteredPoches = this.filteredPoches.filter((poche) =>
      poche.groupe_sanguin.toLowerCase().includes(this.searchQuery) ||
      (this.banquesSang[poche.banque_sang_id]?.matricule || '').toLowerCase().includes(this.searchQuery)
    );
  }
  isUtilisateurSimple(poche: any): boolean {
    // Remplacez cette condition par celle qui vérifie si la poche est d'un utilisateur simple
    return poche.rendez_vous_id !== null && poche.donneur_externe_id === null;
  }
  getBanqueSang(id: number) {
    if (!this.banquesSang[id]) { // Vérifie si la banque n'a pas encore été récupérée
      this.banqueSangService.getBanqueById(id).subscribe(banque => {
        this.banquesSang[id] = banque; // Stocke les détails de la banque dans le dictionnaire
      });
    }
  }
  deletePoche(id: number) {
    this.pocheSangService.deletePoche(id).subscribe(() => {
      this.poches = this.poches.filter(s => s.id !== id);
    });
  }

}
