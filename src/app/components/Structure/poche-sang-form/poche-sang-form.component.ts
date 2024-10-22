import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PocheSangService } from '../../../Services/poche-sang.service';
import { BanqueSangService } from '../../../Services/banque-sang.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poche-sang-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './poche-sang-form.component.html',
  styleUrl: './poche-sang-form.component.css'
})
export class PocheSangFormComponent implements OnInit{
  pocheSangForm: FormGroup;
  banquesSang: any[] = [];
  isEditMode: boolean = false;
  pocheId!: number;

  constructor(
    private fb: FormBuilder,
    private pocheSangService: PocheSangService,
    private banqueSangService: BanqueSangService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pocheSangForm = this.fb.group({
      numero_poche: ['', Validators.required],
      groupe_sanguin: ['', Validators.required],
      date_prelevement: ['', Validators.required],
      banque_sang_id: ['', Validators.required]  
    });
  }

  ngOnInit() {
    this.loadBanquesSang();

    // Vérifier si nous sommes en mode édition
    this.pocheId = this.route.snapshot.params['id'];
    if (this.pocheId) {
      this.isEditMode = true;
      this.loadPocheSang(this.pocheId);
    }
  }

  loadBanquesSang() {
    // Appel au service pour récupérer les banques de sang associées à l'utilisateur
    this.banqueSangService.getBanques().subscribe((data) => {
      this.banquesSang = data;
    });
  }

  loadPocheSang(id: number) {
    this.pocheSangService.getPocheById(id).subscribe((data: any) => {
      
      // Si 'data' est un objet
      this.pocheSangForm.patchValue({
        numero_poche: data.numero_poche,
        groupe_sanguin: data.groupe_sanguin,
        date_prelevement: data.date_prelevement,
        banque_sang_id: data.banque_sang_id 
      });
    });
  }

  onSubmit() {
    if (this.pocheSangForm.valid) {
      if (this.isEditMode) {
        this.pocheSangService.updatePoche(this.pocheId, this.pocheSangForm.value).subscribe(() => {
          this.router.navigate(['/sidebar1/poche-sang']);
        });
      } else {
        this.pocheSangService.createPoche(this.pocheSangForm.value).subscribe(() => {
          this.router.navigate(['/sidebar1/poche-sang']);
        });
      }
    }
  }
}
