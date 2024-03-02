import {Injectable} from '@angular/core';
import {BaseInformationPropertyValue} from "./base-information-property-value.model";
import {HttpClient} from "@angular/common/http";
import {GenericService} from '../../../../core/model/generic-service';

@Injectable({providedIn: 'root'})
export class BaseInformationPropertyValueService extends GenericService<BaseInformationPropertyValue> {

  constructor(http: HttpClient) {
    super(http, 'api/baseInformationPropertyValue')
  }
}
