import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailnodemailService {

  constructor(private http: HttpClient) { }
  // mailserver Url
  nodmailerUrl = 'http://localhost:3000/sendmail';

  // envoimail a travers nodemailer server
  envoiMail(body) {
    return this.http.post(this.nodmailerUrl, body);
  }
}
