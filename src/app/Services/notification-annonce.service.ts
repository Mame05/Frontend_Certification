import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class NotificationAnnonceService {
  private http = inject(HttpClient);

  // Récupérer les notifications non lues
  getUnreadNotifications() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ unread_notifications:any[]}>(`${apiUrl}/notifications1/unread`, { headers }).pipe(
      map(response => response.unread_notifications) // Adapte la clé du retour JSON
    );
  }

  // Marquer une notification comme lue
  markAsRead(notificationId: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${apiUrl}/notifications1/${notificationId}/read`, {}, { headers });
  }

  // Supprimer une notification
  deleteNotification(notificationId: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${apiUrl}/notifications1/${notificationId}`, { headers });
  }

}
