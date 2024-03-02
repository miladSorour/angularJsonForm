import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CarouselModel} from './carousel.model';
import {GenericService} from "../../model/generic-service";


@Injectable({providedIn: 'root'})
export class CarouselService extends GenericService<CarouselModel> {
  constructor(http: HttpClient) {
    super(http, 'api/core/slider');
  }

  enableImages(): any {
    return this.http.get<CarouselModel>(`${this.resourceUrl}/list/enableImages`, {observe: 'body'});
  }

}
