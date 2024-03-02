import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class InputOptionService {

  constructor(public http: HttpClient) {
  }

  getOptionWithPagination(url: string) {
    let params = new HttpParams();
    return this.http.get<any[]>(url, {observe: 'body', params: params});
  }
}
