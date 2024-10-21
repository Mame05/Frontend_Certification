import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NotificationAnnonceService } from '../../../Services/notification-annonce.service';
import { CommonModule } from '@angular/common';
import { StructureService } from '../../../Services/structure.service';

@Component({
  selector: 'app-sidebare1',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebare1.component.html',
  styleUrl: './sidebare1.component.css'
})
export class Sidebare1Component implements OnInit {
  nomstructure: string | undefined;
  notifications: any[] = [];
  unreadCount: number = 0;

  constructor (private structureService: StructureService, private notificationAnnonceService: NotificationAnnonceService, private router: Router ) {}
  ngOnInit() {
    this.structureService.getStructureConnectee().subscribe(
      (data) => {
        this.nomstructure = data.nom_structure;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données de la structure', error);
      }
    );
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
