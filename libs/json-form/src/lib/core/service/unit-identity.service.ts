import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {GenericService} from "../model/generic-service";
import { UnitIdentity } from '../model/unit-identity.model';

@Injectable({providedIn: 'root'})
export class UnitIdentityService extends GenericService<UnitIdentity> {

    constructor(http: HttpClient) {
        super(http, 'api/unitIdentity')
    }

    findByParent(parentId: number): Observable<UnitIdentity[]> {
        let options: HttpParams = new HttpParams();
        if (parentId) {
            options = options.append('parentId', parentId.toString());
        }
        return this.http.get<UnitIdentity[]>(`${this.resourceUrl}/findByParent`, {observe: 'body', params: options});
    }
}
