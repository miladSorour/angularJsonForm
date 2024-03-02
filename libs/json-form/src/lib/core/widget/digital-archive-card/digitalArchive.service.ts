import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {GenericService} from "../../model/generic-service";
import {DigitalArchiveModel} from "./digitalArchive.model";
import {QueryParam} from "../../model/queryParam.model";

@Injectable({providedIn: 'root'})
export class DigitalArchiveService extends GenericService<DigitalArchiveModel> {

  public isOpen = false;

  constructor(http: HttpClient,
              private modalService: NgbModal) {
    super(http, 'api/DigitalArchive');
  }

  changeDocType(destinationCategoryId: number, documentsId: number[], pid: number, mainCategoryId: number) {
    let params = new HttpParams();
    documentsId.forEach(id => {
      params = params.append('documentsId[]', id.toString());
    });
    params = params.append('destinationCategoryId', destinationCategoryId.toString());
    params = params.append('mainCategoryId', mainCategoryId.toString());
    params = params.append('pid', pid.toString());
    return this.http.post(`${this.resourceUrl}/changeDocType`, params, {observe: 'response'})
  }

  deleteSelectedDocument(pid: number, documentsId: number[], mainDocTypeId?: number) {
    let params = new HttpParams();
    documentsId.forEach(id => {
      params = params.append('documentsId[]', id.toString());
    });
    params = params.append('pid', pid.toString());
    // @ts-ignore
    params = params.append('mainCategoryId', mainDocTypeId.toString());
    return this.http.post(`${this.resourceUrl}/deleteDocs`, params, {observe: 'response'})
  }

  openUploadDocModal(component: Component, eventName?: string, options?: any, personnelId?: number,
                     personnelFullName?: string, dossierTypeId?: number, dossierTypeTopic?: string,
                     maxPageNumber?: number, classificationId?: number, mainDocType?: number): NgbModalRef {
    const modalRef = this.modalService.open(component, options);
    modalRef.componentInstance.eventName = eventName;
    modalRef.componentInstance.digitalArchive.personnelCode = personnelId;
    modalRef.componentInstance.digitalArchive.fullName = personnelFullName;
    modalRef.componentInstance.digitalArchive.docTypeId = dossierTypeId;
    modalRef.componentInstance.digitalArchive.docTypeTopic = dossierTypeTopic;
    modalRef.componentInstance.digitalArchive.classificationID = classificationId;
    modalRef.componentInstance.mainDocType = mainDocType;
    modalRef.componentInstance.maxPageNumber = maxPageNumber;
    return modalRef;
  }

  openchangeDocTypeTreeModal(component: Component, eventName?: string, options?: any, selectedDocuments?: number[],
                             digitalArchiveTree?: any[], pid?: number, mainDocTypeId?: number): NgbModalRef {
    const modalRef = this.modalService.open(component, options);
    modalRef.componentInstance.eventName = eventName;
    modalRef.componentInstance.selectedDocuments = selectedDocuments;
    modalRef.componentInstance.digitalArchiveTree = digitalArchiveTree;
    modalRef.componentInstance.mainDocTypeId = mainDocTypeId;
    modalRef.componentInstance.pid = pid;
    return modalRef;
  }

  unDeleteDigitalArchiveById(id: any): Observable<HttpResponse<DigitalArchiveModel>> {
    return this.http.delete<DigitalArchiveModel>(`${this.resourceUrl}/unDelete/${id}`, {observe: 'response'});
  }

  restoreDigitalArchiveById(id: any): Observable<DigitalArchiveModel> {
    return this.http.post<DigitalArchiveModel>(`${this.resourceUrl}/restore/${id}`, {observe: 'response'});
  }

  getDigitalArchiveProceeds(queryParam: QueryParam) {
    return this.http.get<any>(`${this.resourceUrl}/report/proceeds`, {
      params: queryParam.toHttpPrams(),
      observe: 'body'
    });
  }

  openEditorModal(component: Component, eventName?: string, options?: any, docUrl?: String, docUrl2?: String) {
    const modalRef = this.modalService.open(component, options);
    modalRef.componentInstance.eventName = eventName;
    modalRef.componentInstance.PicUrl = docUrl;
    modalRef.componentInstance.SaveUrl = docUrl2;
    modalRef.result.then((result) => {
      this.isOpen = false;
    }, (reason) => {
      this.isOpen = false;
    });
    return modalRef;
  }

  getMaxIndex(docTypeId: number, pid: number, mainDocType: number): Observable<HttpResponse<number>> {
    const param = new HttpParams().set('docTypeId', String(docTypeId)).set('pid', String(pid)).set('mainDocType', String(mainDocType));
    return this.http.get<number>(`${this.resourceUrl}/getMaxIndex/${docTypeId}/${pid}/${mainDocType}`, {
      observe: 'response',
      params: param
    });
  }

  changeIndexs(pid: number, documentsId: number[], docTypeId: number, value: number) {
    let params = new HttpParams();
    params = params.append('pid', pid.toString());
    documentsId.forEach(id => {
      params = params.append('documentsId[]', id.toString());
    });
    params = params.append('docTypeId', docTypeId.toString());
    params = params.append('destIndex', value.toString());
    return this.http.post(`${this.resourceUrl}/changeIndexs`, params, {observe: 'response'})
  }

  reversePageIndex(pid: number, docTypeId: number) {
    let params = new HttpParams();
    params = params.append('pid', pid.toString());
    params = params.append('docTypeId', docTypeId.toString());
    return this.http.post(`${this.resourceUrl}/reversePageIndex`, params, {observe: 'response'})
  }

  restorePage(pid: number, documentsId: number[], docTypeId: number) {
    let params = new HttpParams();
    params = params.append('pid', pid.toString());
    documentsId.forEach(id => {
      params = params.append('documentsId[]', id.toString());
    });
    params = params.append('mainCategoryId', docTypeId.toString());
    return this.http.post(`${this.resourceUrl}/restoreDocs`, params, {observe: 'response'})
  }
}
