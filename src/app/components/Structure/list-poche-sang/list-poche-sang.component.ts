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

  constructor(private pocheSangService: PocheSangService, private banqueSangService: BanqueSangService) { }

  ngOnInit() {
    this.getPoches();
  }
  getPoches() {
    this.pocheSangService.getPoches().subscribe(data => {
      this.poches = data;
      this.poches.forEach(poche => {
        this.getBanqueSang(poche.banque_sang_id); // Récupère la banque pour chaque poche
      });
    });
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
