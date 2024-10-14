import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AnnonceService } from '../../../Services/annonce.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajout-annonce',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './ajout-annonce.component.html',
  styleUrl: './ajout-annonce.component.css'
})
export class AjoutAnnonceComponent {
  annonceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private annonceService: AnnonceService,
    private router: Router
  ) {
    this.annonceForm = this.fb.group({
      titre: ['', Validators.required],
      type_annonce: ['', Validators.required],
      nom_lieu: ['', Validators.required],
      adresse_lieu: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      heure_debut: ['', Validators.required],
      heure_fin: ['', Validators.required],
      groupe_sanguin_requis: ['', Validators.required],
      nombre_poches_vise: ['', Validators.required],
      description: ['', Validators.required],
      contact_responsable: ['', Validators.required],
     
    });
  }

  onSubmit() {
    if (this.annonceForm.valid) {
      console.log('Valeurs du formulaire:', this.annonceForm.value);  // Vérifier les données du formulaire
      this.annonceService.createAnnonce(this.annonceForm.value).subscribe((response) => {
        console.log('Annonce ajoutée avec succès', response);
        this.router.navigate(['/sidebar1/annonce']);  // Rediriger vers la liste des structures
      },
    );
    
  }

}

}
