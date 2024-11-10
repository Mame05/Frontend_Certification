import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnnonceService } from '../../../Services/annonce.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifier-annonce',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
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

    const today = new Date();
    const oneYearLater = new Date();
    oneYearLater.setFullYear(today.getFullYear() + 1);

    this.annonceForm = this.fb.group({
     titre: ['',[Validators.required,  Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ '-]*$/)]],
      type_annonce: ['', Validators.required],
      nom_lieu: ['',[Validators.required, Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ0-9 ,.'-]*$/)]],
      adresse_lieu: ['',[Validators.required, Validators.pattern(/^[A-ZÀ-Ÿ][A-Za-zÀ-ÿ0-9 ,.'-]*$/)]],
      date_debut: ['',[Validators.required, this.dateValidator(today, oneYearLater)]],
      date_fin: ['', Validators.required],
      heure_debut: ['', [Validators.required, this.timeDebutValidator]],
      heure_fin: ['',[Validators.required, this.timeFinValidator]],
      groupe_sanguin_requis: ['', Validators.required],
      nombre_poches_vise: ['',[Validators.required, Validators.min(4), Validators.max(1000)]],
      description: ['',  [Validators.required, Validators.minLength(15), Validators.maxLength(500)]],
      contact_responsable: ['', [Validators.required, Validators.pattern(/^(77|78|76|75|70)\s?\d{3}\s?\d{2}\s?\d{2}$/)]],
     
    });
    // Appliquer la validation `dateFinValidator` au champ `date_fin`
  this.annonceForm.get('date_fin')?.setValidators(this.dateFinValidator(this.annonceForm));
  }
  // Validation de la date de début (pas dans le passé et pas plus d'un an à partir de la date actuelle)
  dateValidator(minDate: Date, maxDate: Date) {
    return (control: any) => {
      const date = new Date(control.value);
      if (date < minDate) {
        return { dateInThePast: true };
      } else if (date > maxDate) {
        return { dateTooFar: true };
      }
      return null;
    };
  }

  // Validation de la date de fin (doit être après la date de début et pas plus de 7 jours après)
  dateFinValidator(annonceForm: FormGroup) {
    return (control: any) => {
      const dateDebut = annonceForm.get('date_debut')?.value;
      const dateFin = new Date(control.value);
      if (dateDebut) {
        const dateDebutParsed = new Date(dateDebut);
        const diffTime = dateFin.getTime() - dateDebutParsed.getTime();
        if (dateFin <= dateDebutParsed) {
          return { dateFinBeforeDebut: true };
        } else if (diffTime > 7 * 24 * 60 * 60 * 1000) { // Différence en millisecondes pour 7 jours
          return { dateDiffTooLong: true };
        }
      }
      return null;
    };
  }

  // Validation de l'heure de début (doit être entre 08h00 et 11h00)
  timeDebutValidator(control: any) {
    const heure = control.value;
    if (heure) {
      const [hour, minute] = heure.split(':').map((val: any) => parseInt(val, 10));
      if (hour < 8 || hour > 11 || (hour === 11 && minute > 0)) {
        return { invalidHeureDebut: true };
      }
    }
    return null;
  }

  // Validation de l'heure de fin (doit être entre 16h00 et 19h00)
  timeFinValidator(control: any) {
    const heure = control.value;
    if (heure) {
      const [hour, minute] = heure.split(':').map((val: any) => parseInt(val, 10));
      if (hour < 16 || hour > 19 || (hour === 19 && minute > 0)) {
        return { invalidHeureFin: true };
      }
    }
    return null;
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
