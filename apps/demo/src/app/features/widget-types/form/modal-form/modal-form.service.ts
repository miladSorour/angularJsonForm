import { HttpClient } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { GenericService } from '@pnrng/json-form';
import { ModalFormModel } from "./modal-form.model";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ModalFormService extends GenericService<ModalFormModel> {

  constructor(http: HttpClient) {
    super(http, 'api/security/personnelOrganization');
  }

  findByPersonnelId(id: number): Observable<ModalFormModel[]> {
    return this.http.get<ModalFormModel[]>(`${this.resourceUrl}/loadByPersonnelId/${id}`, {observe: 'body'});
  }

}
