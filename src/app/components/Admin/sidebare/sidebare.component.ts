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

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const topbar = document.querySelector('.topbar');
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
    }
    if (mainContent) {
      mainContent.classList.toggle('expanded');
    }
    if (topbar) {
      topbar.classList.toggle('expanded');
    }
  }

}
