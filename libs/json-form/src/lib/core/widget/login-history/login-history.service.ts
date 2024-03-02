import {Injectable} from '@angular/core';
import {GenericService} from "../../model/generic-service";
import {HttpClient} from "@angular/common/http";
import {LoginHistory} from "./login-history.model";
import {Pagination} from "../../model/pagination.model";

@Injectable({providedIn: 'root'})
export class LoginHistoryService extends GenericService<LoginHistory> {

  constructor(http: HttpClient) {
    super(http, 'api/security/loginHistory')
  }

  list() {
    return this.http.get<LoginHistory[]>(`${this.resourceUrl}/list`, {
      params: this.modelToParam(null, new Pagination()),
      observe: 'body'
    });
  }
}

