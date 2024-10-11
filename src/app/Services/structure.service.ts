import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class StructureService {
  private http = inject(HttpClient);
  @Injectable({
    providedIn: 'root'
  })
  //constructor(private http: HttpClient) { }

   // Obtenir toutes les structures
   getStructures() {
    // Récupérer le token de l'utilisateur   Afaire pour toutes méthodes
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Appeler la route GET /structures avec les headers  A faire pour toutes les methodes
    return this.http.get<any[]>(`${apiUrl}/structures`, {headers});
  }

  // Obtenir une structure par ID
  getStructure(id: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${apiUrl}/structures/${id}`, {headers});
  }

  // Créer une nouvelle structure
  createStructure(structure: any) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${apiUrl}/structures`, structure, {headers});
  }

  // Mettre à jour une structure existante
  updateStructure(id: number, structure: any) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${apiUrl}/structures/${id}`, structure, {headers});
  }

  // Supprimer une structure
  deleteStructure(id: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${apiUrl}/structures/${id}`, {headers});
  }
}
