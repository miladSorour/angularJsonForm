import {Component, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Role} from '../model/role.model';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { GenericService } from '../model/generic-service';

@Injectable({providedIn: 'root'})
export class RoleService extends GenericService<Role> {

  constructor(http: HttpClient, private modalService: NgbModal) {
    super(http, 'api/core/role');
  }

  getAll() {
    return this.http.get<any>(`${this.resourceUrl}/getAll`, {observe: 'response'});
  }

  open(component: Component) {
    setTimeout(() => {
      this.openSearchModal(component)
    }, 200);
  }

  openSearchModal(component: Component, eventName?: string): NgbModalRef {
    const modalRef = this.modalService.open(component, {size: 'xl', windowClass: 'modal-xxl'});
    modalRef.componentInstance.eventName = eventName;
    modalRef.result.then((result) => {
    }, (reason) => {
    });
    return modalRef;
  }
}
