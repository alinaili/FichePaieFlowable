import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/usersServices/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  // user;
  constructor(private authService: AuthService, private router: Router, private userService: UsersService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const signin = localStorage.getItem('signin');
    console.log(signin);
    if (signin === 'true') {
      return true;
    }
    // not logged in so redirect to login page with the return url
    // this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
    this.router.navigate(['signin']);
    return false;
  }
}

