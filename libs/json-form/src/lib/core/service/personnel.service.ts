import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from "rxjs";
import { GenericService } from '../model/generic-service';
import { QueryParam } from '../model/queryParam.model';
import { QueryResult } from '../model/queryResult.model';

class Personnel {
}

@Injectable({providedIn: 'root'})
export class PersonnelService extends GenericService<Personnel> {
  private isOpen = false;

  constructor(http: HttpClient,
              private modalService: NgbModal) {
    super(http, 'api/security/personnel')
  }


  findEager(id: number): Observable<Personnel> {
    return this.http.get<Personnel>(`${this.resourceUrl}/loadEager/${id}`, {observe: 'body'});
  }

  findByParent(parentId: number): Observable<Personnel[]> {
    let options: HttpParams = new HttpParams();
    if (parentId) {
      options = options.append('parentId', parentId.toString());
    }
    return this.http.get<Personnel[]>(`${this.resourceUrl}/findByParentM`, {observe: 'body', params: options});
  }

  getAll(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(`${this.resourceUrl}/getAll`, {observe: 'body'});
  }

  makeTree(options: HttpParams): Observable<any> {
    return this.http.get(`${this.resourceUrl}/makeTree`, {params: options});
  }

  groupTreeEditFormModalRef(component: Component, groupTreeEditForm: Personnel): NgbModalRef {
    const modalRef = this.modalService.open(component, {size: 'xl', windowClass: 'modal-xxl'});
    /* we can set value to a parameter in this component*/
    modalRef.componentInstance.personnel = groupTreeEditForm;
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

  saveGroup(group: Personnel): Observable<HttpResponse<Personnel>> {
    const entity: Personnel = Object.assign({}, Personnel);
    return this.http.post<Personnel>(`${this.resourceUrl}/saveGroup`, entity, {observe: 'response'});
  }

  quickSearch(firstName: string, lastName: string, nationalName: string, personnelCode: string): Observable<Personnel[]> {
    let options: HttpParams = new HttpParams();
    options = options.append('firstName', firstName);
    options = options.append('lastName', lastName);
    options = options.append('nationalName', nationalName);
    options = options.append('personnelCode', personnelCode);
    return this.http.get<Personnel[]>(`${this.resourceUrl}/list`, {observe: 'body', params: options});
  }

  getByFormationFilter(queryParam: QueryParam): Observable<QueryResult<Personnel>> {
    return this.http.get<QueryResult<Personnel>>(`${this.resourceUrl}/list/gridByFormation`, {
      params: queryParam.toHttpPrams(),
      observe: 'body'
    });
  }
}
