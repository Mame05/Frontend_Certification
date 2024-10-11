import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/Auth/auth.service';


@Component({
  selector: 'app-sidebare',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebare.component.html',
  styleUrl: './sidebare.component.css'
})
export class SidebareComponent {
  constructor(private authService: AuthService, private router: Router) {}

}
