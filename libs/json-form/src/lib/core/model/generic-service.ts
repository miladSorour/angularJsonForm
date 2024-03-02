import {Observable} from 'rxjs';

import {HttpClient, HttpResponse} from '@angular/common/http';
import {QueryParam} from './queryParam.model';
import {QueryResult} from './queryResult.model';
import {Pagination} from './pagination.model';

export abstract class GenericService<T> {

  protected resourceUrl;
  protected http: HttpClient;

  protected constructor(http: HttpClient, url: string) {
    this.resourceUrl = url;
    this.http = http;
  }

  getAllGridWithPagination(entitySearch: T, pagination?: Pagination): Observable<QueryResult<T>> {
    let modelToParam = this.modelToParam(entitySearch, pagination);
    return this.http.get<QueryResult<T>>(`${this.resourceUrl}/list/grid`, {
      params: modelToParam,
      observe: 'body'
    });
  }

  getWithObjParams(queryParam: QueryParam): Observable<QueryResult<T>> {
    return this.http.get<QueryResult<T>>(`${this.resourceUrl}/list/grid`, {
      params: queryParam.toHttpPramsWithObjAndArr(),
      observe: 'body'
    });
  }

  getList(entitySearch: T): Observable<any> {
    let modelToParam = this.modelToParam(entitySearch);
    return this.http.get<T[]>(`${this.resourceUrl}/list`, {
      params: modelToParam,
      observe: 'body'
    });
  }

  find(id: number): Observable<T> {
    return this.http.get<T>(`${this.resourceUrl}/load/${id}`, {observe: 'body'});
  }

  find2(id: number): any {
    return this.http.get(`${this.resourceUrl}/load/${id}`);
  }

  save(entity: T): Observable<HttpResponse<T>> {
    const copy: T = Object.assign({}, entity);
    return this.http.post<T>(`${this.resourceUrl}/save`, copy, {observe: 'response'});
  }

  update(entity: T): Observable<HttpResponse<T>> {
    const copy: T = Object.assign({}, entity);
    return this.http.post<T>(`${this.resourceUrl}`, copy, {observe: 'response'});
  }

  insert(entity: T): Observable<HttpResponse<T>> {
    const copy: T = Object.assign({}, entity);
    return this.http.post<T>(`${this.resourceUrl}`, copy, {observe: 'response'});
  }

  groupSave(entities: T[]): Observable<HttpResponse<T[]>> {
    return this.http.post<T[]>(`${this.resourceUrl}/batchSave`, entities, {observe: 'response'});
  }

  delete(id: any): Observable<HttpResponse<T>> {
    return this.http.delete<T>(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }

  search(queryParam: QueryParam): Observable<QueryResult<T>> {
    return this.http.get<QueryResult<T>>(`${this.resourceUrl}/list/grid`, {
      params: queryParam.toHttpPrams(),
      observe: 'body'
    });
  }

  modelToParam(model: any, pagination?: Pagination) {
    return QueryParam.modelToHttpParam(model, pagination);
  }
}
