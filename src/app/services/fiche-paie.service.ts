import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FichePaieService {
  private paieUrl = 'http://localhost:8081/paie/';

  constructor(private http: HttpClient) { }
  public getpaie(cnrps: string, annee: string, mois: string): any {
    return this.http.get(this.paieUrl + cnrps + '/' + annee + '/' + mois, { responseType: 'blob' });
  }
}
