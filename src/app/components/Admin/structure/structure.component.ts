import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-structure',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './structure.component.html',
  styleUrl: './structure.component.css'
})
export class StructureComponent {

}
