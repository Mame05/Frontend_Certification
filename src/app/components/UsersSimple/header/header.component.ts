import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // header.component.ts
  isDropdownOpen = false;

  constructor(private router: Router) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  deconnexion() {
    // Logic for logout, e.g., clearing tokens and navigating to the login page
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.querySelector('.header') as HTMLElement;
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
}



