import { UsersService } from '../../services/usersServices/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { defineLocale, frLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService, BsDatepickerConfig } from 'ngx-bootstrap';
import { BsDatepickerViewMode } from 'ngx-bootstrap/datepicker/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-document',
  templateUrl: './demande-document.component.html',
  styleUrls: ['./demande-document.component.css']
})
export class DemandeDocumentComponent implements OnInit {
  @Input() showLoading = false;
  dateencour: string;

  // *********declarer un boolean pour controler submit formulaire
  submitted = false;
  id: string;
  // **********definir la langue de datepicker ngxbootstrap
  locale = 'fr';
  selected: '';
  madate: Date;
  // *********declarer lid de task a completer
  // taskid: string;
  // *********declarer les variables seront recu de formulaire
  private codecnrps: string;
  private prenom: string;
  private nom: string;
  private structure: string;
  private email: string;
  private lalanguedudocumentdemandee: string;
  private date;
  private annee: string;
  private mois: number;
  private moisLettre: string;
  private remarque: string;
  // *********declarer un form reactive de type formgroup pour faire demande document
  demandeDocument: FormGroup;

  // *********declarer objetform json
  objetForm: {};
  // declarer un objet taskactive
  taskactive: any[];
  minMode: BsDatepickerViewMode = 'month';
  bsConfig: Partial<BsDatepickerConfig>;
  taskactid: string;
  processinstId: string;
  constructor(
    private localeService: BsLocaleService,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
  ) {
    defineLocale('fr', frLocale);
  }

  ngOnInit() {
    this.localeService.use(this.locale);
    this.initialiseDatepicker();
    this.initForm();
  }

  initialiseDatepicker() {
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode,
      dateInputFormat: 'MM/YYYY'
    });
  }

  onValueChange(value: Date): void {
    this.madate = value;
  }

  // validateur de formulaire demande Document s'applique si existe formControlName="namess"
  initForm() {
    this.demandeDocument = this.formBuilder.group({
      codecnrps: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      structure: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      remarque: ['', Validators.required],
      lalanguedudocumentdemandee: ['', Validators.required],
    });
    // set value input form fonctionne bien
    // get current users connected
    let curuser = localStorage.getItem('currentUser');
    curuser = JSON.parse(curuser);
    console.log(curuser);
    // tslint:disable-next-line: no-string-literal
    this.demandeDocument.get('codecnrps').setValue(curuser['id']);
    // tslint:disable-next-line: no-string-literal
    this.demandeDocument.get('prenom').setValue(curuser['firstName']);
    // tslint:disable-next-line: no-string-literal
    this.demandeDocument.get('nom').setValue(curuser['lastName']);
    // tslint:disable-next-line: no-string-literal
    this.demandeDocument.get('email').setValue(curuser['email']);
  }

  // *****Simple getter pour acceder au variable formulaire
  get f() {
    return this.demandeDocument.controls;
  }

  // methode Ajouter un Demande document
  onAjoutDemande() {
    // loadinnnnnggggg
    this.showLoading = true;
    this.codecnrps = this.demandeDocument.get('codecnrps').value;
    this.prenom = this.demandeDocument.get('prenom').value;
    this.nom = this.demandeDocument.get('nom').value;
    this.structure = this.demandeDocument.get('structure').value;
    this.email = this.demandeDocument.get('email').value;
    this.lalanguedudocumentdemandee = this.demandeDocument.get('lalanguedudocumentdemandee').value;
    this.mois = this.madate.getMonth() + 1;
    // determiner le mois d'aprés son valeur recu de formulaire
    switch (this.mois) {
      case 1: {
        this.moisLettre = 'Janvier';
        break;
      }
      case 2: {
        this.moisLettre = 'Février';
        break;
      }
      case 3: {
        this.moisLettre = 'Mars';
        break;
      }
      case 4: {
        this.moisLettre = 'Avril';
        break;
      }
      case 5: {
        this.moisLettre = 'Mai';
        break;
      }
      case 6: {
        this.moisLettre = 'Juin';
        break;
      }
      case 7: {
        this.moisLettre = 'Juillet';
        break;
      }
      case 8: {
        this.moisLettre = 'Août';
        break;
      }
      case 9: {
        this.moisLettre = 'Septembre';
        break;
      }
      case 10: {
        this.moisLettre = 'Octobre';
        break;
      }
      case 11: {
        this.moisLettre = 'Novembre ';
        break;
      }
      case 12: {
        this.moisLettre = 'Décembre';
        break;
      }
    }
    this.annee = this.madate.getUTCFullYear().toString();
    this.remarque = this.demandeDocument.get('remarque').value;
    // **************demarrer un process
    this.userService.demarrerProcess().subscribe(dataproc => {
      // tslint:disable-next-line: no-string-literal
      this.processinstId = (dataproc['id']);
      // tester task avec processinstanceid
      this.userService.onGetTaskstoComplete().subscribe(datatask => {
        // tslint:disable-next-line: no-string-literal
        this.taskactive = datatask['data'];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.taskactive.length; i++) {

          if (this.taskactive[i].processInstanceId === this.processinstId) {
            this.taskactid = this.taskactive[i].id;
            // console.log(this.taskactive[i].id);
            console.log(this.taskactid);
          }
        }
        // 2 eme POST apres recuperation donné
        console.log('valeur taskactid');
        console.log(this.taskactid);
        this.objetForm = {
          taskId: this.taskactid,
          properties: [
            {
              id: 'codecnrps',
              name: 'Code CNRPS',
              type: 'string',
              value: this.codecnrps
            },
            {
              id: 'prenom',
              name: 'Prenom',
              type: 'string',
              value: this.prenom
            },
            {
              id: 'nom',
              name: 'Nom',
              type: 'string',
              value: this.nom
            },
            {
              id: 'structure',
              name: 'Structure',
              type: 'string',
              value: this.structure
            },
            {
              id: 'email',
              name: 'Email',
              type: 'string',
              value: this.email
            },
            {
              id: 'lalanguedudocumentdemandee',
              name: 'La langue du document demandee',
              type: 'string',
              value: this.lalanguedudocumentdemandee

            },
            {
              id: 'annee',
              name: 'Annee',
              type: 'string',
              value: this.annee
            },
            {
              id: 'mois',
              name: 'Mois',
              type: 'string',
              value: this.moisLettre
            },
            {
              id: 'remarque',
              name: 'Remarque',
              type: 'string',
              value: this.remarque
            }
          ]
        };
        //
        console.log('test objet form');
        console.log(this.objetForm);
        this.submitted = true;
        // stop here if form is invalid
        if (this.demandeDocument.invalid) {
          return;
        }
        // 3eme post remplir formul
        this.userService.completeFormDemFP(this.objetForm)
          .subscribe(data => {
            alert('Demande created successfully.');
            this.router.navigate(['/users']);
          }, error => {
            // console.log(error);
            // alert('erreur de connexion');
          });
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.demandeDocument.value));
      },
        err => {
          alert('impossible de determiner votre demande');
          this.showLoading = true;
        });
    }, // fermer demarrer process
      err => {
        console.log('Error occured');
        alert('erreur de connexion');
      });
  }
}
