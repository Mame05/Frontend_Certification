import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  //constructor() { }
  private http = inject(HttpClient);
  @Injectable({
    providedIn: 'root'
  })
   // Récupérer tous les rendez-vous pour chaque structure
    getRendezVouss() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${apiUrl}/rendez-vous`, {headers});
  }
  // Récupérer un rendez-vous par ID
  getRendezVous(id: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${apiUrl}/rendez-vous/${id}`, {headers});
  }
  updateEtat(rendezVousId: number,  data: { etat: boolean }) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${apiUrl}/rendez-vous/${rendezVousId}/etat`, data, {headers});
  }
}
