import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';
import { UsersService } from 'src/app/services/usersServices/users.service';
import { DafService } from 'src/app/services/dafServices/daf.service';

@Component({
  selector: 'app-assistants',
  templateUrl: './assistants.component.html',
  styleUrls: ['./assistants.component.css']
})
export class AssistantsComponent implements OnInit {
  @Input() showLoading = false;
  @Input() homelisttrait: string;
  @Input() useringroupresp = false;
  usersrespdaf = [];
  historic = [];
  processinstanceid: string;
  userid: string;
  private demandeTerminer = [];
  private demandetermineextend = [];
  private tasksExtended = [];
  private tasks = [];
  @Input() nbrdemEncours;
  @Input() nbrdemTraite;
  @Input() nbrhistoricdem;
  constructor(
    private dafService: DafService,
    private router: Router,
    private userService: UsersService
  ) { }

  ngOnInit() {
    // modif home select tab taches traités si demander au retour page
    const homelisttrait = localStorage.getItem('homelisttrait');
    if (homelisttrait) {
      this.homelisttrait = homelisttrait;
    }
    this.usergroupAjouthistorinprocess();
    this.onGetTachesenCours();
    this.onGetTachesTerminer();
  }
  // recupere les taches ouvert pour valider et completer
  onGetTachesenCours() {
    this.dafService.onGetDemandesenCours()
      .subscribe(data => {
        // tslint:disable-next-line: no-string-literal
        this.tasks = data['data'];
        this.nbrdemEncours = this.tasks.length;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.tasks.length; i++) {
          this.processinstanceid = this.tasks[i].processInstanceId;
          this.dafService.onGetDemandeurinformation(this.processinstanceid).subscribe(userinfo => {
            // tslint:disable-next-line: no-string-literal
            const infofullName = userinfo['startedBy'].fullName;
            // tslint:disable-next-line: no-string-literal
            const infoemail = userinfo['startedBy'].email;
            // tslint:disable-next-line: object-literal-shorthand
            const fullName = {infofullName: infofullName};
            // tslint:disable-next-line: object-literal-shorthand
            const email = {infoemail: infoemail};
            Object.assign(this.tasks[i], fullName, email);
          }, err => {
            alert('error detail process');
          });
        }
      }, err => {
        alert('error detail tache');
      });
  }

  // methode recuperer detail task avec id
  onGetdetTask(idTask: any) {
    localStorage.setItem('detailTaskId', idTask);
    this.router.navigateByUrl('/detailTask');
  }

  // methode naviger vers page gerer formulaire de demande by id task
  onGetformtoValide(idtask) {
    this.router.navigateByUrl('/gerer', idtask);
  }

  // methode recupere les demande assignee et completer
  onGetTachesTerminer() {
    this.dafService.onGetDemandeTerminer().subscribe(datacomplete => {
      // tslint:disable-next-line: no-string-literal
      this.demandeTerminer = datacomplete['data'];
      // filtre name: "Validation RH"
      // filter les process terminée affiche seulement les taches de validation ou refus
      this.demandeTerminer = this.demandeTerminer.filter((tachescompleter) => tachescompleter.name === 'Validation RH');
      console.log(this.demandeTerminer);
      this.nbrdemTraite = this.demandeTerminer.length;

      // chercher detail demandeue
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.demandeTerminer.length; i++) {
        this.processinstanceid = this.demandeTerminer[i].processInstanceId;
        this.dafService.onGetDemandeurinformation(this.processinstanceid).subscribe(dataDemandeur => {
          // tslint:disable-next-line: no-string-literal
          const infoname = dataDemandeur['startedBy'].fullName;
          // tslint:disable-next-line: no-string-literal
          const infomail = dataDemandeur['startedBy'].email;
          const name = {fullName : infoname};
          const email = {email : infomail};
          // tslint:disable-next-line: no-string-literal
          const endate = dataDemandeur['ended'];
          const ended = {datevalidourefus: endate};
          Object.assign(this.demandeTerminer[i], name, email, ended);

        }, err => {
          // console.log('error ....');
          // console.log(err);
        });
      }

    }, err => {
      // console.log('error de recuperer demande completer....');
      // console.log(err);
    });
  }

  // recupere l'index de tab change
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index === 0) {
      this.onGetTachesenCours();
    }
    if (tabChangeEvent.index === 1) {
      this.onGetTachesTerminer();
    }
    if (tabChangeEvent.index === 2) {
      this.onGethistoriqueDemande();
    }
  }

  // methode verifier currentuser est un responsable daaf ou non show hide button
  usergroupAjouthistorinprocess() {
    // get current users connected
    let curuser = localStorage.getItem('currentUser');
    curuser = JSON.parse(curuser);

    // recupere user group administration st verifie
    this.userService.onGetusrsGrpResp().subscribe(grpusersresp => {
      // tslint:disable-next-line: no-string-literal
      this.usersrespdaf = grpusersresp['data'];

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.usersrespdaf.length; i++) {
        // tslint:disable-next-line: no-string-literal
        if (this.usersrespdaf[i].id === curuser['id']) {
          this.useringroupresp = true;
        }
      }
    });
  }

  // methode recupere historique des demandes
  onGethistoriqueDemande() {

    this.showLoading = true;
    this.dafService.onGethistoricDemand().subscribe(historicdem => {
      // this.historic = historicdem.data;
      // tslint:disable-next-line: no-string-literal
      this.historic = historicdem['data'];
      this.nbrhistoricdem = this.historic.length;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.historic.length; i++) {
        // this.processinstanceid = this.historic[i].id;
        this.userid = this.historic[i].startUserId;
        // console.log(this.processinstanceid);
        this.dafService.onGetInfoEmployee(this.userid).subscribe(userinfo => {
          // tslint:disable-next-line: no-string-literal
          const firstname = userinfo['firstName'];
          // tslint:disable-next-line: no-string-literal
          const lastname = userinfo['lastName'];
          // tslint:disable-next-line: no-string-literal
          const infoemail = userinfo['email'];
          const fName = {firstName: firstname};
          const lName = {lastName: lastname};
          const email = {email: infoemail};
          Object.assign(this.historic[i], fName, lName, email);

        }, err => {
          // console.log('error ....');
          // alert("error detail process");
          console.log(err);
        });
      }

    }, err => {
      // console.log('error ....');
      // alert("error detail process");
      console.log(err);
    });
  }
  // methode redirection vers detail tahes avec id tache refuser
  onGetdetTaskrefuser(idTask: any) {
    localStorage.setItem('detailtachrefuser', idTask);
    localStorage.removeItem('detailtachvalider');
    this.router.navigateByUrl('/detailtachtraiter');
  }
  // methode redirection vers detail tahes avec id tache valider
  public onGetdetTaskvalider(idTch) {
    localStorage.setItem('detailtachvalider', idTch);
    localStorage.removeItem('detailtachrefuser');
    this.router.navigateByUrl('/detailtachtraiter');
  }

}

