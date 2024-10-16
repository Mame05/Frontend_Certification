import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from '../../../Services/annonce.service';
import { AuthService } from '../../../Services/Auth/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-detail-annonce-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-annonce-user.component.html',
  styleUrl: './detail-annonce-user.component.css'
})
export class DetailAnnonceUserComponent implements OnInit{
  annonce: any;
  annonceId: number | undefined;
  isInscrit: boolean = false;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private annonceService: AnnonceService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.annonceId = Number(this.route.snapshot.paramMap.get('id')); // Convertit en nombre
    console.log('ID de l\'annonce récupéré :', this.annonceId); // Ajout d'un log pour vérifier l'ID
    this.getAnnonceDetails(this.annonceId); // Récupère les détails de l'annonce

  }

  // Récupérer les informations de l'annonce
  getAnnonceDetails(annonceId: number | undefined) {
    if (annonceId) {
      this.annonceService.getAnnonce(annonceId).subscribe(
        (data: any) => {
          console.log('Détails de l\'annonce récupérés :', data); // Ajout d'un log pour vérifier les données
          this.annonce = data;
          this.checkIfInscrit(); // Vérifier si l'utilisateur est déjà inscrit
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails de l\'annonce', error);
        }
      );
    }
  }

  // Vérifier si l'utilisateur est déjà inscrit à cette annonce
  checkIfInscrit() {
      this.annonceService.getInscriptions().subscribe(
        (inscriptions: any) => { // Utiliser l'interface Inscription ici
          // Vérifier si l'utilisateur est déjà inscrit à cette annonce
          this.isInscrit = inscriptions.some((inscription: any) => inscription.annonce_id === this.annonce?.id);
        },
        (error) => {
          console.error('Erreur lors de la vérification des inscriptions', error);
        }
      );
     
  }
  
  inscrire() {
    // Utiliser l'ID d'annonce récupéré de la route plutôt que de l'objet annonce
    if (!this.annonceId) {
      console.error('ID d\'annonce non défini.');
      //this.message = 'Erreur lors de l\'inscription : ID non valide.';
      return;
    }
    // Appel au service pour effectuer l'inscription
    this.annonceService.inscrire(this.annonceId).subscribe(
      (response: any) => {
        if (response.message === 'Inscription réussie !') {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Inscription réussie !',
            confirmButtonText: 'OK'
          });
          this.isInscrit = true; // Met à jour l'état pour désactiver le bouton
        } else if (response.message === 'Vous êtes déjà inscrit à cette annonce.') {
          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: 'Vous êtes déjà inscrit à cette annonce.',
            confirmButtonText: 'OK'
          });
  
        }
         else {
          this.message = response.message; // Message en cas d'erreur
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: response.message || 'Erreur inconnue lors de l\'inscription.',
            confirmButtonText: 'OK'
          });
        }
      },
      (error) => {
        console.error('Erreur lors de l\'inscription', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error?.error?.message || 'Erreur lors de l\'inscription.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
