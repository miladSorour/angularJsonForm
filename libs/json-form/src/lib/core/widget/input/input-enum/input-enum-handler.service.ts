import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppEnumModel} from './app-enum.model';

@Injectable({providedIn: 'root'})
export class InputEnumHandlerService {

  constructor(public http: HttpClient) {
  }

  getAllValues(classFullName: string, withNull?: boolean): Observable<AppEnumModel[]> {
    let params = new HttpParams();
    if (withNull)
      params = params.append('withNull', String(withNull));
    return this.http.get<AppEnumModel[]>(`api/core/enumHandler/getAllValues/${classFullName}`, {
      observe: 'body',
      params: params
    });
  }
}
