import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StructureService } from '../../../Services/structure.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modifier-structure',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './modifier-structure.component.html',
  styleUrl: './modifier-structure.component.css'
})
export class ModifierStructureComponent implements OnInit {
  structureForm: FormGroup;
  structureId?: number;

  constructor(
    private fb: FormBuilder,
    private structureService: StructureService,
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.structureId = +params['id'];
      if (this.structureId) {
        this.structureService.getStructure(this.structureId).subscribe({
          next: (structure) => this.structureForm.patchValue(structure),
          error: (err) => console.error(err)
        });
      }
    });
  }

  onSubmit() {
    if (this.structureForm.valid && this.structureId) {
      this.structureService.updateStructure(this.structureId, this.structureForm.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'La structure a été modifiée avec succès !',
            showConfirmButton: false,
            timer: 3000// Ferme l'alerte après 3 secondes
          }).then(() => {
        this.router.navigate(['/sidebar/structure']);  // Rediriger vers la liste des structures
      });
    },
    error: (err) => {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de la modification de la structure.',
        confirmButtonText: 'OK'
      });
    }
  });
} else {
  Swal.fire({
    icon: 'warning',
    title: 'Formulaire invalide',
    text: 'Veuillez remplir correctement tous les champs.',
    confirmButtonText: 'OK'
  });
}
}
}
