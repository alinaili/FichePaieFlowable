import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/usersServices/users.service';
import '../../assets/login-animation';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  // declarer un cookie
  // cookieValue = 'UNKNOWN';
  @Input() showLoading = false;
  @Input() errorMessage: string;
  private submitted = false;
  private signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UsersService) {
  }

  ngOnInit() {
    localStorage.clear();
    sessionStorage.clear();
    this.authService.signOutUser();
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]/)]]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.signinForm.controls; }

  // methode authentification
  login() {
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }
    this.showLoading = true;
    this.authService.signInUser(this.f.login.value, this.f.password.value)
      .subscribe(data => {
        // profile user login password
        localStorage.setItem('log', this.f.login.value);
        localStorage.setItem('pwd', this.f.password.value);
        localStorage.setItem('signin', 'true');
        window.open('users', '_self');
      },
        error => {
          this.errorMessage = 'login ou Mot de passe Invalid!!!!';
          this.showLoading = false;
        });
  }


}
