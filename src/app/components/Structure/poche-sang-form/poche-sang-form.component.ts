import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PocheSangService } from '../../../Services/poche-sang.service';
import { BanqueSangService } from '../../../Services/banque-sang.service';
import { CommonModule } from '@angular/common';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { DonneurExterneService } from '../../../Services/donneur-externe.service';

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
  donneursExternes: any[] = []; // Remplacez any par votre type de données approprié
  rendezVousList!: number // Remplacez any par votre type de données approprié
  isEditMode: boolean = false;
  donneurExterneId!: number;
  pocheId!: number;
  

  constructor(
    private fb: FormBuilder,
    private pocheSangService: PocheSangService,
    private banqueSangService: BanqueSangService,
    private donneurExterneService: DonneurExterneService,
    private rendezVousService: RendezVousService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pocheSangForm = this.fb.group({
      //numero_poche: ['', Validators.required],
      groupe_sanguin: ['', Validators.required],
      date_prelevement: ['', Validators.required],
      banque_sang_id: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      date_naiss: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      profession: ['', Validators.required],
      rendez_vouse_id: [''],
      donneur_externe_id: [''] // Champ caché pour stocker l'ID du donneur externe  
    });
  }

  ngOnInit() {
    this.loadBanquesSang();
    this.loadDonneursExternes();
    //this.loadRendezVous();

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
  loadDonneursExternes() {
    // Appelez votre service pour récupérer les donneurs externes
    this.donneurExterneService.getDonneurExternes().subscribe((data) => {
      this.donneursExternes = data; // Assurez-vous que les données sont au bon format
    });
  }

 /* loadRendezVous() {
    // Appelez votre service pour récupérer les rendez-vous
    this.rendezVousService.getRendezVouss().subscribe((data) => {
      this.rendezVousList = data; // Assurez-vous que les données sont au bon format
    });
  }*/

  loadPocheSang(id: number) {
    this.pocheSangService.getPocheById(id).subscribe((data: any) => {
    /*if (data.donneur_externe_id) { // Vérifiez si donneur_externe_id est bien présent
      this.donneurExterneId = data.donneur_externe_id;*/
      this.pocheSangForm.patchValue({
        nom: data.donneur_externe.nom,
        prenom: data.donneur_externe.prenom,
        telephone: data.donneur_externe.telephone,
        adresse: data.donneur_externe.adresse,
        sexe: data.donneur_externe.sexe === 'M' ? 'M' : 'F',
        date_naiss: data.donneur_externe.date_naiss,
        profession: data.donneur_externe.profession,
        groupe_sanguin: data.groupe_sanguin,
        date_prelevement: data.date_prelevement,
        banque_sang_id: data.banque_sang_id,
        rendez_vouse_id: data.rendez_vouse_id,
        donneur_externe_id: data.donneur_externe_id // Remplir le champ avec la valeur du backend
      });
    /*} else {
      console.error("Erreur : donneur_externe_id n'est pas présent dans la réponse du backend.");
    }*/
  });
}
  onSubmit() {
    if (this.pocheSangForm.valid) {
      const formValue = this.pocheSangForm.value;
        console.log('Form Value:', formValue); // Ajoutez ce log pour déboguer
      if (this.isEditMode) {
        this.pocheSangService.updatePoche(this.pocheId, formValue).subscribe(() => {
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