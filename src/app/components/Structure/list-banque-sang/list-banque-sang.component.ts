import { Component, OnInit } from '@angular/core';
import { BanqueSangService } from '../../../Services/banque-sang.service';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-banque-sang',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './list-banque-sang.component.html',
  styleUrl: './list-banque-sang.component.css'
})
export class ListBanqueSangComponent implements OnInit{
  banques: any[] = [];

  constructor(private banqueSangService: BanqueSangService) { }

  ngOnInit() {
    this.getBanques();
  }
  getBanques() {
    this.banqueSangService.getBanques().subscribe(data => {
      this.banques = data;
    });
  }
  deleteBanque(id: number) {
    // Afficher la boîte de confirmation
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Cette action est irréversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Effectuer la suppression après confirmation
        this.banqueSangService.deleteBanque(id).subscribe({
          next: () => {
            // Mise à jour de la liste des banques après suppression
            this.banques = this.banques.filter(s => s.id !== id);

            // Afficher un message de succès
            Swal.fire({
              title: 'Supprimé!',
              text: 'La banque de sang a été supprimée avec succès.',
              icon: 'success',
              confirmButtonColor: '#3085d6'
            });
          },
          error: (error) => {
            console.error('Erreur lors de la suppression:', error);
            Swal.fire({
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression.',
              icon: 'error',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }
}


