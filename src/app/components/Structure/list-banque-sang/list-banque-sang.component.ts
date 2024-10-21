import { Component, OnInit } from '@angular/core';
import { BanqueSangService } from '../../../Services/banque-sang.service';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    this.banqueSangService.deleteBanque(id).subscribe(() => {
      this.banques = this.banques.filter(s => s.id !== id);
    });
  }
}


