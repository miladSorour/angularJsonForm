import {Directive, OnInit} from '@angular/core';
import {AppTableDatasource} from '../widget/table/app-table-datasource';
import {LayoutUtilsService, MessageType} from '../service/layout-utils.service';
import {RouterUtilsService} from '../service/router-utils.service';
import {GenericService} from './generic-service';
import {HttpResponse} from "@angular/common/http";
import {QueryResult} from "./queryResult.model";
import {AppEventManagerService} from '../service/event-manager/app-eventManager.service';
import {AppContainerModel} from '../json-form/model/app-container.model';
import {AppFormGroup} from './app-form-group';
import {AppDialogService} from '../widget/dialog/service/app-dialog.service';
import {Pagination} from './pagination.model';
import {TypesUtilsService} from '../service/types-utils.service';
import {ServiceLocator} from '../service/locator.service';
import {
  findById,
  deleteById,
  loadWithPagination,
  persist,
  setDatasourceAndPagination,
  setDatasource
} from '../Util/util-crud';
import { EventEnum } from '../enum/event.enum';

/**
 * Revision History:
 * Date            Author                Task ID              Notes
 * ==============  ====================  ===================  ===================================================
 * 2021/01/06      milad.sorour                               initialize class
 * 2021/07/06      milad.sorour                               inject common service @see
 *                                                            https://stackoverflow.com/questions/33970645/how-to-extend-a-component-with-dependency-injection
 */
@Directive()
export abstract class BaseComponent<T> implements OnInit {
  showList = true;
  // pnr enum
  eventEnum = EventEnum;
  // pnr model
  entityList: T [] | undefined;
  entitySearch: T;
  // container
  containerList: AppContainerModel[];
  containerEdit: AppContainerModel[];
  // pnr table
  tableDataSource = new AppTableDatasource<any>();
  pagination = new Pagination('e.id');
  // generic service
  layoutUtilsService: LayoutUtilsService;
  typesUtilsService: TypesUtilsService;
  router: RouterUtilsService;
  appEventManagerService: AppEventManagerService;
  appDialogService: AppDialogService;
  // angular model
  editFormGroup = new AppFormGroup<T>({});
  searchFormGroup = new AppFormGroup<T>({});

  /**
   * @param service GenericService
   */
  protected constructor(
    private service: GenericService<T> | null | undefined,
  ) {
    // inject
    this.injectService();
    // init data
    this.initEntity();
  }

  ngOnInit(): void {
    this.initContainerList();
    this.initContainerEdit();
  }

  initContainerList(): any {
  };

  initContainerEdit(): any {
  };

  getFormContainer(): any {
  };

  getTableContainer(): void {
  };

  loadGrid(pagination?: Pagination) {
    this.service.getAllGridWithPagination(this.entitySearch, pagination).subscribe((res: QueryResult<T>) => {
      if (res) {
        this.entityList = res.entityList;
        this.tableDataSource.totalCount = res.totalRecords;
      }
      this.afterLoadGrid();
    });
  }

  edit() {
    this.service.save(this.editFormGroup.getFormValue()).subscribe((res: HttpResponse<T>) => {
      if (res) {
        this.afterPersist();
      }
    });
  }

  beforeLoadGrid() {
  }

  load(pa?: any) {
    loadWithPagination(this.searchFormGroup, this.service!, this.pagination, () => this.beforeLoadGrid(), (res: QueryResult<T>) => this.afterLoadGrid(res))
  }

  afterLoadGrid(result ?: QueryResult<T>) {
    setDatasourceAndPagination(result!, this.tableDataSource, this.pagination)
  }

  beforeFindGrid() {
  }

  find(id: any) {
    findById(id, this.service!,  () => this.beforeFindGrid(), (res: T) => this.afterFindGrid(res))
  }


  afterFindGrid(result ?: T) {
    setDatasource(result!, this.tableDataSource)
  }

  beforePersist() {
  }

  afterPersist(entity?: T) {
    this.editFormGroup.reset();
    this.editFormGroup.updateValueAndValidity()
  }

  notifySuccess(message: string) {
    this.layoutUtilsService.showActionNotification(message, MessageType.Create);
  }

  notifyError(message: string) {
    this.layoutUtilsService.showActionNotification(message, MessageType.Error);
  }

  persist() {
    persist(this.editFormGroup, this.service!, () => this.beforePersist(), (res: any) => this.afterPersist(res))
  }

  delete(id: any) {
    deleteById(id, this.service!, () => this.beforeDelete(), (res: any) => this.afterDelete(res))
  }

  clear() {
    this.initEntity();
  }

  initEntity() {
    this.entityList = [];
    this.entitySearch = {} as T;
  }

  afterDelete(res?: any) {
    this.load();
  }

  resetSearchForm(beforeSearch?:()=>void) {
    this.searchFormGroup.reset();
    if(beforeSearch)
     beforeSearch()
    this.search();
  }

  restEditForm() {
    this.editFormGroup.reset();
  }

  search() {
    this.entitySearch = this.searchFormGroup.getFormValue();
    this.load()
  }

  changeView() {
    this.showList = !this.showList
    if(this.containerEdit.length>0){
      const pageTitle=this.containerEdit[0].config.pageTitle
      if(Object.keys(pageTitle).includes('new'))
       this.containerEdit[0].config.pageEditMode=false
    }
  }

  goToEditContainer(element: T) {
    this.showList = !this.showList;
    this.editFormGroup.patchValue(element);
    const pageTitle=this.containerEdit[0].config.pageTitle
    if(Object.keys(pageTitle).includes('edit'))
     this.containerEdit[0].config.pageEditMode=true
  }

  private injectService() {
    this.layoutUtilsService = ServiceLocator.injector.get(LayoutUtilsService);
    this.typesUtilsService = ServiceLocator.injector.get(TypesUtilsService);
    this.router = ServiceLocator.injector.get(RouterUtilsService);
    this.appEventManagerService = ServiceLocator.injector.get(AppEventManagerService);
    this.appDialogService = ServiceLocator.injector.get(AppDialogService);
  }

  private beforeDelete() {

  }
}
