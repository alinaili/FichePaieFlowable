import { DafService } from './../../../services/dafServices/daf.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { FichePaieService } from 'src/app/services/fiche-paie.service';
import { MailnodemailService } from 'src/app/services/mailnodemail.service';
import * as FileSaver from 'file-saver';
import { ConfirmationDialogComponent } from 'src/app/users/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-detail-tache',
  templateUrl: './detail-tache.component.html',
  styleUrls: ['./detail-tache.component.css']
})
export class DetailTacheComponent implements OnInit {
  // declaration ID de formulaire de validation
  formValidationid = 'd817f738-0280-11ea-9486-422cf40ca6b6';
  validateur = localStorage.getItem('log');
  @Input() showLoading = false;
  // declaration variable commentaire ngmodel
  commentaire: string;
  // declaration objet de refuser demande transmis avec url
  monObjetRefus: {};
  // declaration objet de validation demande transmis avec url
  monObjetValid: {};
  // declaration objet de claim transmis avec url de soutenir demande autaumatique
  objetClaim =
    {
      action: 'claim',
      assignee: this.validateur
    };
  // declaration objet mail
  content: {};

  private tasks;
  private forms: any[];
  private codecnrps: string;
  private prenom: string;
  private nom: string;
  private structure: string;
  private email: string;
  private lalanguedudocumentdemandee: string;
  private annee: string;
  private mois: string;
  private remarque: string;
  // commentaire: string;
  @Input() valueCodecnrps: string;
  @Input() valuePrenom: string;
  @Input() valueNom: string;
  @Input() valueStructure: string;
  @Input() valueEmail: string;
  @Input() valueLangue: string;
  @Input() valueAnnee: string;
  @Input() valueMois: string;
  @Input() valueRemarque: string;
  @Input() valueCreated: Date;

  constructor(private dafService: DafService,
              private fichepaieservice: FichePaieService,
              private router: Router,
              private nodemailer: MailnodemailService,
              public dialog: MatDialog) { }

  // traiterDemande: FormGroup;

  ngOnInit() {
    this.OnGetDetailTask();
    this.onGetDetailforms();
  }

  // methode recuperer detail formulaire lié a un task avec id
  onGetDetailforms() {
    const dettaskid = localStorage.getItem('detailTaskId');
    console.log(dettaskid);
    this.dafService.onGetformValidation(dettaskid).subscribe(data => {
      // this.forms = data.fields;
      // tslint:disable-next-line: no-string-literal
      this.forms = data['fields'];
      // recupere les variables de forms
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.forms.length; i++) {
        // const element = this.forms[i];
        // console.log(element);
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

      }

    }, err => {
      console.log('error ....');
      console.log(err);
    });
  }

  // methode retourne le detail dun task avec id
  OnGetDetailTask() {
    const dettaskid = localStorage.getItem('detailTaskId');
    this.dafService.onGetDetailTask(dettaskid).subscribe(datadetail => {
      this.tasks = [datadetail];
      // this.valueCreated = datadetail.created;
      // tslint:disable-next-line: no-string-literal
      this.valueCreated = datadetail['created'];
    });
  }
  // methode de refus
  onRefuseDemande() {
    // loading
    this.showLoading = true;
    const dettaskid = localStorage.getItem('detailTaskId');
    this.dafService.onClaimDemande(dettaskid, this.objetClaim).subscribe(dat => {

      // declaration objet de validation demande transmis avec url
      this.monObjetRefus = {
        values: {
          commentaire: this.commentaire,
          validerrefuser : 'refuser'
        },
        formId: this.formValidationid,
        outcome: 'Refuser'
      };

      this.dafService.onRefuseDemande(dettaskid, this.monObjetRefus).subscribe(dataref => {

        this.router.navigateByUrl('assistants');
      },
        err => {
          console.log('Error occured');
          alert('impossible de determiner votre tache');
        });
    },
      err => {
        console.log('Error occured');
        alert('impossible de determiner votre tache');
        this.showLoading = false;
      });
  }
  // methode validation demande
  onValideDemande() {

  }

  // methode genere pdf
  onGenerePDF() {
    // loading
    this.showLoading = true;
    this.fichepaieservice.getpaie(this.valueCodecnrps, this.valueAnnee, this.valueMois).subscribe(
      (res) => {

        // si fiche existante on valide demande
        if (res) {
          // validation demande
          const dettaskid = localStorage.getItem('detailTaskId');
          this.dafService.onClaimDemande(dettaskid, this.objetClaim).subscribe(dat => {
            this.monObjetValid = {
              values: {
                commentaire: this.commentaire,
                validerrefuser : 'valider'
              },
              formId: this.formValidationid,
              outcome: 'Valider'
            };
            this.dafService.onValideDemande(dettaskid, this.monObjetValid).subscribe(dataref => {

              // envoi mail
              // envoi mail de notification demandeur
              // declare variable date now
              const format = 'EEEE dd/MM/yyyy HH:mm';
              const myDate = Date.now();
              const locale = 'fr-FR';
              const datenow = formatDate(myDate, format, locale);
              this.content = {
                email: this.valueEmail,
                date: datenow
              };
              this.nodemailer.envoiMail(this.content).subscribe(send => {

                alert('Demande Validée....Mail de notification est envoyé au demandeur');
                this.router.navigateByUrl('assistants');
                // ouvrir fichier pdf
                FileSaver.saveAs(res, 'FichePaie_' + this.valueMois + this.valueAnnee + '.pdf');
                // let file = new Blob([res], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(res);
                window.open(fileURL);

              },
                error => {
                  // console.log('Error occured');
                  // alert('erreur de connexion serveur Mail');
                  alert('error serveur notification Mail!!!!!!....');
                  this.router.navigateByUrl('assistants');
                  // ouvrir fichier pdf meme erreur notification mail
                  FileSaver.saveAs(res, 'FichePaie_' + this.valueMois + this.valueAnnee + '.pdf');
                  // let file = new Blob([res], { type: 'application/pdf' });
                  const fileURL = URL.createObjectURL(res);
                  window.open(fileURL);
                });
              // this.notifMail();
            },
              err => {
                console.log('Error occured');
                alert('impossible de determiner votre tache de Validation');
              });
          },
            err => {
              console.log('Error occured');
              alert('impossible de determiner votre tache de Validation');
            });
          // this.onValideDemande();

        }
        // window.open(fileURL);
      }, err => {
        console.log('error ....');
        alert('Fiche de Paie Introuvable!!!, Erreur connexion serveur INSAF!!!!');
        this.showLoading = false;
      });
  }

  // methode confirmation refus demande
  // confirmation annulation demande
  openDialog(idproces): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Voulez vous Refuser ce demande?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log('Oui clicker');
        // DO SOMETHING
        this.onRefuseDemande();

      }
    });
  }

}
