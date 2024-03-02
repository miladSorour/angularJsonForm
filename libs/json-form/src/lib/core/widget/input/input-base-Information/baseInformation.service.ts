import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {BaseInformationHeader} from "../input-base-Information-header/baseInformation-header.model";
import {GenericService} from "../../../model/generic-service";
import { BaseInformation } from '../../../model/baseInfromation.model';


@Injectable({providedIn: 'root'})
export class BaseInformationService extends GenericService<BaseInformation> {

  constructor(
    http: HttpClient
  ) {
    super(http, 'api/core/baseInformation');
  }

  public getBaseInformationByParentId(id: number): Observable<HttpResponse<any>> {
    return this.http.get<any>('api/core/baseInformation/list/' + id, {observe: 'response'});
  }

  getAllByMasterInformationId(masterInformationId: number) {
    return this.http.get<any>(`api/core/baseInformation/getAllByMasterInformationId/${masterInformationId}/` + 1, {observe: 'response'});
  }

  getAllByRelationId(relationId: number) {
    return this.http.get<any>(`api/core/baseInformation/getAllByRelationId/${relationId}/` + 1, {observe: 'response'});
  }

  public getAllBaseInformationHeader(): Observable<BaseInformationHeader[]> {
    return this.http.get<BaseInformationHeader[]>(`${this.resourceUrl}/listsAllHeaders`, {observe: 'body'});
  }

  public findByHeaderAndParent(headerId: any, parentId: any): Observable<BaseInformation[]> {
    let options: HttpParams = new HttpParams();
    if (headerId) {
      options = options.append('headerId', headerId.toString());
    } else if (parentId) {
      options = options.append('parentId', parentId.toString());
    }
    return this.http.get<BaseInformation[]>(`${this.resourceUrl}/find`, {observe: 'body', params: options});
  }
}









