import { FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/usersServices/users.service';
import { BsDatepickerViewMode } from 'ngx-bootstrap/datepicker/models';
import { BsDatepickerConfig, formatDate } from 'ngx-bootstrap';
import { defineLocale, frLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-tache-rectifier',
  templateUrl: './tache-rectifier.component.html',
  styleUrls: ['./tache-rectifier.component.css']
})
export class TacheRectifierComponent implements OnInit {

  constructor(private activeroute: ActivatedRoute,
              private userService: UsersService,
              private route: Router,
              private formBuilder: FormBuilder) {
    defineLocale('fr', frLocale);
  }

  private formCorrectionId = 'd817f737-0280-11ea-9486-422cf40ca6b6';
  private idtachrect: string;
  private objetHeaderFormCorrection;
  private moisenChiffre: number;
  private moisLettre: string;
  private mois: number;
  private annee;
  bsValue: Date;
  private madate: Date;
  private fields: any[];
  valueCodecnrps: string;
  valuePrenom: string;
  valueNom: string;
  valueStructure: string;
  valueEmail: string;
  valueLangue: string;
  valueAnnee: string;
  valueMois: string;
  valueRemarque: string;
  valueCommentaire: string;
  // config datepicker
  minMode: BsDatepickerViewMode = 'month';
  bsConfig: Partial<BsDatepickerConfig>;
  // declarer les options de form select langue dcument
  langues = ['Francais', 'Anglais', 'Arabe'];

  ngOnInit() {
    this.onGetFormTacheRectifier();
    this.initialiseDatepicker();

  }

  // initialise datepicker
  initialiseDatepicker() {
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode,
      dateInputFormat: 'yyyy-MM'
    });
  }
  // recupere date datepicker si changer
  onValueChange(value: Date): void {
    this.madate = value;
  }

  // methode get formulaire tache rectifier
  onGetFormTacheRectifier() {
    const idTachRectifier = localStorage.getItem('idTachRectId');
    this.idtachrect = idTachRectifier;
    // console.log("idTachRectifier component ");
    // console.log(idTachRectifier);
    this.userService.onGetformCorrection(this.idtachrect).subscribe(dataform => {
      // tslint:disable-next-line: no-string-literal
      this.fields = dataform['fields'];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.fields.length; i++) {
        const element = this.fields[i];
        if (element.id === 'codecnrps') {
          this.valueCodecnrps = element.value;
        }
        if (element.id === 'prenom') {
          this.valuePrenom = element.value;
        }
        if (element.id === 'nom') {
          this.valueNom = element.value;
        }
        if (element.id === 'structure') {
          this.valueStructure = element.value;
        }
        if (element.id === 'email') {
          this.valueEmail = element.value;
        }
        if (element.id === 'lalanguedudocumentdemandee') {
          this.valueLangue = element.value;
        }
        if (element.id === 'annee') {
          this.valueAnnee = element.value;
        }
        if (element.id === 'mois') {
          this.valueMois = element.value;
          // changer mois en chiffre
          // initialiser date avec valeur recuperer
          // determiner le mois d'aprés son valeur recu de formulaire
          switch (this.valueMois) {
            case 'Janvier': {
              this.moisenChiffre = 1;
              break;
            }
            case 'Février': {
              this.moisenChiffre = 2;
              break;
            }
            case 'Mars': {
              this.moisenChiffre = 3;
              break;
            }
            case 'Avril': {
              this.moisenChiffre = 4;
              break;
            }
            case 'Mai': {
              this.moisenChiffre = 5;
              break;
            }
            case 'Juin': {
              this.moisenChiffre = 6;
              break;
            }
            case 'Juillet': {
              this.moisenChiffre = 7;
              break;
            }
            case 'Août': {
              this.moisenChiffre = 8;
              break;
            }
            case 'Septembre': {
              this.moisenChiffre = 9;
              break;
            }
            case 'Octobre': {
              this.moisenChiffre = 10;
              break;
            }
            case 'Novembre': {
              this.moisenChiffre = 11;
              break;
            }
            case 'Décembre': {
              this.moisenChiffre = 12;
              break;
            }
          }
          this.bsValue = new Date(this.valueAnnee + '-' + this.moisenChiffre);
        }
        if (element.id === 'remarque') {
          this.valueRemarque = element.value;
        }
        if (element.id === 'commentaire') {
          this.valueCommentaire = element.value;
        }
      }
    });
  }

  onRectifierDemande() {
    // this.annee = this.madate.getUTCFullYear().toString();
    this.annee = this.madate.getFullYear();
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
    this.objetHeaderFormCorrection = {
        values:
        {
          lalanguedudocumentdemandee: this.valueLangue,
          annee: this.annee, mois: this.moisLettre
        },
        formId: this.formCorrectionId,
        outcome: 'Corriger'
      };

    this.userService.enVoyerFormCorriger(this.idtachrect, this.objetHeaderFormCorrection).subscribe(response => {
      const rectifHome = '2';
      localStorage.setItem('rectifhome', rectifHome);
      this.route.navigateByUrl('/users');

    }, err => {
      alert('erreur enregistrement');
      console.log(err);
    });
  }

  // methode navigation vers accueil home
  onGetAccueilUser() {
    const rectifHome = '2';
    localStorage.setItem('rectifhome', rectifHome);
    this.route.navigateByUrl('/users');
  }
}
