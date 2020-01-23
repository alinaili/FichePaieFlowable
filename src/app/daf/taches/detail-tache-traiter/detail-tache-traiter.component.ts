import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { DafService } from 'src/app/services/dafServices/daf.service';

@Component({
  selector: 'app-detail-tache-traiter',
  templateUrl: './detail-tache-traiter.component.html',
  styleUrls: ['./detail-tache-traiter.component.css']
})
export class DetailTacheTraiterComponent implements OnInit {
  // declaration variables
  private dettaskid: string;
  @Input() refuser: boolean;
  @Input() valider: boolean;
  @Input() valueCodecnrps: string;
  @Input() valuePrenom: string;
  @Input() valueNom: string;
  @Input() valueStructure: string;
  @Input() valueEmail: string;
  @Input() valueLangue: string;
  @Input() valueAnnee: string;
  @Input() valueMois: string;
  @Input() valueRemarque: string;
  @Input() valueCommentaire: string;
  // @Input() value_created: Date;
  forms = [];

  constructor(private dafService: DafService, private router: Router) { }

  ngOnInit() {
    const dettaskrefus = localStorage.getItem('detailtachrefuser');
    console.log('dettaskrefus');
    console.log(dettaskrefus);
    const dettaskvalid = localStorage.getItem('detailtachvalider');
    console.log('dettaskvalid');
    console.log(dettaskvalid);
    if (dettaskrefus != null) {
      this.refuser = true;
      this.valider = false;
      this.dettaskid = dettaskrefus;
    }
    if (dettaskvalid != null) {
      this.valider = true;
      this.refuser = false;
      this.dettaskid = dettaskvalid;
    }
    this.onGetDetailforms();
  }

   // methode recuperer detail formulaire lié a un task avec id
   onGetDetailforms() {
     console.log('this.refuser');
     console.log(this.refuser);
     console.log('this.valider');
     console.log(this.valider);

    // let dettaskid = localStorage.getItem('detailtachrefuser');
     console.log(this.dettaskid);
     this.dafService.onGetformValidation(this.dettaskid).subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.forms = data['fields'];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.forms.length; i++) {
        const element = this.forms[i];
        if (this.forms[i].id === 'codecnrps') {
          this.valueCodecnrps = this.forms[i].value;
        }
        if (this.forms[i].id === 'prenom') {
          this.valuePrenom = this.forms[i].value;
        }
        if (this.forms[i].id === 'nom') {
          this.valueNom = this.forms[i].value;
        }
        if (this.forms[i].id === 'structure') {
          this.valueStructure = this.forms[i].value;
        }
        if (this.forms[i].id === 'email') {
          this.valueEmail = this.forms[i].value;
        }
        if (this.forms[i].id === 'lalanguedudocumentdemandee') {
          this.valueLangue = this.forms[i].value;
        }
        if (this.forms[i].id === 'annee') {
          this.valueAnnee = this.forms[i].value;
        }
        if (this.forms[i].id === 'mois') {
          this.valueMois = this.forms[i].value;
        }
        if (this.forms[i].id === 'remarque') {
          this.valueRemarque = this.forms[i].value;
        }
        if (this.forms[i].id === 'commentaire') {
          this.valueCommentaire = this.forms[i].value;
        }
      }
    }, err => {
      console.log('error ....');
      console.log(err);
    });
  }

  // methode retour au liste des taches terminées
  onGetAccueillistesterm() {
    const accueilliste = '1';
    localStorage.setItem('homelisttrait', accueilliste);
    this.router.navigateByUrl('/assistants');
  }

}
