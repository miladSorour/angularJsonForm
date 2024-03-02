import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { GenericService } from '../../model/generic-service';
import { BaseInformationProperty } from './base-information-property.model';

@Injectable({providedIn: 'root'})
export class BaseInformationPropertyService extends GenericService<BaseInformationProperty> {

    constructor(http: HttpClient) {
        super(http, 'api/baseInformationProperty')
    }
}
