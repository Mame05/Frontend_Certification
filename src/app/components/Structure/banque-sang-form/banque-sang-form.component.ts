import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BanqueSangService } from '../../../Services/banque-sang.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-banque-sang-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './banque-sang-form.component.html',
  styleUrl: './banque-sang-form.component.css'
})
export class BanqueSangFormComponent implements OnInit {
  banqueForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private banqueSangService: BanqueSangService
  ) { }

  ngOnInit() {
    this.banqueForm = this.fb.group({
      matricule: '',
      stock_actuelle: [{ value: '', disabled: true }],
      date_mise_a_jour: [{ value: '', disabled: true }]
    });
  }


 onSubmit() {
   if (this.banqueForm.valid) {
     const formData = { ...this.banqueForm.value };
     
     // S'assurer que les champs non utilisés ne sont pas envoyés
     formData.stock_actuelle = null; // Toujours envoyer null pour stock_actuelle
     formData.date_mise_a_jour = null; // Toujours envoyer null pour date_mise_a_jour
    // Envoyer la requête d'ajout
    this.banqueSangService.createBanque(formData).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Succès!',
          text: 'La nouvelle banque de sang a été ajoutée avec succès.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000 // L'alerte disparaît après 2 secondes
        })
          // Rediriger vers la liste des annonces après la confirmation de l'alerte
          setTimeout(() => {
          // Rediriger vers la liste des annonces après confirmation
          this.router.navigate(['/sidebar1/banque-sang']); // Redirection après succès
        }, 2000);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la banque de sang:', error);
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur est survenue lors de l\'ajout de la banque de sang.',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000 // L'alerte disparaît après 2 secondes
        });
      }
    });
  } else {
    // Alerte si le formulaire est invalide
    Swal.fire({
      title: 'Formulaire Invalide',
      text: 'Veuillez remplir tous les champs requis avant de soumettre.',
      icon: 'warning',
      showConfirmButton: false,
      timer: 3000 // L'alerte disparaît après 2 secondes
    });
   }
 }

}
