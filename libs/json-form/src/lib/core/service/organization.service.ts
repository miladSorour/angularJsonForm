import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import { Organization } from '../model/organization.model';
import { GenericService } from '../model/generic-service';

@Injectable({providedIn: 'root'})
export class OrganizationService extends GenericService<Organization> {

    constructor(http: HttpClient,
                private modalService: NgbModal) {
        super(http, 'api/core/organization')
    }

    getAll(options: HttpParams): Observable<any> {
        return this.http.get(`${this.resourceUrl}/makeTree`, {params: options});
    }

    load(id: number): Observable<Organization> {
        return this.http.get<any>(`${this.resourceUrl}/load/` + id);
    }

    openSearchModal(component: Component, eventName?: string, options?: any): NgbModalRef {
        const modalRef = this.modalService.open(component, options);
        modalRef.componentInstance.eventName = eventName;
        return modalRef;
    }

    organizationFormModalRef(component: Component, organizationEditForm: Organization): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'xl'});
        modalRef.componentInstance.organization = organizationEditForm;
        return modalRef;
    }

    findByParent(parentId: any): Observable<Organization[]> {
        let options: HttpParams = new HttpParams();
        if (parentId) {
            options = options.append('parentId', parentId.toString());
        }
        return this.http.get<Organization[]>(`${this.resourceUrl}/findByParent`, {observe: 'body', params: options});
    }

    openEditModal(component: Component, parentId?: number, forEdit = false) {
        if (forEdit) {
            const response = Object.assign(new Organization(), {
                id: parentId,
            });
            this.organizationFormModalRef(component, response);
        } else {
            const organizationEditForm = Object.assign(new Organization(), {parentId});
            this.organizationFormModalRef(component, organizationEditForm);
        }
    }

    getCurrentOrganization(): Observable<Organization> {
        return this.http.get<Organization>(`${this.resourceUrl}/getCurrentOrganizationLocation`);
    }

    makeTree(organizationId: number, parentId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/makeTree/${organizationId}/${parentId}`, {observe: 'body'});
    }
}
