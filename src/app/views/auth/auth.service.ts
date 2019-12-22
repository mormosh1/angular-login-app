import { signUser } from '../../shared/models/auth/signUser.model';
import { Router } from '@angular/router';
import { AuthenticatedUser } from './../../shared/classes/AuthenticatedUser.class';
import { authResponse } from '../../shared/models/auth/authResponse.model';
import { catchError, tap, take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { setMinutesOfCurrentTime } from '../../shared/utilities/utilities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<AuthenticatedUser>(null);
  user$ = this.user.asObservable();

  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) { }

  //save user on localstorage.
  setUserLoggedIn(user: AuthenticatedUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //clear localstorage.
  clearUserFromLocalStorage() {
    localStorage.removeItem('user');
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut('expired');
    }, expirationDuration);
  }

  //load user from local storage and cheek if token valid.
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('user'));

    if (!userData) {
      return;
    } else {
      const loadedUser = new AuthenticatedUser(
        userData.email,
        0,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration = loadedUser.getExpirationDuration();
        this.autoLogout(expirationDuration);
      }
    }
  }

  //handle incoming authentication and warp it as behaviorsubject emiter.
  handleAuthentication(email: string, res: authResponse) {
    //demo expiration time for token response
    const expiration = setMinutesOfCurrentTime(5);
    const authenticatedUser = new AuthenticatedUser(email, res.id, res.token, expiration);
    this.setUserLoggedIn(authenticatedUser);
    this.user.next(authenticatedUser);
    //handle auto logout timer
    const expirationDuration = authenticatedUser.getExpirationDuration();
    this.autoLogout(expirationDuration);
  }

  //logOut clear token expiration timer and fire message success
  logOut(fragment) {
    console.log('logOut');
    this.user.next(null);
    this.clearUserFromLocalStorage();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    location.reload();
    this.router.navigate(['/login'], { fragment: fragment, replaceUrl: true });
  }

  //register and login form
  sign(signUser: signUser, signState) {
    return this.http.post<authResponse>('https://reqres.in/api/@signState@'.replace("@signState@", signState), {
      email: signUser.email,
      password: signUser.password
    }).pipe(
      catchError(err => {
        return throwError(err.error.error);
      }),
      tap(res => {
        this.handleAuthentication(signUser.email, res);
      })
    );
  }







}
