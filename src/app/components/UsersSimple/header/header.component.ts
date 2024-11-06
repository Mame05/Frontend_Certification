import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NotificationAnnonceService } from '../../../Services/notification-annonce.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  // header.component.ts
  isDropdownOpen = false;
  notifications: any[] = [];
  unreadCount: number = 0;

  constructor (private notificationAnnonceService: NotificationAnnonceService, private router: Router ) {}

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

  ngOnInit() {
    this.getNotifications();
  } 

  // Récupérer le nombre de notifications non lues
  getNotifications() {
    this.notificationAnnonceService.getUnreadNotifications().subscribe(
      (data) => {
        this.notifications = data.map(notification => ({
          ...notification,
          lue: false // Initialisez toutes les notifications comme non lues
      }));
        this.unreadCount = data.length;
      },
      (error) => {
        console.error('Erreur lors de la récupération des notifications', error);
      }
    );
  }
  openModal() {
    this.getNotifications(); // Assurez-vous de charger les notifications avant d'ouvrir le modal
    const modalElement = document.getElementById('notificationsModal');
    if (modalElement) {
      const modalInstance = new (window as any).bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  

  // Marquer une notification comme lue
 /* markAsRead(notificationId: number) {
    this.notificationAnnonceService.markAsRead(notificationId).subscribe(() => {
      this.getNotifications();
    });
  }*/
    markAsRead(notificationId: number) {
      this.notificationAnnonceService.markAsRead(notificationId).subscribe(() => {
        // Marquer la notification comme lue
        const notification = this.notifications.find(notification => notification.id === notificationId);
        if (notification) {
          notification.lue = true; // Mettez à jour l'état de la notification
        }
        this.unreadCount--; // Décrémentez le compteur des notifications non lues
      });
    }
    

  // Supprimer une notification
  deleteNotification(notificationId: number) {
    this.notificationAnnonceService.deleteNotification(notificationId).subscribe(() => {
      this.getNotifications();
    });
  }
}



