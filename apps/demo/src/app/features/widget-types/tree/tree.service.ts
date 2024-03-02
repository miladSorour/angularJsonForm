import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {TreeModel} from './tree.model';
import {GenericService} from '@pnrng/json-form';

@Injectable({providedIn: 'root'})
export class TreeService extends GenericService<TreeModel> {

    constructor(http: HttpClient,
                private modalService: NgbModal) {
        super(http, 'api/core/location')
    }

    findByName(name: string): Observable<TreeModel[]> {
        const params = new HttpParams().set('name', name);
        return this.http.get<TreeModel[]>(`api/core/location/find`, {observe: 'body', params: params});
    }
    searchByNameAndParent(name: string, parentId: any): Observable<TreeModel[]> {
        const params = new HttpParams();
          params.set('name', name);
          if (parentId) {
            params.set('parentId', parentId);
          }
        return this.http.get<TreeModel[]>(`api/core/location/find`, {observe: 'body', params: params});
    }
    getAllCountry(): Observable<TreeModel[]> {
        const params = new HttpParams();
        return this.http.get<TreeModel[]>(`api/core/location/getAllCountry`, {observe: 'body', params: params});
    }

    load(id: number): Observable<TreeModel> {
        return this.http.get<any>(`${this.resourceUrl}/load/` + id);
    }

    locationFormModalRef(component: Component, locationEditForm: TreeModel): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'md', windowClass: 'modal-xxl'});
        modalRef.componentInstance.location = locationEditForm;
        return modalRef;
    }

  openEditModal(component: Component, parentId?: number, forEdit?: boolean) {
        if (forEdit) {
            const response = Object.assign(new TreeModel(), {
                id: parentId,
            });
            this.locationFormModalRef(component, response);
        } else {
            const locationEditForm = Object.assign(new TreeModel(), {
                parentId
            });
            this.locationFormModalRef(component, locationEditForm);
        }
    }

    findByParent(parentId: any): Observable<TreeModel[]> {
        let options: HttpParams = new HttpParams();
        if (parentId || parentId == 0) {
            options = options.append('parentId', parentId.toString());
        }
        return this.http.get<TreeModel[]>(`${this.resourceUrl}/findByParent`, {observe: 'body', params: options});
    }
}
