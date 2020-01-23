import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/services/usersServices/users.service';

@Component({
  selector: 'app-detail-demande',
  templateUrl: './detail-demande.component.html',
  styleUrls: ['./detail-demande.component.css']
})
export class DetailDemandeComponent implements OnInit {
  @Input() showLoading = true;
  tasks = [];
  forms = [];
  objetHeadDetailProcess: {};
  // declaration var form
  @Input() valueCodecnrps: string;
  @Input() valuePrenom: string;
  @Input() valueNom: string;
  @Input() valueStructure: string;
  @Input() valueEmail: string;
  @Input() valueLangue: string;
  @Input() valueAnnee: string;
  @Input() valueMois: string;
  @Input() valueRemarque: string;

  constructor(private userservice: UsersService) { }

  ngOnInit() {
    this.OnGetDetailProcess();
  }

  OnGetDetailProcess() {
    const idProcess = localStorage.getItem('idprocess');
    console.log(idProcess);
    // declaration objet header get detail process instance
    this.objetHeadDetailProcess = {
      processInstanceId: idProcess,
      state: 'completed'
    };
    this.userservice.onGetdetaiProcess(this.objetHeadDetailProcess).subscribe(detailprocess => {
      this.showLoading = true;
      // tslint:disable-next-line: no-string-literal
      this.tasks = detailprocess['data'];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.tasks.length; i++) {
        const element = this.tasks[i];
        // console.log(element['id']);
        // tslint:disable-next-line: no-string-literal
        this.userservice.onGetformDemande(element['id']).subscribe(dataFormDemande => {
          // tslint:disable-next-line: no-string-literal
          this.forms = dataFormDemande['fields'];
          // tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < this.forms.length; j++) {
            if (this.forms[j].id === 'codecnrps') {
              this.valueCodecnrps = this.forms[j].value;
            }
            if (this.forms[j].id === 'prenom') {
              this.valuePrenom = this.forms[j].value;
            }
            if (this.forms[j].id === 'nom') {
              this.valueNom = this.forms[j].value;
            }
            if (this.forms[j].id === 'structure') {
              this.valueStructure = this.forms[j].value;
            }
            if (this.forms[j].id === 'email') {
              this.valueEmail = this.forms[j].value;
            }
            if (this.forms[j].id === 'lalanguedudocumentdemandee') {
              this.valueLangue = this.forms[j].value;
            }
            if (this.forms[j].id === 'annee') {
              this.valueAnnee = this.forms[j].value;
            }
            if (this.forms[j].id === 'mois') {
              this.valueMois = this.forms[j].value;
            }
            if (this.forms[j].id === 'remarque') {
              this.valueRemarque = this.forms[j].value;
            }

          }
        });

      }
      this.showLoading = false;
    }, err => {
      console.log('error ....');
      console.log(err);
      alert('erreur de connexion');
      this.showLoading = true;
    });
  }

}
