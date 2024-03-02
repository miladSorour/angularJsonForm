import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from "rxjs";
import { GenericService } from '../model/generic-service';
import { Group } from '../model/group.model';

@Injectable({providedIn: 'root'})
export class GroupService extends GenericService<Group> {
  private isOpen = false;

  constructor(http: HttpClient,
                private modalService: NgbModal) {
        super(http, 'api/security/group')
    }


  findEager(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.resourceUrl}/loadEager/${id}`, {observe: 'body'});
  }

  findByParent(parentId: any): Observable<Group[]> {
    let options: HttpParams = new HttpParams();
    if (parentId) {
      options = options.append('parentId', parentId.toString());
    }
    return this.http.get<Group[]>(`${this.resourceUrl}/findByParent`, {observe: 'body', params: options});
  }

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.resourceUrl}/getAll`, {observe: 'body'});
  }

  makeTree(options: HttpParams): Observable<any> {
    return this.http.get(`${this.resourceUrl}/makeTree`, {params: options});
  }

  groupTreeEditFormModalRef(component: Component, groupTreeEditForm: Group): NgbModalRef {
    const modalRef = this.modalService.open(component, {size: 'xl', windowClass: 'modal-xxl'});
    /* we can set value to a parameter in this component*/
    modalRef.componentInstance.group = groupTreeEditForm;
    modalRef.result.then(result => {
      this.isOpen = false;
    }, reason => {
      this.isOpen = false;
    });
    return modalRef;
  }

  openGroupSearch(component: Component, eventName?: string): NgbModalRef {
    const modalRef = this.modalService.open(component, {size: 'xl', windowClass: 'modal-xxl'});
    modalRef.componentInstance.eventName = eventName;
    modalRef.result.then((result) => {
      this.isOpen = false;
    }, (reason) => {
      this.isOpen = false;
    });
    return modalRef;
  }

  saveGroup(group: Group): Observable<HttpResponse<Group>> {
    const entity: Group = Object.assign({}, group);
    return this.http.post<Group>(`${this.resourceUrl}/saveGroup`, entity, {observe: 'response'});
  }

  quickSearch(name: string, code: string): Observable<Group[]> {
    let options: HttpParams = new HttpParams();
    options = options.append('name', name);
    options = options.append('code', code);
    return this.http.get<Group[]>(`${this.resourceUrl}/list/grid`, {observe: 'body', params: options});
  }

  getSelected(groupId: number): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.resourceUrl}/getSelected/${groupId}`, {observe: 'body'});
  }
}
