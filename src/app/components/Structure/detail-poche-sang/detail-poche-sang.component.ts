import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { PocheSangService } from '../../../Services/poche-sang.service';
import { CommonModule } from '@angular/common';
import { BanqueSangService } from '../../../Services/banque-sang.service';

@Component({
  selector: 'app-detail-poche-sang',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './detail-poche-sang.component.html',
  styleUrl: './detail-poche-sang.component.css'
})
export class DetailPocheSangComponent implements OnInit{
  poches: any[] = []; // Liste des poches sanguines
  banquesSang: { [key: number]: any } = {}; // Associer les banques de sang par ID

  constructor(
    private route: ActivatedRoute,
    private pocheSangService: PocheSangService,
    private banqueSangService: BanqueSangService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID de la route (si nécessaire)
    if (id) {
      this.getPocheDetails(+id); // Charger les détails de la poche avec l'ID
    } else {
      this.getAllPoches(); // Charger toutes les poches s'il n'y a pas d'ID spécifique
    }
  }

  // Récupérer toutes les poches sanguines
  getAllPoches() {
    this.pocheSangService.getPoches().subscribe({
      next: (data) => {
        this.poches = data; // Stocker les poches

        // Pour chaque poche, récupérer la banque de sang associée
        this.poches.forEach(poche => {
          if (poche.banque_sang_id) {
            this.getBanqueSang(poche.banque_sang_id);
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des poches sanguines', err);
      }
    });
  }

  // Récupérer les détails d'une poche sanguine par ID
  getPocheDetails(id: number) {
    this.pocheSangService.getPocheById(id).subscribe({
      next: (data) => {
        this.poches = [data]; // Stocker une seule poche sous forme de tableau

        // Récupérer la banque de sang associée
        if (this.poches[0].banque_sang_id) {
          this.getBanqueSang(this.poches[0].banque_sang_id);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la poche sanguine', err);
      }
    });
  }

  // Récupérer les détails de la banque de sang
  getBanqueSang(banqueId: number) {
    if (!this.banquesSang[banqueId]) { // Vérifie si la banque n'a pas déjà été récupérée
      this.banqueSangService.getBanqueById(banqueId).subscribe({
        next: (banqueData) => {
          this.banquesSang[banqueId] = banqueData; // Associer la banque à son ID
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des détails de la banque de sang', err);
        }
      });
    }
  }
   // Récupérer les informations de la banque de sang, comme le matricule ou le stock actuel
   getBanqueInfo(banqueId: number, info: string): string {
    const banque = this.banquesSang[banqueId];
    return banque ? banque[info] : 'Non disponible';
  }

}
