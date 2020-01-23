import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UsersService } from './usersServices/users.service';
import { CookieService } from 'ngx-cookie-service';


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded',
    // tslint:disable-next-line: object-literal-key-quotes
    'withCredentials': 'true',
  }),
  params: null
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = '/flowable-idm/app/authentication';
  logoutUrl = '/flowable-idm/app/logout';

  constructor(private http: HttpClient,
              private router: Router,
              private userService: UsersService,
              private cookieService: CookieService) { }
  // sign in users
  signInUser(login, password) {
    const body = new HttpParams()
      .set('j_username', login)
      .set('j_password', password)
      .set('_spring_security_remember_me', 'false')
      .set('submit', 'Login');

    return this.http.post(this.loginUrl, body, httpOptions);

  }
// etat de connection users
  userConnected() {
    if (localStorage.getItem('currentUser')) {
      let curuser = localStorage.getItem('currentUser');
      curuser = JSON.parse(curuser);
      console.log(curuser);
    } else {
       return false;
    }
  }
  signOutUser() {
    // clear user from local storage
    localStorage.clear();
    sessionStorage.clear();
    window.sessionStorage.clear();
    this.router.navigate(['signin']);
  }
}
