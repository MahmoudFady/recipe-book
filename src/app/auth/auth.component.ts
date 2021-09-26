import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  signinMode = true;
  authError: string | null = null;
  isLoading = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  onSwitchAuthMode() {
    this.signinMode = !this.signinMode;
  }
  onSubmit(f: NgForm) {
    this.isLoading = true;
    this.authError = null;
    const { email, password } = f.value;
    let authObs: Observable<AuthResponseData>;
    if (this.signinMode) {
      authObs = this.authService.signin(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(
      (response) => {
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      },
      (err) => {
        this.authError = err.error.error.message;
        this.isLoading = false;
      }
    );
  }
  onLogOut() {
    this.authService.logout();
  }
}
