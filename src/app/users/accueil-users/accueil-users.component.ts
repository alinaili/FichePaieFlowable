import { FichePaieService } from './../../services/fiche-paie.service';
import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/services/usersServices/users.service';
import { Tasks } from 'src/app/models/Tasks';
import { MatTabChangeEvent, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DafService } from 'src/app/services/dafServices/daf.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-accueil-users',
  templateUrl: './accueil-users.component.html',
  styleUrls: ['./accueil-users.component.css']
})
export class AccueilUsersComponent implements OnInit {
  @Input() showLoading = false;
  @Input() showLoadingPDF = false;
  @Input() useringrouadmfinc = false;
  historicmodifier = [];
  historic = [];
  forms = [];
  valueCodecnrps: string;
  valueAnnee: string;
  valueMois: string;
  usersadm = [];
  usersfinanc = [];
  processinstanceId: string;
  objetTachesprocessTerminer: {};
  taches = [];
  tachesprocessterminer = [];
  supporttachesprocessterminer = [];
  tachfields = [];
  @Input() rectifHome;
  tacheRectifiers: [];
  public tasks: Tasks = [];
  public processes = [];
  constructor(private userService: UsersService,
              private router: Router,
              private dafService: DafService,
              private fichepaieservice: FichePaieService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.useringrouadmfinc = false;
    this.onGettProcessInstEncours();
    this.userProfile();
    // recupere valeur par defaut rectifHome de tache-rectifier.html pour revenir au users accueil
    const rectifhome = localStorage.getItem('rectifhome');
    if (rectifhome) {
      this.rectifHome = rectifhome;
      localStorage.removeItem('rectifhome');
    }
    this.onGetTacheRectifier();
  }

  // methode recuperer id de tache rectifier
  onGetIdTachRectif(idTacheRectif: any) {
    localStorage.setItem('idTachRectId', idTacheRectif);
    this.router.navigateByUrl('/rectifier');
  }
  // get process instance
  onGettProcessInstEncours() {
    this.showLoading = true;
    this.userService.onGetProcessEncours()
      .subscribe(data => {
        // tslint:disable-next-line: no-string-literal
        this.tasks = data['data'];
        // filter les process terminée affiche seulement le prcess le mien
        const userLogid = localStorage.getItem('log');
        this.tasks = this.tasks.filter((mesprocessterminee) => mesprocessterminee.startedBy.id === userLogid);
        this.showLoading = false;
      }, () => {
        alert('erreur de connexion');
        this.showLoading = true;
      });
  }

  // get process instance completed
  onGetProcessInstCompleted() {
    this.showLoading = true;
    this.dafService.onGethistoricTasks().subscribe(historicTasks => {
      const userLogid = localStorage.getItem('log');
      // tslint:disable-next-line: no-string-literal
      this.historic = historicTasks['data'];
      this.historic = this.historic.filter((historictasend) => historictasend.endTime != null);
      this.historic = this.historic.filter((historictas) => historictas.name === 'Validation RH');
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.historic.length; i++) {
        const info = this.historic[i].processInstanceId;
        this.dafService.onGetDemandeurinformation(info).subscribe(infoTask => {
          console.log(infoTask);

          // tslint:disable-next-line: no-string-literal
          const prov = infoTask['startedBy'];
          // tslint:disable-next-line: no-string-literal
          const prov1 = infoTask['startedBy'].id;
          // tslint:disable-next-line: no-string-literal
          const prov2 = infoTask['name'];
          // tslint:disable-next-line: no-string-literal
          const prov3 = infoTask['started'];
          // tslint:disable-next-line: no-string-literal
          const prov4 = infoTask['ended'];
          // console.log(prov2);

          const start = {startedBy: prov };
          const start1 = { demandeur: prov1 };
          const start2 = { nameProcess: prov2 };
          const start3 = { started: prov3 };
          const start4 = { ended: prov4 };
          Object.assign(this.historic[i], start, start1, start2, start3, start4);
          // Object.assign(this.historicmodifier, this.historic[i]);
          // console.log(this.historic[i].startedBy.id);
          Object.assign(this.historicmodifier, this.historic);
          this.historicmodifier = this.historicmodifier.filter((historiclog) => historiclog.demandeur === userLogid);
          console.log(this.historicmodifier);
        }, err => {
          //// console.log('error ....');
          console.log(err);
          // alert('erreur de connexion');

        });
      }
      this.showLoading = false;

    }, () => {
      //// console.log('error ....');
      //// console.log(err);
      alert('erreur de connexion');
      return this.showLoading = true;
    });

