import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class DonneurExterneService {
  private http = inject(HttpClient);
  @Injectable({
    providedIn: 'root'
  })
  // Méthode pour obtenir tous les donneurs externes
  getDonneurExternes() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${apiUrl}/donneur-externes`, {headers});
  }

  
  // Méthode pour obtenir un poche un donneur externe par son id
  getDonneurExterneById(id: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${apiUrl}/donneur-externes/${id}`, {headers});
  }


  
}
