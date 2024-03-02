import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../model/user.model';
import { Logout } from '../model/logout.model';
import { Captcha } from '../model/Captcha.model';
import { JsonFormService } from '../../json-form.service';

const API_LOGIN     = `login`;

@Injectable({providedIn: 'root'})
export class AuthHTTPService {
  constructor(private http: HttpClient,
    private jsonFormService:JsonFormService) {}

  // public methods
  login(email: string, password: string): Observable<any> {
    const data = 'username=' + encodeURIComponent(email) +
      '&password=' + encodeURIComponent(password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(`${API_LOGIN}`, data, {headers, responseType: 'text'});
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.jsonFormService.environment.apiUrl}/auth`, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.jsonFormService.environment.apiUrl}/auth/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModel>(`${this.jsonFormService.environment.apiUrl}/auth/me`, {
      headers: httpHeaders,
    });
  }

  logoutSSO(): Observable<Logout> {
    return this.http.post<Logout>('api/api/logout', {}, );
  }

  logout(): Observable<any> {
    return this.http.post('logout', {}, {observe: 'response'});
  }

  isUserLogin(): Observable<UserModel> {
    return this.http.get<UserModel>('api/security/baseUser/user/authenticatedUser');
  }

  captcha(): Observable<Captcha> {
    return this.http.get<Captcha>('/captcha', {observe: 'body'});
  }

}
