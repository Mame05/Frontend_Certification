import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  //constructor() { }
  private http = inject(HttpClient);
 
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
  updateEtatAddPoche(rendezVous: number,  data: any) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${apiUrl}/rendez-vous/${rendezVous}/etat`, data, {headers});
  }
   // Méthode pour obtenir une poche de sang spécifique
   getPocheById(id: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${apiUrl}/poche-sanguins/${id}`, {headers});
  }
   // Méthode pour mettre à jour une poche de sang des utilisateurs simple
   updatePocheUS(pocheId: number, data: any) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${apiUrl}/poche-sanguin/${pocheId}`, data, {headers});
  }
  
}
