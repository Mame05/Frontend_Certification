import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { StructureService } from '../../../Services/structure.service';

@Component({
  selector: 'app-structure',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './structure.component.html',
  styleUrl: './structure.component.css'
})
export class StructureComponent implements OnInit {
  structures: any[] = [];  // Utilisation d'un tableau d'objets brut
  constructor(private structureService: StructureService) {}

  ngOnInit() {
   this.getStructure();
  }


  getStructure() {
    // Récupération des structures à partir du service
    this.structureService.getStructures().subscribe( {
      next: (data) => {
        console.log('Données des structures:', data);
        this.structures = data;
      },
      error: (err) => console.error('Erreur lors de la récupération des structures:', err)
    });    
  }
  deleteStructure(id: number) {
    this.structureService.deleteStructure(id).subscribe(() => {
      this.structures = this.structures.filter(s => s.id !== id);
    });
  }

}
