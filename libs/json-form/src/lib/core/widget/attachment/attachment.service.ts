import {Component, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {Attachment} from "./attachment.model";
import {GenericService} from "../../model/generic-service";

@Injectable({providedIn: 'root'})
export class AttachmentService extends GenericService<Attachment> {

    constructor(http: HttpClient,
                private modalService: NgbModal) {
        super(http, 'api/core/attachment');
    }

    open(component: Component, baseInfoHeader: number, objectId: number, classificationObject: string): Promise<any> {
        const modalRef = this.modalService.open(<Component>component, {size: 'xl'});
        modalRef.componentInstance.baseInfoHeader = baseInfoHeader;
        modalRef.componentInstance.objectId = objectId;
        modalRef.componentInstance.classificationObject = classificationObject;
        return modalRef.result.then((result) => {
            return result;
        }, (reason) => {
        });
    }

    putInCoreFile(file: any): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.post<any>(`api/attachment/save`, formData)
    }

    deleteCoreFile(fileCode: any): Observable<any> {
        return this.http.delete<any>(`api/attachment/delete/`+fileCode)
    }
}
