import {AfterViewInit, Component, Inject, Injector, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { BaseDialogComponentModel } from '../../../../model/base-dialog-component.model';
import { Pagination } from '../../../../model/pagination.model';
import { WidgetTypeModel } from '../../../../config/widget-type.model';
import { AppContainerModel } from '../../../../json-form/model/app-container.model';
import { IconEnum } from '../../../../enum/icon.enum';
import { ActionType } from '../../../table/cv-table-widget/action-item-config';
import { UserModel } from '../../../../model/user.model';
import { AppTableDatasource } from '../../../table/app-table-datasource';
import { UserService } from '../../../../service/user.service';
import { QueryResult } from '../../../../model/queryResult.model';
import { AppTableConfig, CellType, TableType } from '../../../table/cv-table-widget/app-table.config';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-search-users',
  template: `
    <app-json-form [containerList]="dialogCrudContainer"></app-json-form>`
})
export class UsersSearchComponent extends BaseDialogComponentModel<UserModel> implements OnInit, AfterViewInit {
  pagination = new Pagination('e.id');
  containerList: AppContainerModel[];
  entityList   : UserModel[] = [];
  tableModel   = new AppTableConfig();
  dataSource   = new AppTableDatasource<any>();
  entitySearch = new UserModel();
  iconEnum     = new IconEnum();
  widgetTypeEnum = new WidgetTypeModel();

  @Input() public eventName: string;
  @Input() public formationFilter: false;
  private paginationInfo: Map<string, any>;

  constructor(private injector: Injector,
    public dialogRef: MatDialogRef<UsersSearchComponent>,
    private usersService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
) {
super(injector, usersService);
this.initDialogContainer();
}


  ngOnInit(): void {
    // this.loadGrid();
    // const tableContainer = new AppContainerModel();
    // tableContainer.widgetType = WidgetTypeModel.table
    // tableContainer.config = this.tableModel;
    // this.containerList = [tableContainer]
  }

  initDialogContainer() {
    this.dialogCrudContainer = [
      {
        widgetType: WidgetTypeModel.dialogTemplate,
        config: {
          pageTitle: 'کاربران',
          container: [this.getSearchFormContainer(), this.getTableContainer()]
        },
        rows: 1,
      }
    ];
    this.searchFormGroup.createFormGroup(this.getSearchFormContainer().config.formControl)
  }

  ngAfterViewInit(): void {
    this.load()
  }

  getSearchFormContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.form,
      cols: 12,                    rows: 1,
      config: {
        formGroup: this.searchFormGroup,
        formControl: [
          { name: 'id'               , inputType: WidgetTypeModel.hidden                                                                                    },
          { name: 'firstName'            , inputType: WidgetTypeModel.string       , placeholder: 'نام',  cols: 6, rows: 1                                    },
          { name: 'lastName'            , inputType: WidgetTypeModel.string       , placeholder: 'نام خانوادگی',  cols: 6, rows: 1                                    },
          { name: 'username'            , inputType: WidgetTypeModel.string       , placeholder: 'نام کاربری',  cols: 6, rows: 1                                    },
        ],
        actions: [
          { title: 'جستجو', color: 'primary', onClick: () => this.load()          },
          { title: 'پاک کردن', color: 'warn', onClick: () => this.resetSearchForm()}
        ]
      }
    }
    // @formatter:on
  }

  // initTable() {
  //   // @formatter:off
  //   this.tableModel = {
  //     tableType: TableType.normal,
  //     tableName: 'کاربران',
  //     pagination: this.pagination,
  //     dataSource: this.dataSource,
  //     onPagination: (pagination: Pagination) => {
  //       this.onPagination(pagination);
  //     },
  //     columns: [
  //       {displayHeader: 'نام'           ,displayColumn: 'firstName'},
  //       {displayHeader: 'نام خانوداگی'  , displayColumn: 'lastName'},
  //       {displayHeader: 'نام کاربری'    , displayColumn: 'username'},
  //       {
  //         displayHeader: 'عملیات'                , displayColumn: 'action',type: CellType.action,
  //         actions: [
  //           {
  //             type: ActionType.inlineTableButton,
  //             tooltip: 'انتخاب'                 , icon: IconEnum.select, color: "primary",
  //             onClick: (element: UserModel) => this.selectedUsers(element),
  //           }
  //         ]
  //       }
  //     ]
  //   }
  //   // @formatter:on
  // }

  loadGrid() {
    const paramMap = new Map<string, any>();
    //paramMap.set('name', this.organizationSearchTitle);
      this.usersService.getAllGridWithPagination(this.entitySearch, this.tableModel.pagination).subscribe((res: QueryResult<UserModel>) => {
          if (res && res.entityList) {
            this.entityList = res.entityList;
            this.dataSource.totalCount = res.totalRecords;
            this.dataSource.data = this.entityList
          }
        }
      )
  }

  dismiss() {
    this.dialogRef.close();
  }

  clear() {
    this.entitySearch = new UserModel();
    this.load()
    // this.loadGrid();
  }

  private selectedUsers(element: UserModel) {
    this.dialogRef.close(element)
  }

  getTableContainer(): AppContainerModel {
    return {
      widgetType: WidgetTypeModel.table,
      cols: 12,                     rows: 1,
      config: {
        tableType: TableType.normal,
        tableName: 'کاربران',
        pagination: this.pagination,
        dataSource: this.tableDataSource,
        onPagination: (pagination: Pagination) => {
          this.onPagination(pagination);
        },
        columns: [
          {displayHeader: 'نام'           ,displayColumn: 'firstName'},
          {displayHeader: 'نام خانوداگی'  , displayColumn: 'lastName'},
          {displayHeader: 'نام کاربری'    , displayColumn: 'username'},
          {
            displayHeader: 'عملیات'                , displayColumn: 'action',type: CellType.action,
            actions: [
              {
                type: ActionType.inlineTableButton,
                tooltip: 'انتخاب'                 , icon: IconEnum.select, color: "primary",
                onClick: (element: UserModel) => this.selectedUsers(element),
              }
            ]
          }
        ]
        }
    }
  }

  onPagination(pagination: Pagination) {
    this.pagination = pagination;
    // this.loadGrid()
    this.load();
  }

}