    /* this.userService.onGetProcessinstCompleted().subscribe(data => {
      console.log("process completed");
      console.log(data);


      this.processes = data['data'];
      ////console.log(this.processes);
      console.log(this.taches);

      //filter les process terminée affiche seulement le prcess le mien
      const userLogid = localStorage.getItem("log");
      this.processes = this.processes.filter((mesprocessterminee) => mesprocessterminee.startedBy.id === userLogid);
      ////console.log((this.processes));
      for (let k = 0; k < this.processes.length; k++) {
        this.processinstanceId = this.processes[k].id;
        console.log("processinstanceId");
        console.log(this.processinstanceId);
        this.objetTachesprocessTerminer = { "processInstanceId": this.processinstanceId, "state": "completed" };
        //recupere les taches de process
        this.userService.onGetTachesProcessTerminer(this.objetTachesprocessTerminer).subscribe(tasksproc => {
          this.taches = tasksproc['data'];
          //console.log("tous les taches dun process terminer");
          //console.log(this.taches);

          //filtrer seul validationfiche
          this.taches = this.taches.filter((tachesvalidation) => tachesvalidation.formKey === "validationfiche");
          //console.log("tous les taches seulement validationfiche");
          //console.log(this.taches);
          for (let l = 0; l < this.taches.length; l++) {
            //console.log("contenu des taches");
            //const element = this.taches[i];
            //console.log(element);

            this.userService.onGetformDemande(this.taches[l].id).subscribe(tachvalider => {
              //console.log("tachvalider");
              //console.log(tachvalider);
              this.tachfields = tachvalider['fields'];
              var valid = { "fields": this.tachfields };
              //
              for (let m = 0; m < this.tachfields.length; m++) {

                if (this.tachfields[m].id === 'validerrefuser') {
                  var valuevalidrefus = this.tachfields[m].value;
                  //console.log(this.taches[l]);

                  if (valuevalidrefus === "valider") {
                    Object.assign(this.taches[l], valid);
                  }
                  //
                  if (valuevalidrefus === "refuser") {
                    console.log("valuerefuser");
                    console.log(valuevalidrefus);
                    //supprimer valid refuser
                    this.taches.splice(l);
                    //Object.assign(this.taches[i], valid);
                  }

                }
              }

            });
            //console.log(l);
            //console.log(this.taches);
          }
          //console.log(l);
            console.log(this.taches);
            for (let o = 0; o < this.taches.length; o++) {
              const element = this.taches[o];
              console.log(element);
            }
          ////console.log("here");
          //console.log(this.taches);
          //return this.taches;
        })
      }
      //console.log("this.taches");
      //console.log(this.taches);
      return this.showLoading = false;
    }, err => {
      ////console.log('error ....');
      ////console.log(err);
      alert('erreur de connexion');
      return this.showLoading = true;
    }); */


  }

  // recupere les tacher rectifié
  onGetTacheRectifier() {
    this.showLoading = true;
    this.userService.onGetTachesRectifier().subscribe(datatacherectif => {
      //// console.log("datatacherectif");
      //// console.log(datatacherectif);
      // tslint:disable-next-line: no-string-literal
      this.tacheRectifiers = datatacherectif['data'];
      //// console.log(this.tacheRectifiers);
      this.showLoading = false;

    }, () => {
      //// console.log('error ....');
      //// console.log(err);
      alert('erreur de connexion');
      this.showLoading = true;
    });
  }

  // recupere l'index de tab change
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    ////// console.log('tabChangeEvent => ', tabChangeEvent);
    //// console.log('index => ', tabChangeEvent.index);
    if (tabChangeEvent.index === 0) {
      this.onGettProcessInstEncours();
    }
    if (tabChangeEvent.index === 1) {
      this.onGetProcessInstCompleted();
    }
    if (tabChangeEvent.index === 2) {
      this.onGetTacheRectifier();
    }
  }

  // methode recuperer detail Demande avec idprocess
  onGetdetDemande(idProcess: any) {
    //// console.log('id process recuperé');
    //// console.log(idProcess);
    localStorage.setItem('idprocess', idProcess);
    this.router.navigateByUrl('/detailDemande');
  }

  // methode recupere detail user profile
  userProfile() {
    //  var login = localStorage.getItem('log');
    //// console.log("login user ");
    //// console.log(login);


    this.userService.onGetDetailUser().subscribe(user => {
      //// console.log("user");
      //// console.log(user);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        //// console.log('tesi current user inauth service');
        let curuser = localStorage.getItem('currentUser');
        curuser = JSON.parse(curuser);
        //// console.log(curuser);
        this.usergroupAccessTraitDemande();
      }
      // return user;
    },
      () => {
        ////// console.log(error);
        // alert("user invalid");
        // this.errorMessage = error;
      });
  }

  // methode verifier accé users vers traiter Demande show hide button
  usergroupAccessTraitDemande() {
    // var existant = false;
    // get current users connected
    let curuser = localStorage.getItem('currentUser');
    curuser = JSON.parse(curuser);
    //// console.log('curuser axxueik');
    //// console.log(curuser);

    // recupere user group administration st verifie
    this.userService.onGetusrsGrpadminist().subscribe(grpusersadm => {
      // tslint:disable-next-line: no-string-literal
      this.usersadm = grpusersadm['data'];
      //// console.log('grp adm');
      //// console.log(this.usersadm);

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.usersadm.length; i++) {
        // tslint:disable-next-line: no-string-literal
        if (this.usersadm[i].id === curuser['id']) {
          this.useringrouadmfinc = true;
        }
      }
    });

    // recupere user group finance st verifie
    this.userService.onGetusrsGrpfinance().subscribe(grpusersfinanc => {
      // tslint:disable-next-line: no-string-literal
      this.usersfinanc = grpusersfinanc['data'];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.usersfinanc.length; i++) {
        // tslint:disable-next-line: no-string-literal
        if (this.usersfinanc[i].id === curuser['id']) {
          this.useringrouadmfinc = true;
        }
      }
    });
  }

  // methode Annule Demande
  onAnnuleDemande(idproces: any) {
    this.userService.onDeleteProcessins(idproces).subscribe(() => {
      this.onGettProcessInstEncours();
    }, () => {
      alert('erreur de connexion');
    });
  }

  // confirmation annulation demande
  openDialog(idproces): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Voulez vous Annuler ce demande?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        ////// console.log('Oui clicker');
        // DO SOMETHING
        this.onAnnuleDemande(idproces);

      }
    });
  }

  // methode genere fiche de paie en pdf
  onGenerePDF(idtache) {
    // loading
    this.showLoadingPDF = true;
    // recuperer donne form valid
    this.userService.onGetformDemande(idtache).subscribe(dataFormDemande => {
      // tslint:disable-next-line: no-string-literal
      this.forms = dataFormDemande['fields'];
      // console.log('fields form');
      // console.log(this.forms);
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < this.forms.length; j++) {
        // const element = this.forms[j];
        if (this.forms[j].id === 'codecnrps') {
          this.valueCodecnrps = this.forms[j].value;
        }
        if (this.forms[j].id === 'annee') {
          this.valueAnnee = this.forms[j].value;
        }
        if (this.forms[j].id === 'mois') {
          this.valueMois = this.forms[j].value;
        }
      }

      // generer fiche de paie from serveur
      this.fichepaieservice.getpaie(this.valueCodecnrps, this.valueAnnee, this.valueMois).subscribe(res => {
      console.log(this.valueAnnee);
      // si fiche existante on valide demande
      if (res) {
        // ouvrir fichier pdf
        FileSaver.saveAs(res, 'FichePaie_' + this.valueMois + this.valueAnnee + '.pdf');
        const fileURL = URL.createObjectURL(res);
        window.open(fileURL);
        this.showLoadingPDF = false;
      }
    }, () => {
      console.log('error ....');
      alert('Fiche de Paie Introuvable!!!, Erreur connexion serveur INSAF!!!!');
      this.showLoadingPDF = false;
    });

    });

  }

}
