import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { PocheSangService } from '../../../Services/poche-sang.service';
import { BanqueSangService } from '../../../Services/banque-sang.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-banque-sang',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './detail-banque-sang.component.html',
  styleUrl: './detail-banque-sang.component.css'
})
export class DetailBanqueSangComponent implements OnInit {
  banqueSang: any = {}; // Détails de la banque de sang
  banqueId: number | null = null; // ID de la banque de sang

  constructor(
    private route: ActivatedRoute,
    private banqueSangService: BanqueSangService
  ) {}
   // Fonction pour récupérer les clés d'un objet
   objectKeys = Object.keys;


  ngOnInit(): void {
    // Récupérer l'ID de la banque de sang à partir de la route
    this.banqueId = +this.route.snapshot.paramMap.get('id')!;
    if (this.banqueId) {
      this.getBanqueSangDetails(this.banqueId);
    }
  }

  // Récupérer les détails de la banque de sang par ID
  getBanqueSangDetails(id: number): void {
    this.banqueSangService.getBanqueById(id).subscribe({
      next: (data) => {
        this.banqueSang = data; // Stocker les détails de la banque de sang
        console.log('Détails de la banque de sang:', this.banqueSang); // Pour vérifier la structure des données
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails de la banque de sang', err);
      }
    });
  }

}
