import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { Observable } from 'rxjs';
import { Poche } from './poche'; // Importer l'interface Poche

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  private http = inject(HttpClient);

  // Méthode pour obtenir le nombre de poches par mois pour chaque structure
  getPochesSanguinsParMois(): Observable<Poche[]> { // Spécifier le type de retour
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Poche[]>(`${apiUrl}/poches-par-mois`, { headers }); // Typage ici aussi
  }
}
