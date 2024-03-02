import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import { GenericService } from '../model/generic-service';
import { LocationModel } from '../model/location.model';

@Injectable({providedIn: 'root'})
export class LocationService extends GenericService<LocationModel> {
    private isOpen = false;

    constructor(http: HttpClient,
                private modalService: NgbModal) {
        super(http, 'api/core/location')
    }

    findByName(name: string): Observable<LocationModel[]> {
        const params = new HttpParams().set('name', name);
        return this.http.get<LocationModel[]>(`api/core/location/find`, {observe: 'body', params: params});
    }
    searchByNameAndParent(name: string, parentId: any): Observable<LocationModel[]> {
        const params = new HttpParams();
          params.set('name', name);
          if (parentId) {
            params.set('parentId', parentId);
          }
        return this.http.get<LocationModel[]>(`api/core/location/find`, {observe: 'body', params: params});
    }
    getAllCountry(): Observable<LocationModel[]> {
        const params = new HttpParams();
        return this.http.get<LocationModel[]>(`api/core/location/getAllCountry`, {observe: 'body', params: params});
    }

    load(id: number): Observable<LocationModel> {
        return this.http.get<any>(`${this.resourceUrl}/load/` + id);
    }

    locationFormModalRef(component: Component, locationEditForm: LocationModel): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'md', windowClass: 'modal-xxl'});
        modalRef.componentInstance.location = locationEditForm;
        return modalRef;
    }

  openEditModal(component: Component, parentId?: number, forEdit?: boolean) {
        if (forEdit) {
            const response = Object.assign(new LocationModel(), {
                id: parentId,
            });
            this.locationFormModalRef(component, response);
        } else {
            const locationEditForm = Object.assign(new LocationModel(), {
                parentId
            });
            this.locationFormModalRef(component, locationEditForm);
        }
    }

    findByParent(parentId: any): Observable<LocationModel[]> {
        let options: HttpParams = new HttpParams();
        if (parentId || parentId == 0) {
            options = options.append('parentId', parentId.toString());
        }
        return this.http.get<LocationModel[]>(`${this.resourceUrl}/findByParent`, {observe: 'body', params: options});
    }
}
