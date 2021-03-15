import { EditInfoModel } from './../models/edit-info.model';
import { environment } from './../../environments/environment';
import { RegisterInfoModel } from '../models/register-info.model';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInfoModel } from '../models/login-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(info: RegisterInfoModel): Observable<any> {
    return this.http.post(`${environment.serverAddress}register`, info);
  }

  loginUser(info: LoginInfoModel): Observable<any> {
    return this.http.post(`${environment.serverAddress}login`, info);
  }

  getEditUserData(uid: string): Observable<any> {
    return this.http.get(`${environment.serverAddress}get-edit-info/${uid}`);
  }

  editUserInfo(info: EditInfoModel): Observable<any> {
    return this.http.put(`${environment.serverAddress}edit-info`, info);
  }

  getFullInfo(uid: string): Observable<any> {
    return this.http.get(`${environment.serverAddress}full-info/${uid}`);
  }

  uploadImage(data: FormData): Observable<HttpEvent<any>> {
    return this.http.post(
      `${environment.serverAddress}upload-image`, 
      data,
      {
        observe: 'events',
        reportProgress: true
      });
  }
  // uploadImage(data: FormData): Observable<any> {
  //   return this.http.post(`${environment.serverAddress}upload-image`, data);
  // }

  getInfoList(paginationOptions): Observable<any> {
    return this.http.post(`${environment.serverAddress}info-list`, paginationOptions);
  }
}
