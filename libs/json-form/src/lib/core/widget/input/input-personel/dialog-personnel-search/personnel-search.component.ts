import {AfterViewInit, Component, Injector} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { CellType, TableType } from '../../../table/cv-table-widget/app-table.config';
import { BaseDialogComponentModel } from '../../../../model/base-dialog-component.model';
import { Pagination } from '../../../../model/pagination.model';
import { WidgetTypeModel } from '../../../../config/widget-type.model';
import { AppContainerModel } from '../../../../json-form/model/app-container.model';
import { IconEnum } from '../../../../enum/icon.enum';
import { ActionType } from '../../../table/cv-table-widget/action-item-config';
import { PersonnelService } from '../../../../service/personnel.service';
import { Personnel } from '../../../../model/personnel.model';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-dialog-search-personnel',
  template: `
    <app-json-form [containerList]="dialogCrudContainer"></app-json-form>`
})
export class PersonnelSearchComponent extends BaseDialogComponentModel<Personnel> implements AfterViewInit {
  paging = new Pagination('e.id');

  constructor(private injector: Injector,
              public dialogRef: MatDialogRef<PersonnelSearchComponent>,
              private personnelService: PersonnelService) {
    super(injector, personnelService)
    this.initDialogContainer();
  }

  initDialogContainer() {
    this.dialogCrudContainer = [
      {
        widgetType: WidgetTypeModel.dialogTemplate,
        config: {
          pageTitle: 'اشخاص',
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
          { name: 'id'              , inputType: WidgetTypeModel.hidden                                             },
          { name: 'firstName'       , inputType: WidgetTypeModel.string  , placeholder: 'نام'          ,  cols: 6, rows: 1  },
          { name: 'lastName'        , inputType: WidgetTypeModel.string  , placeholder: 'نام خانوداگی' ,  cols: 6, rows: 1  },
          { name: 'nationalNumber'  , inputType: WidgetTypeModel.string  , placeholder: 'کد ملی'       ,  cols: 6, rows: 1  },
        ],
        actions: [
          { title: 'جستجو', color: 'primary', onClick: () => this.load()          },
          { title: 'پاک کردن', color: 'warn', onClick: () => this.resetSearchForm()}
        ]
      }
    }
    // @formatter:on
  }

  getTableContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.table,
      cols: 12,                 rows: 1,
      config: {
        tableType: TableType.normal,
        tableName: '.',
        dataSource: this.tableDataSource,
        pagination: this.paging,
        onPagination: (pagination: Pagination) => {
          this.onPagination(pagination);
        },
        columns: [
          { displayHeader: 'نام'           , displayColumn: 'firstName'     },
          { displayHeader: 'نام خانوداگی'  , displayColumn: 'lastName'      },
          { displayHeader: 'نام کامل'      , displayColumn: 'fullName'      },
          { displayHeader: 'کد ملی'        , displayColumn: 'nationalNumber'},
          {
            displayHeader: 'عملیات'                , displayColumn: 'action',type: CellType.action,
            actions: [
              {
                type: ActionType.inlineTableButton,
                tooltip: 'انتخاب'                 , icon: IconEnum.select, color: "primary",
                onClick: (element: Personnel) => this.selectedPersonnel(element),
              }
            ]
          }
        ]
      }
    }
    // @formatter:on
  }

  // loadGrid() {
  //   const paramMap = new Map<string, any>();
  //   //paramMap.set('name', this.organizationSearchTitle);
  //   if (!this.formationFilter) {
  //     this.personnelService.getAllGridWithPagination(this.entitySearch, this.tableModel.pagination).subscribe((res: QueryResult<Personnel>) => {
  //         if (res && res.entityList) {
  //           this.entityList = res.entityList;
  //           this.dataSource.totalCount = res.totalRecords;
  //           this.dataSource.data = this.entityList
  //         }
  //       }
  //     )
  //   } else {
  //     this.personnelService.getByFormationFilter(new QueryParam(this.paginationInfo, paramMap)).subscribe(
  //       (res: QueryResult<Personnel>) => this.onSuccess(res));
  //   }
  //
  // }

  onPagination(pagination: Pagination) {
    this.paging = pagination;
    this.load();
  }

  private selectedPersonnel(element: Personnel) {
    this.dialogRef.close(element)
  }
}
