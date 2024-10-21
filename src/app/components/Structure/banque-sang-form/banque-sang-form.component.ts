import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BanqueSangService } from '../../../Services/banque-sang.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-banque-sang-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './banque-sang-form.component.html',
  styleUrl: './banque-sang-form.component.css'
})
export class BanqueSangFormComponent implements OnInit {
  banqueForm!: FormGroup;
  isEditMode = false;
  banqueId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private banqueSangService: BanqueSangService
  ) { }

  ngOnInit() {
    this.banqueForm = this.fb.group({
      matricule: ['', Validators.required],
      stock_actuelle: ['', [Validators.required, Validators.min(0)]],
      date_mise_a_jour: ['', Validators.required]
    });

    // Vérifier si on est en mode modification
    this.banqueId = this.route.snapshot.params['id'];
    if (this.banqueId) {
      this.isEditMode = true;
      this.banqueSangService.getBanqueById(this.banqueId).subscribe(banque => {
        this.banqueForm.patchValue(banque);
      });
    }
  }

  onSubmit() {
    if (this.banqueForm.valid) {
      if (this.isEditMode) {
        // Modifier une banque existante
        this.banqueSangService.updateBanque(this.banqueId, this.banqueForm.value).subscribe(response => {
          this.router.navigate(['/sidebar1/banque-sang']);
        });
      } else {
        // Ajouter une nouvelle banque
        this.banqueSangService.createBanque(this.banqueForm.value).subscribe(response => {
          this.router.navigate(['/sidebar1/banque-sang']);
        });
      }
    }
  }

}
