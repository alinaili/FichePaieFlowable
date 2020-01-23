import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private username: string;
  private lastname: string;

  connected: boolean;

  constructor(private authService: AuthService,
              private router: Router) { }
  // tslint:disable-next-line: use-lifecycle-interface
  ngDoCheck() {
    // this.connected = true;
    if (localStorage.getItem('currentUser')) {
      this.connected = true;
      let curuser = localStorage.getItem('currentUser');
      curuser = JSON.parse(curuser);
      // tslint:disable-next-line: no-string-literal
      this.username = curuser['firstName'];
      // tslint:disable-next-line: no-string-literal
      this.lastname = curuser['lastName'];
    }
  }

  ngOnInit() {
  }

  onSignOut() {
    this.connected = false;
    localStorage.clear();
    sessionStorage.clear();
    this.authService.signOutUser();
    // this.router.navigate(['/login']);
  }

  onSignIn() {
    // this.connected = false;
    // this.router.navigateByUrl('signin');
  }
}
