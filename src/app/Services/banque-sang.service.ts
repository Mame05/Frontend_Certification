import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class BanqueSangService {
  private http = inject(HttpClient);
  @Injectable({
    providedIn: 'root'
  })
   // Méthode pour obtenir toutes les banques de sang
   getBanques() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${apiUrl}/banque-sangs`, {headers});
  }

  // Méthode pour obtenir une banque de sang spécifique
  getBanqueById(id: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${apiUrl}/banque-sangs/${id}`, {headers});
  }

  // Méthode pour créer une nouvelle banque
  createBanque(data: any) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${apiUrl}/banque-sangs`, data, {headers});
  }

  // Méthode pour mettre à jour une banque
  updateBanque(id: number, data: any) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${apiUrl}/banque-sangs/${id}`, data, {headers});
  }

  // Méthode pour supprimer une banque
  deleteBanque(id: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${apiUrl}/banque-sangs/${id}`, {headers});
  }
 

}
