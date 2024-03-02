import {Observable} from 'rxjs';
import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { GenericService } from '../model/generic-service';
import { UserModel } from '../model/user.model';
import { UserRole } from '../model/user-role.model';

const resourceUrl = 'api/security/baseUser/user';

@Injectable({providedIn: 'root'})
export class UserService extends GenericService<UserModel>{
  public isOpen = false;

  constructor(public http: HttpClient,
              private modalService: NgbModal) {
    super(http, resourceUrl);
  }

  getUser(): Observable<HttpResponse<UserModel>> {
    return this.http.get<UserModel>(`${resourceUrl}/authenticatedUser`, {observe: 'response'});
  }

  getUserAuthorities(): Observable<UserModel> {
    return this.http.get<UserModel>(`${resourceUrl}/authorities`);
  }

  getAuthenticatedUser(): any {
    return this.getUser();
  }

  list(groupId: number): Observable<HttpResponse<UserModel[]>> {
    const params = new HttpParams().set('groupId', groupId.toString());
    return this.http.get<UserModel[]>(`${resourceUrl}/list/`, {observe: 'response', params: params});
  }

  sendVerifyCode(): Observable<HttpResponse<boolean>> {
    return this.http.post<boolean>(`${resourceUrl}/sendVerifyCode`, {}, {observe: 'response'});
  }

  impersonateUser(userName: string): Observable<HttpResponse<boolean>> {
    const param = new HttpParams().set('username', userName);
    return this.http.post<boolean>(`impersonate`, {}, {observe: 'response', params: param});
  }

  resetPassModal(component: Component, userId: number): NgbModalRef {
    const modalRef = this.modalService.open(component, {size: 'lg'});
    modalRef.componentInstance.userId = userId;
    modalRef.result.then((result) => {
      this.isOpen = false;
    }, (reason) => {
      this.isOpen = false;
    });
    return modalRef;
  }

  open(component: Component, eventName?: string, userId?: number): NgbModalRef {
    const modalRef = this.modalService.open(component, {size: 'xl', windowClass: 'modal-xxl'});
    if (eventName !== undefined && eventName !== null) {
      modalRef.componentInstance.eventName = eventName;
    }
    if (userId !== undefined && userId !== null) {
      modalRef.componentInstance.userId = userId;
    }
    return modalRef;
  }

  checkUserName(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${resourceUrl}/checkUsername/${username}`, {observe: 'body'});
  }

  getUserRoles(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`api/core/user/userRole/getAllByUserId`);
  }

  resetPassword(userId: string, newPassword: string, rePassword: string): Observable<HttpResponse<boolean>> {
    return this.http.put<boolean>(`${this.resourceUrl}/resetPassword/${userId}/${newPassword}/${rePassword}`, {}, {observe: 'response'});
  }

    changePassword(newPassword: string, oldPassword: string): Observable<HttpResponse<number>> {
    return this.http.put<number>(`${this.resourceUrl}/changePassword/${newPassword}/${oldPassword}`, {}, {observe: 'response'});
  }

  changeUserRole(userRoleId: any): Observable<boolean> {
    return this.http.post<boolean>(`api/core/user/userRole/switch/${userRoleId}`, {}, {observe: 'body'});
  }
}
