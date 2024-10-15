import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from './apiUrl';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  //constructor() { }
  private http = inject(HttpClient);
  private annonceAjouteSubject = new Subject<void>();
  @Injectable({
    providedIn: 'root'
  })
  // Méthode pour notifier les composants d'un changement
  notifyAnnonceAjoute() {
    this.annonceAjouteSubject.next();
  }

  onAnnonceAjoute() {
    return this.annonceAjouteSubject.asObservable();
  }
   // Récupérer toutes les annonces pour chaque structure
      getAnnonces() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${apiUrl}/annonces`, {headers}).pipe(
      map((data) => {
          return data.sort((a, b) => new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime());
      })
  );
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

