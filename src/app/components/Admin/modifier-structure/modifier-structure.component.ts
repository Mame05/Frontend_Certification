import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StructureService } from '../../../Services/structure.service';

@Component({
  selector: 'app-modifier-structure',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
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
      nom_structure: ['', Validators.required],
      sigle: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      region: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
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
      this.structureService.updateStructure(this.structureId, this.structureForm.value).subscribe(() => {
        this.router.navigate(['/sidebar/structure']);  // Rediriger vers la liste des structures
      });
    }
  }

}
