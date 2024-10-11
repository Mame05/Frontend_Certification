import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StructureService } from '../../../Services/structure.service';


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
      nom_structure: ['', Validators.required],
      sigle: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      region: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.structureForm.valid) {
      console.log(this.structureForm.value);  // Vérifier les données du formulaire
      this.structureService.createStructure(this.structureForm.value).subscribe((response) => {
        console.log('Structure ajoutée avec succès', response);
        this.router.navigate(['/sidebar/structure']);  // Rediriger vers la liste des structures
      },
      
    );
    
  }

}
}
