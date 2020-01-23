import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// recupere login et pwd
const login = localStorage.getItem('log');
const pwd = localStorage.getItem('pwd');
const str = login + ':' + pwd;
// **********HTTPOPTION Assistants RH************* */
const httpOptionsAssRh = {
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
export class DafService {

  constructor(private http: HttpClient) {

  }
  // Config application
  // declaration de applicationdefinitionid
  applicationdefinitionkey = 'gestdemdocadmcni';
  // Config declaration de id de process definition
  processdefinitionId = 'demandefichepaie:1:d810a432-0280-11ea-9486-422cf40ca6b6';
  // dafassignee = 'asstrhadm';
  dafassignee = localStorage.getItem('log');
  // Url All Tasks to complete
  private allTasktoCompleteUrl = '/flowable-task/process-api/runtime/tasks';
  // Url detail de chaque task par id
  private detailtaskUrl = '/flowable-task/app/rest/tasks/';
  // Url retourne formulaire de validation
  private formValidSoutenuUrl = '/flowable-task/app/rest/task-forms/';
  // Url recupere process Instance with id = "processInstanceId"
  // pour recuperer startedUserID
  private processInstanceUrl = '/flowable-task/process-api/runtime/process-instances/';
  // Url recuper information user par id
  private userInfoUrl = '/flowable-task/process-api/identity/users/';
  // Url Claim Demande
  private claimDemandeUrl = '/flowable-task/process-api/runtime/tasks/';
  // Url Refus Demande
  // private refusDemandeUrl = '/flowable-task/process-api/runtime/tasks/';
  private refusDemandeUrl = '/flowable-task/app/rest/task-forms/';
  // Url Validation Demande
  // private validerDemandeUrl = '/flowable-task/process-api/runtime/tasks/';
  private validerDemandeUrl = '/flowable-task/app/rest/task-forms/';
  // Url demande completer
  private demandeCompleteUrl = '/flowable-task/app/rest/query/tasks';
  // Url detail process Instance
  private detailProcessInstanceUrl = '/flowable-task/process-api/runtime/process-instances/';
  // Url detail users
  private detaillusersUrl = '/flowable-task/process-api/identity/users/';
  // Url information users a travers processinstanceID
  private informationDemandeurUrl = '/flowable-task/app/rest/process-instances/';
  // Url recuperation historic demande
  private historicdemUrl = '/flowable-task/process-api/history/historic-process-instances';
  // Url recupere historic tasks
  private historicTasksUrl = '/flowable-task/process-api/history/historic-task-instances';

  // objet header demande a traiter
  objetHeaderDemandesenCours =
    {
      // tslint:disable-next-line: object-literal-key-quotes
      'assignee': this.dafassignee, 'page': 0, 'state': 'open',
      // tslint:disable-next-line: object-literal-key-quotes
      'assignment': 'candidate', 'appDefinitionKey': this.applicationdefinitionkey,
      // tslint:disable-next-line: object-literal-key-quotes
      'sort': 'created-desc'
    };
  // objet header demande terminer
  objetHeaderDemandesterminer =
    {
      // tslint:disable-next-line: object-literal-key-quotes
      'assignee': this.dafassignee, 'page': 0, 'state': 'completed', 'assignment': 'assignee',
      // tslint:disable-next-line: object-literal-key-quotes
      'processDefinitionId': this.processdefinitionId,
      // tslint:disable-next-line: object-literal-key-quotes
      'sort': 'created-desc'
    };

  // methode recupere tous les tasks a completer traiter
  public onGetDemandesenCours() {
    return this.http.post(this.demandeCompleteUrl, this.objetHeaderDemandesenCours, httpOptionsAssRh);
  }
  // methode recupere tous les taches terminés
  public onGetDemandeTerminer() {
    return this.http.post(this.demandeCompleteUrl, this.objetHeaderDemandesterminer, httpOptionsAssRh);
  }

  // methode recupere detail d'un task filtré par un id task
  public onGetDetailTask(idTask) {
    return this.http.get(this.detailtaskUrl + idTask, httpOptionsAssRh);
  }

  // methode retourne le formulaire de validation pour le demandeur souteni par assistant
  public onGetformValidation(idtask: any) {
    return this.http.get(this.formValidSoutenuUrl + idtask, httpOptionsAssRh);
  }

  // methode recupere userid de process instance
  public onGetUserId(processInstanceId: any) {
    return this.http.get(this.processInstanceUrl + processInstanceId, httpOptionsAssRh);
  }

  // methode recupere information employee "user"
  public onGetInfoEmployee(iduser) {
    return this.http.get(this.userInfoUrl + iduser, httpOptionsAssRh);
  }

  // methode onclaim demande
  public onClaimDemande(idtask, objetHeaders) {
    return this.http.put(this.claimDemandeUrl + idtask, objetHeaders, httpOptionsAssRh);
  }
  // methode onrefuse demande
  public onRefuseDemande(idtask, objetHeaders) {
    return this.http.post(this.refusDemandeUrl + idtask, objetHeaders, httpOptionsAssRh);
  }
  // methode onvalide demande
  public onValideDemande(idtask, objetHeaders) {
    return this.http.post(this.validerDemandeUrl + idtask, objetHeaders, httpOptionsAssRh);
  }

  // methode recupere detail process instance pour get user starter id
  public getDetailProcessInstance(idProcessInstance) {
    return this.http.get(this.detailProcessInstanceUrl + idProcessInstance, httpOptionsAssRh);
  }

  // methode recupere detaille users a travers son id
  public onGetDetaillUsers(idusers) {
    return this.http.get(this.detaillusersUrl + idusers, httpOptionsAssRh);
  }
  // methode recupere information demandeur avec processinstance id
  onGetDemandeurinformation(processinstanceId) {
    return this.http.get(this.informationDemandeurUrl + processinstanceId, httpOptionsAssRh);
  }
  // methode recupere historiques de tous les demandes
  onGethistoricDemand() {
    return this.http.get(this.historicdemUrl, httpOptionsAssRh);
  }

  // methode recupere historic taskc
  onGethistoricTasks() {
    return this.http.get(this.historicTasksUrl, httpOptionsAssRh);
  }

}
