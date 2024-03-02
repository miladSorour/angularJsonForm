import {Component, Injectable} from "@angular/core";
import {GenericService} from '@pnrng/json-form';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {QueryResult} from '@pnrng/json-form';
import {QueryParam} from '@pnrng/json-form';
import { FormModel } from "./form.model";

@Injectable({providedIn: 'root'})
export class FormService extends GenericService<FormModel> {
  private filter = false;

  constructor(http: HttpClient,
              private modalService: NgbModal) {
    super(http, 'api/security/personnel');
  }

  /**
   * @param applyInformationPurposePersonFilter and @param newsId have to fill together and load personnel and is used
   * for newsAssociated in news-edit.component.html
   */
  open(component: Component, filter?: boolean, eventName?: string, applyInformationPurposePersonFilter?: boolean, newsId?: number) {
    if (filter != undefined) {
      this.filter = filter;
    }
    setTimeout(() => {
      this.openSearchModal(component, this.filter, eventName, applyInformationPurposePersonFilter, newsId)
    }, 200);
  }

  openSearchModal(component: Component, filter?: boolean, eventName?: string, applyInformationPurposePersonFilter?: boolean, newsId?: number): NgbModalRef {
    const modalRef = this.modalService.open(component, {size: 'xl'});
    modalRef.componentInstance.filter = filter;
    modalRef.componentInstance.eventName = eventName;
    modalRef.componentInstance.applyInformationPurposePersonFilter = applyInformationPurposePersonFilter;
    modalRef.componentInstance.newsId = newsId;
    return modalRef;
  }

  loadWithoutFilter(id: number): Observable<FormModel> {
    return this.http.get<FormModel>(`${this.resourceUrl}/loadWithoutFilter/${id}`, {observe: 'body'});
  }

  validateNationalNumber(nationalnumber: string): Observable<FormModel> {
    return this.http.get<FormModel>(`${this.resourceUrl}/checkNationalNumber/${nationalnumber}`, {observe: 'body'});
  }


  loadWithoutFilterPromise(id: number): Promise<FormModel> {
    // @ts-ignore
    return this.http.get<FormModel>(`${this.resourceUrl}/loadWithoutFilter/${id}`, {observe: 'body'})
      .toPromise();
  }

  changeEnabledStatus(id: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.resourceUrl}/changeEnabledStatus/${id}`, {});
  }

  save(entity: FormModel): Observable<HttpResponse<FormModel>> {
    return super.save(entity);
  }

  getByFormationFilter(queryParam: QueryParam): Observable<QueryResult<FormModel>> {
    return this.http.get<QueryResult<FormModel>>(`${this.resourceUrl}/list/gridByFormation`, {
      params: queryParam.toHttpPrams(),
      observe: 'body'
    });
  }
}
