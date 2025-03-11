import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StructureService } from '../../../Services/structure.service';
import Swal from 'sweetalert2'; // Importer SweetAlert


@Component({
  selector: 'app-ajout-structure',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './ajout-structure.component.html',
  styleUrl: './ajout-structure.component.css'
})
export class AjoutStructureComponent {
  structureForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private structureService: StructureService,
    private router: Router
  ) {
    this.structureForm = this.fb.group({
      nom_structure: ['', [Validators.required,  Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ '-]*$/)]],
      sigle: ['', [Validators.required, Validators.pattern(/^[A-Z0-9][A-Z0-9.-]*[A-Z0-9]$/)
      ]],
      adresse: ['', [Validators.required,  Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ0-9 ,.'\-+/]*$/)]],
      telephone: ['', [Validators.required, Validators.pattern(/^(33|77|78|76|75|70)\s?\d{3}\s?\d{2}\s?\d{2}$/)]],
      region: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)]],
    });
  }

  onSubmit() {
    if (this.structureForm.valid) {
      console.log(this.structureForm.value);  // Vérifier les données du formulaire
      this.structureService.createStructure(this.structureForm.value).subscribe({
        next: (response) => {
        console.log('Structure ajoutée avec succès', response);
        //Afficher l'alerte SweetAlert
        Swal.fire({
          icon: 'success',
          title: '🎉 Structure ajoutée !',
          text: 'La structure a été ajoutée avec succès.',
          showConfirmButton: false,
          timer: 2500// Ferme l'alerte après 2.5 secondes
        }).then(() => {
          // Redirection après fermeture de l'alerte
          this.router.navigate(['/sidebar/structure']);
        });
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la structure', error);
        // Afficher une alerte en cas d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Échec de l\'ajout',
          text: 'Une erreur est survenue, veuillez réessayer.',
          confirmButtonText: 'OK'
        });
      },
    });
  } else {
    //Afficher une alerte si le formulaire est invalide
    Swal.fire({
      icon: 'warning',
      title: 'Champs invalides',
      text: 'Veuillez remplir tous les champs correctement avant de soumettre.',
      confirmButtonText: 'OK'
    });
  }
}

}

