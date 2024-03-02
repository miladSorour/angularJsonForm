import {AfterViewInit, Component, Injector} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { CellType, TableType } from '../../../table/cv-table-widget/app-table.config';
import { BaseDialogComponentModel } from '../../../../model/base-dialog-component.model';
import { Group } from '../../../../model/group.model';
import { Pagination } from '../../../../model/pagination.model';
import { GroupService } from '../../../../service/group.service';
import { WidgetTypeModel } from '../../../../config/widget-type.model';
import { AppFormGroup } from '../../../../model/app-form-group';
import { AppContainerModel } from '../../../../json-form/model/app-container.model';
import { IconEnum } from '../../../../enum/icon.enum';
import { ActionType } from '../../../table/cv-table-widget/action-item-config';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-dialog-search-group',
  template: `
    <app-json-form [containerList]="dialogCrudContainer"></app-json-form>`
})
export class GroupSearchComponent extends BaseDialogComponentModel<Group> implements AfterViewInit {
  paging = new Pagination('e.id');

  constructor(private injector: Injector,
              public dialogRef: MatDialogRef<GroupSearchComponent>,
              private groupService: GroupService) {
    super(injector, groupService)
    this.initDialogContainer();
  }

  initDialogContainer() {
    this.dialogCrudContainer = [
      {
        widgetType: WidgetTypeModel.dialogTemplate,
        config: {
          pageTitle: this.dialogConfig.title,
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
          { name: 'groupType'        , inputType: WidgetTypeModel.hidden  , value: this.dialogConfig.dialogData.groupType                                 },
          { name: 'id'               , inputType: WidgetTypeModel.hidden                                             },
          { name: 'code'             , inputType: WidgetTypeModel.string  , placeholder: 'کد'   ,  cols: 6, rows: 1  },
          { name: 'name'             , inputType: WidgetTypeModel.string  , placeholder: 'عنوان',  cols: 6, rows: 1  },
        ],
        actions: [
          { title: 'جستجو', color: 'primary', onClick: (element: AppFormGroup<Group> ) => this.load()},
          { title: 'پاک کردن', color: 'warn', onClick: () => this.resetSearchForm(()=>this.searchFormGroup.patchValueOnField('groupType',this.dialogConfig.dialogData.groupType))}
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
        tableName: this.dialogConfig.title,
        dataSource: this.tableDataSource,
        pagination: this.paging,
        onPagination: (pagination: Pagination) => {
          this.onPagination(pagination);
        },
        columns: [
          {displayHeader: 'کد'   , displayColumn: 'code'        },
          {displayHeader: 'عنوان', displayColumn: 'name'        },
          { displayHeader: 'عملیات', displayColumn: 'action'  , type: CellType.action,
            actions: [
              {
                type: ActionType.inlineTableButton,
                tooltip: 'انتخاب'                 , icon: IconEnum.select, color: "primary",
                onClick: (element: Group) => this.selectedGroup(element),
              }
            ]
          }
        ]
      }
    }
    // @formatter:on
  }

  private selectedGroup(element: Group) {
    this.dialogRef.close(element)
  }

  quickSearch(name: string, code: string) {
    name = name ? name : code;
    code = code ? code : name;
    this.groupService.quickSearch(name ? name : '', code ? code : '').subscribe(res => {
      if (res) {
        this.entityList = res;
        this.tableDataSource.totalCount = res.length;
        this.tableDataSource.data = this.entityList
      }
    });
  }

  onPagination(pagination: Pagination) {
    this.paging = pagination;
    this.load();
  }
}
