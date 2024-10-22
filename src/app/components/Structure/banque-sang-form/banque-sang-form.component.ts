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
  isEditMode:boolean = false;
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
      stock_actuelle: [{ value: '', disabled: true }],
      date_mise_a_jour: [{ value: '', disabled: true }]
    });

    // Vérifier si on est en mode modification
    this.banqueId = this.route.snapshot.params['id'];
    if (this.banqueId) {
      this.isEditMode = true;
      this.banqueSangService.getBanqueById(this.banqueId).subscribe(banque => {
        this.banqueForm.patchValue(banque);
      });
    }
  

   // Vérifier si on est en mode modification
   this.banqueId = this.route.snapshot.params['id'];
   if (this.banqueId) {
     this.isEditMode = true;
     this.banqueSangService.getBanqueById(this.banqueId).subscribe(banque => {
       this.banqueForm.patchValue(banque);
       // Lors de la modification, désactiver stock_actuelle et date_mise_a_jour
       this.banqueForm.get('stock_actuelle')?.disable();
       this.banqueForm.get('date_mise_a_jour')?.disable();
     });
   }
 }


 onSubmit() {
   if (this.banqueForm.valid) {
     const formData = { ...this.banqueForm.value };
     
     // S'assurer que les champs non utilisés ne sont pas envoyés
     formData.stock_actuelle = null; // Toujours envoyer null pour stock_actuelle
     formData.date_mise_a_jour = null; // Toujours envoyer null pour date_mise_a_jour

     if (this.isEditMode) {
       // Modifier une banque existante
       this.banqueSangService.updateBanque(this.banqueId, { matricule: formData.matricule }).subscribe(response => {
         this.router.navigate(['/sidebar1/banque-sang']);
       });
     } else {
       // Ajouter une nouvelle banque
       this.banqueSangService.createBanque(formData).subscribe(response => {
         this.router.navigate(['/sidebar1/banque-sang']);
       });
     }
   }
 }

}
