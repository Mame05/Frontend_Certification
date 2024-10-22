import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class PocheSangService {
  private http = inject(HttpClient);
  @Injectable({
    providedIn: 'root'
  })
   // Méthode pour obtenir toutes les poches de sang
   getPoches() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${apiUrl}/poche-sanguins`, {headers});
  }

  // Méthode pour obtenir une poche de sang spécifique
  getPocheById(id: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${apiUrl}/poche-sanguins/${id}`, {headers});
  }

  // Méthode pour créer une nouvelle poche
  createPoche(data: any) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${apiUrl}/poche-sanguins`, data, {headers});
  }

  // Méthode pour mettre à jour une poche
  updatePoche(id: number, data: any) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${apiUrl}/poche-sanguins/${id}`, data, {headers});
  }

  // Méthode pour supprimer une poche
  deletePoche(id: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${apiUrl}/poche-sanguins/${id}`, {headers});
  }

}
