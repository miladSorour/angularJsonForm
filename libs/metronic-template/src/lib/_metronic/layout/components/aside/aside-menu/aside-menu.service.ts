import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {GenericService, UserModel} from '@pnrng/json-form';
import {Menu} from '@pnrng/json-form';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {QueryParam} from '@pnrng/json-form';
import {QueryResult} from '@pnrng/json-form';

@Injectable({providedIn:'root'})
export class AsideMenuService extends GenericService<Menu> {
  constructor(http: HttpClient) {
    super(http, 'api/security/menu');

  }

  private searchResult = new BehaviorSubject({});
  private searchResult$ = this.searchResult.asObservable()

  getSearchInput(): Observable<any> {
    return this.searchResult$
  }

  setSearchInput(latestValue: string) {
    return this.searchResult.next(latestValue)
  }

  public getMenuList(): Observable<HttpResponse<Menu[]>> {
    return this.http.get<Menu[]>(`${this.resourceUrl}/getAll`, {observe: 'response'});
  }

  public getMenuNode(): Observable<HttpResponse<any>> {
    return this.http.get<Menu[]>(`${this.resourceUrl}/getAll/nodes`, {observe: 'response'});
  }

  public getMenuUsers(queryParam: QueryParam): Observable<QueryResult<UserModel>> {
    return this.http.get<QueryResult<UserModel>>(`${this.resourceUrl}/get/node/users`, {
      params: queryParam.toHttpPrams(),
      observe: 'body'
    });
  }

  public notifications(): Observable<HttpResponse<Menu[]>> {
    return this.http.get<Menu[]>(`${this.resourceUrl}/notifications`, {observe: 'response'});
  }


  getMenuForAuthorize(groupId: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.resourceUrl}/getMenuForAuthorize/` + groupId, {observe: 'response'});
  }

  getAllMenuWithoutAuthorize(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.resourceUrl}/getAllMenuWithoutAuthorize`, {observe: 'response'});
  }

  /**
   * ها منو جایی جابه و parentId کردن آپدیت
   * @param menuId
   * @param parentId
   */
  updateParentId  (menuId: number, parentId: number) {
    return this.http.get(`${this.resourceUrl}/updateParentId/${menuId}/${parentId}`, {observe: 'body'});
  }
}
