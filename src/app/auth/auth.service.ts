import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private expirationTimer: any;
  private readonly signupUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWLrgi1_XnS9rLjN54vArSOzr2YvVudY4';
  private readonly signinUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWLrgi1_XnS9rLjN54vArSOzr2YvVudY4';
  constructor(private http: HttpClient, private router: Router) {}
  private handleAuth(resData: AuthResponseData) {
    const { email, localId, idToken, expiresIn } = resData;
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.autoLogin();
    this.user.next(user);
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem('user', JSON.stringify(user));
  }
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signupUrl, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        tap((resData) => {
          this.handleAuth(resData);
        })
      );
  }

  signin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signinUrl, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        tap((resData) => {
          this.handleAuth(resData);
        })
      );
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
    this.user.next(null);
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
  }
  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('user')!) as User;
    if (!userData) {
      return;
    }
    const { email, id, _token, _tokenExpiratonDate } = userData;
    const user = new User(email, id, _token, _tokenExpiratonDate);
    const expiresIn =
      new Date(_tokenExpiratonDate).getTime() - new Date().getTime();
    if (user.token) {
      this.autoLogout(expiresIn);
      this.user.next(user);
    }
  }
  autoLogout(expireDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expireDuration);
  }
}
