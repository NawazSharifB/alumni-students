import { BehaviorSubject } from 'rxjs';
import { TokenInfoModel } from './../models/token-info.model';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwt = new JwtHelperService();
  tokenName = 'alumni-student-token';
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  isUserAdmin$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  userUid(): string | null {
    const data = this.getTokenInfo();
    if (data) {
      return data.uid;
    } else {
      return null;
    }
  }

  isUserAdmin(): boolean {
    const tokenInfo = this.getTokenInfo();
    if (tokenInfo && tokenInfo.role === 'admin') {
      this.isUserAdmin$.next(true);
      return true;
    } else {
      this.isUserAdmin$.next(false);
      return false;
    }
  }

  getToken(): string {
    return localStorage.getItem(this.tokenName);
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (token) {
      const info = !this.jwt.isTokenExpired(token);
      this.isUserLoggedIn$.next(info);
      return info;
    } else {
      this.isUserLoggedIn$.next(false);
      return false;
    }
  }

  getTokenInfo(): TokenInfoModel {
    const token = this.getToken();
    if (token) {
      return this.jwt.decodeToken(token).data;
    } else {
      // console.log('token doesnt exist', token);
      return null;
    }
  }

  saveToken(token: string): string {
    // console.log('got token');
    localStorage.setItem(this.tokenName, token);
    this.isUserAdmin();
    this.isTokenValid();
    return this.userUid();
  }

  logout(): void {
    localStorage.removeItem(this.tokenName);
    this.isTokenValid();
    this.isUserAdmin();
  }

}
