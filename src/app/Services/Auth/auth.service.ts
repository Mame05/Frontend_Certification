import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://votre-api-url.com/api'; // Remplacez par l'URL de votre API backend

  constructor(private http: HttpClient, private router: Router) { }

  /*login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  storeToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('authToken');*/
    isLoggedIn() {
      // Simule une vérification d'authentification
      return !!localStorage.getItem('token');  // Exemple simple
    }
    // Méthode pour la connexion
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Méthode pour l'inscription
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  storeToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Vérifie si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  }


