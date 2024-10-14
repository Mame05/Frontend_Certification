import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnnonceService } from '../../../Services/annonce.service';

@Component({
  selector: 'app-modifier-annonce',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './modifier-annonce.component.html',
  styleUrl: './modifier-annonce.component.css'
})
export class ModifierAnnonceComponent implements OnInit {
  annonceForm: FormGroup;
  annonceId?: number;

  constructor(
    private fb: FormBuilder,
    private annonceService: AnnonceService,
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.annonceId = +params['id'];
      if (this.annonceId) {
        this.annonceService.getAnnonce(this.annonceId).subscribe({
          next: (annonce) => this.annonceForm.patchValue(annonce),
          error: (err) => console.error(err)
        });
      }
    }); 
  }

  onSubmit() {
    if (this.annonceForm.valid && this.annonceId) {
      this.annonceService.updateAnnonce(this.annonceId, this.annonceForm.value).subscribe(() => {
        this.router.navigate(['/sidebar1/annonce']);  // Rediriger vers la liste des annonces
      });
    }
  }
}
