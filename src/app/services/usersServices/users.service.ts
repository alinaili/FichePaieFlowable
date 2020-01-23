import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
// recupere login et pwd
const login = localStorage.getItem('log');
const pwd = localStorage.getItem('pwd');
const str = login + ':' + pwd;
// **********HTTPOPTION Users************* */
const httpOptionsUsers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // tslint:disable-next-line: object-literal-key-quotes
    'Authorization': 'Basic ' + btoa(str)
  }),
  params: null
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }
  // Config declaration de id de process definition
  processdefinitionId = 'demandefichepaie:1:d810a432-0280-11ea-9486-422cf40ca6b6';
  applicationdefinitionkey = 'gestdemdocadmcni';
  // declaration de user concerné modifié avec le session user
  // user = 'respdp';
  user = localStorage.getItem('log');

  // dateencour: string;
  dateencour = formatDate(new Date(), 'dd-MMMM-yyyy', 'fr');
  // headers pour demarrer process
  bodyObjetProcess =
    {
      // tslint:disable-next-line: object-literal-key-quotes
      'processDefinitionId': this.processdefinitionId, 'name': 'Demande Fiche de Paie - ' + this.dateencour
    };

  // Demarrer un process instance
  // Url pour demarrer un process instance
  private demarrerProcessUrl = '/flowable-task/process-api/runtime/process-instances';

  // All Tasks to complete****1****
  private allTasktoCompleteUrl = '/flowable-task/process-api/runtime/tasks';
  // complete task formulaire
  private remplirFormUrl = '/flowable-task/process-api/form/form-data';
  // delete process instance
  private deleteProcessinstanceUrl = '/flowable-task/process-api/runtime/process-instances';
  // Url All process instance de chaque demandeur
  // private processInstEncoursUrl = '/flowable-task/process-api/runtime/process-instances';
  private processInstEncoursUrl = '/flowable-task/app/rest/query/process-instances';
  // Url All process completed
  private processinstCompletedUrl = '/flowable-task/app/rest/query/process-instances';
  // Url all taches rectifier
  private tachesRectifiesUrl = '/flowable-task/app/rest/query/tasks';
  // Url retourne formulaire de Correction de task demandé
  private formCorrectionUrl = '/flowable-task/app/rest/task-forms/';
  // Url retourne formulaire de Demande de process demandé
  private detailFormDemandeUrl = '/flowable-task/app/rest/task-forms/';
  // Url detail de chaque task Demande par id
  private detailProcessUrl = '/flowable-task/app/rest/query/tasks';
  // Url datail user profile
  private userUrl = '/flowable-task/process-api/identity/users/';
  // url recupere users d'un groupe daf assistant administration
  private groupeusersadmUrl = '/flowable-task/process-api/identity/users?memberOfGroup=dafadministration';
  // url recupere users d'un groupe daf assistant financier
  private groupeusersfinancUrl = '/flowable-task/process-api/identity/users?memberOfGroup=daffinance';
  // url recupere users d'un groupe responsable daaf
  private groupusersresp = '/flowable-task/process-api/identity/users?memberOfGroup=daf';
  // url annule ou supprime demande with idprocess
  private annuleDemandeUrl = '/flowable-task/app/rest/process-instances/';
  // Url demande completer
  private tachesProcessCompleteUrl = '/flowable-task/app/rest/query/tasks';
  // ldeclarations des objet headers de chaque requete
  objetinstCompleted =
    {
      // tslint:disable-next-line: object-literal-key-quotes
      'sort': 'created-desc', 'page': 0, 'appDefinitionKey': this.applicationdefinitionkey, 'state': 'completed'
    };
  // objet taches rectifier
  objetheadTacheRectifier = {
    // tslint:disable-next-line: object-literal-key-quotes
    'assignee': this.user, 'page': 0, 'state': 'open', 'assignment': 'involved',
    // tslint:disable-next-line: object-literal-key-quotes
    'appDefinitionKey': this.applicationdefinitionkey, 'sort': 'created-desc'
  };
  // declaration objet header get process en cours
  // tslint:disable-next-line: object-literal-key-quotes
  objetheadProcessEncours = { 'sort': 'created-desc', 'page': 0, 'state': 'running' };

  // ************Listes des Methodes************ */
  // get all process instance tous les process de demande encours demandeur
  onGetProcessEncours() {
    return this.http.post(this.processInstEncoursUrl, this.objetheadProcessEncours, httpOptionsUsers);
  }
  // get all process completed tous les process de demande Termine demandeur
  onGetProcessinstCompleted() {
    return this.http.post(this.processinstCompletedUrl, this.objetinstCompleted, httpOptionsUsers);
  }

  // get allTask to complete recupere les tache relié a un process demarrer lors de demande document
  public onGetTaskstoComplete() {
    return this.http.get(this.allTasktoCompleteUrl, httpOptionsUsers);
  }

  // methode pour remplir un demande
  completeFormDemFP(monObjet: {}) {
    return this.http.post(this.remplirFormUrl, monObjet, httpOptionsUsers);
    /* .pipe(/flowable-task/process-api/form/form-data
      catchError(this.handleError('ajouterMaClasse', monObjet))
    ); */
  }
  // methode pour demarrer in process et avoir id
  demarrerProcess() {
    console.log(this.processdefinitionId);

    return this.http.post(this.demarrerProcessUrl, this.bodyObjetProcess, httpOptionsUsers);
  }

  // methode recupere taches rectifiés tache de correction pour demandeur
  onGetTachesRectifier() {
    return this.http.post(this.tachesRectifiesUrl, this.objetheadTacheRectifier, httpOptionsUsers);
  }

  // methode retourne le formulaire de Correction pour le demandeur
  public onGetformCorrection(idtacheRectif: any) {
    return this.http.get(this.formCorrectionUrl + idtacheRectif, httpOptionsUsers);
  }
  // methode envoyer fom corriger
  public enVoyerFormCorriger(idtacheRectif: any, objetHeaderFormCorrig) {
    return this.http.post(this.formCorrectionUrl + idtacheRectif, objetHeaderFormCorrig, httpOptionsUsers);
  }
  // methode recupere detail d'un demande formulaire filtré par un id task
  public onGetdetaiProcess(objetHeadDetailProcess) {
    return this.http.post(this.detailProcessUrl, objetHeadDetailProcess, httpOptionsUsers);
  }
  // methode recupere detail d'un "process" demande formulaire filtré par un id
  public onGetformDemande(idDemande) {
    return this.http.get(this.detailFormDemandeUrl + idDemande, httpOptionsUsers);
  }
  // methode recupere detail profile user
  public onGetDetailUser() {
    return this.http.get(this.userUrl + login, httpOptionsUsers);
  }

  // methode recupere listes users de groupe assist administration
  public onGetusrsGrpadminist() {
    return this.http.get(this.groupeusersadmUrl, httpOptionsUsers);
  }

  // methode recupere listes users de groupe assist finance
  public onGetusrsGrpfinance() {
    return this.http.get(this.groupeusersfinancUrl, httpOptionsUsers);
  }
  // methode recupere listes users de groupe responsable
  public onGetusrsGrpResp() {
    return this.http.get(this.groupusersresp, httpOptionsUsers);
  }

  // methode supprime un process instance = annule Demande
  onDeleteProcessins(idprcess) {
    return this.http.delete(this.annuleDemandeUrl + idprcess, httpOptionsUsers);
  }

  // methode recupere les taches de process terminée
  onGetTachesProcessTerminer(objetTachesprocessTerminer) {
    return this.http.post(this.tachesProcessCompleteUrl, objetTachesprocessTerminer, httpOptionsUsers);
  }
}
