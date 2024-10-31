import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { BanqueSangService } from '../../../Services/banque-sang.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PocheSangService } from '../../../Services/poche-sang.service';

@Component({
  selector: 'app-update-poche-rendez-vous',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './update-poche-rendez-vous.component.html',
  styleUrl: './update-poche-rendez-vous.component.css'
})
export class UpdatePocheRendezVousComponent implements OnInit {
  etat: boolean = false;
  groupeSanguin: string = '';
  datePrelevement: string = '';
  banqueSangId: number = 0;
  pocheId: number = 0;
  rendezVousId: number = 0; // Assurez-

  constructor(
    private fb: FormBuilder,
    private rendezVousService: RendezVousService,
    private banqueSangService: BanqueSangService,
    private pocheSangService: PocheSangService,
    private route: ActivatedRoute,
    private router: Router
  ) {};
  ngOnInit(): void {
    this.pocheId = +this.route.snapshot.paramMap.get('id')!;
    // Charger les données de la poche sanguine
    this.rendezVousService.getPocheById(this.pocheId).subscribe(
      (response:any) => {
        this.groupeSanguin = response.groupe_sanguin;
        this.datePrelevement = response.date_prelevement;
        this.banqueSangId = response.banque_sang_id;
        // Vous pouvez également définir l'état ici si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la récupération des données de la poche:', error);
      }
    );
  }
  
  handleUpdatePoche() {
    const data = {
      groupe_sanguin: this.groupeSanguin,
      date_prelevement: this.datePrelevement,
      banque_sang_id: this.banqueSangId,
    };

    this.rendezVousService.updatePocheUS(this.pocheId, data).subscribe(
      (response) => {
        console.log('Mise à jour de la poche réussie:', response);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la poche:', error);
      }
    );
  }

}
