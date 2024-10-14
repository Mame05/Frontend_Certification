import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  //constructor() { }
  private http = inject(HttpClient);
  @Injectable({
    providedIn: 'root'
  })
   // Récupérer toutes les annonces pour chaque structure
      getAnnonces() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${apiUrl}/annonces`, {headers});
  }
  // Obtenir une annonce par ID
  getAnnonce(id: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${apiUrl}/annonces/${id}`, {headers});
  }

  // Créer une nouvelle annonce
  createAnnonce(annonce: any) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${apiUrl}/annonces`, annonce, {headers});
  }
  // Mettre à jour une annonce existante
  updateAnnonce(id: number, annonce: any) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${apiUrl}/annonces/${id}`, annonce, {headers});
  }

   // Supprimer une annonce
   deleteAnnonce(id: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${apiUrl}/annonces/${id}`, {headers});
  }

}
