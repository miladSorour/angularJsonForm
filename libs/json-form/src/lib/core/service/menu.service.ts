import {GenericService} from '../model/generic-service';
import {Menu} from '../model/menu.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {QueryParam} from '../model/queryParam.model';
import {QueryResult} from '../model/queryResult.model';
import {Injectable} from '@angular/core';
import { UserModel } from '../model/user.model';

@Injectable({providedIn: 'root'})
export class MenuService extends GenericService<Menu> {
  menuList$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);

  constructor(http: HttpClient) {
    super(http, 'api/security/menu');
    this.loadAllMenu();
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
   * نمایش منو و جابجایی آن ها
   */
  updateParentId(menuId: number, parentId: number) {
    return this.http.get(`${this.resourceUrl}/updateParentId/${menuId}/${parentId}`, {observe: 'body'});
  }

  loadAllMenu() {
    this.getMenuList().subscribe((res) => {
      let body: any = [];
      if (res.body) {
        body = res.body
      }
      this.menuList$.next(body);
    });
  }
}
