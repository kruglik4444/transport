import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { environment } from 'src/environments/environment';
import { UserTypes } from '../../enums/user-types.enum';

export interface AuthResponeData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user = new BehaviorSubject<User | null>(null);

  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponeData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        },
      )
      .pipe(
        catchError(this.handleAuthError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn,
          );
        }),
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponeData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        },
      )
      .pipe(
        catchError(this.handleAuthError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn,
          );
        }),
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  registerNewUser(data: any, userId: string) {
    return this.http.post(`https://krugwagen-default-rtdb.firebaseio.com/companies/${userId}.json`, data)
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleAuthError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Неизвестная ошибка';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Пользователь уже зарегестрирован';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Пользователь не найден';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Неверная пара логин/пароль';
        break;
    }
    return throwError(() => errorMessage);
  }
}
