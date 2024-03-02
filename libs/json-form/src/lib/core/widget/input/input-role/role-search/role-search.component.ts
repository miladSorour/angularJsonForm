import {AfterViewInit, Component, Injector} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import { CellType, TableType } from '../../../table/cv-table-widget/app-table.config';
import { BaseDialogComponentModel } from '../../../../model/base-dialog-component.model';
import { Pagination } from '../../../../model/pagination.model';
import { WidgetTypeModel } from '../../../../config/widget-type.model';
import { AppContainerModel } from '../../../../json-form/model/app-container.model';
import { IconEnum } from '../../../../enum/icon.enum';
import { ActionType } from '../../../table/cv-table-widget/action-item-config';
import { RoleService } from "../../../../service/role.service";
import { Role } from "../../../../model/role.model";
import { CssEnum } from "../../../../constant/css.enum";


@Component({
  selector: 'app-dialog-search-role',
  template: `
    <app-json-form [containerList]="dialogCrudContainer"></app-json-form>`
})
export class RoleSearchComponent extends BaseDialogComponentModel<Role> implements AfterViewInit {
  containerList: AppContainerModel[];
  paging = new Pagination('e.id');

  constructor(private injector: Injector,
              public dialogRef: MatDialogRef<RoleSearchComponent>,
              private roleService: RoleService,
  ) {
    super(injector, roleService);
    this.initDialogContainer();
  }

  initDialogContainer() {
    this.dialogCrudContainer = [
      {
        widgetType: WidgetTypeModel.dialogTemplate,
        config: {
          pageTitle: 'نقش(پست های) سامانه',
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

  /**
   * بارگزاری اطلاعات براساس کد گروه
   */
  beforeLoadGrid() {
    super.beforeLoadGrid();
    if (this.dialogConfig.dialogData && this.dialogConfig.dialogData.readOnly) {
      this.entitySearch.groupId = this.dialogConfig.dialogData.element.key;
      this.searchFormGroup.patchValueOnField('groupId', this.dialogConfig.dialogData.element.key);
    }
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
          { name: 'organizationId'   , inputType: WidgetTypeModel.organization , placeholder: 'یگان',   cols: 6, rows: 1, selectedTitle: 'organizationName' },
          { name: 'groupId'          , inputType: WidgetTypeModel.group        , placeholder: '.', cols: 6, rows: 1, selectedTitle: 'groupName'        },
          { name: 'title'            , inputType: WidgetTypeModel.string       , placeholder: 'عنوان',  cols: 6, rows: 1                                    },
          { name: 'organizationName' , inputType: WidgetTypeModel.hidden                                                                                    },
          { name: 'groupName'        , inputType: WidgetTypeModel.hidden                                                                                    },
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
      cols: 12,                     rows: 1,
      config: {
        tableType: TableType.normal,
        tableName: 'نقش(پست های) سامانه',
        dataSource: this.tableDataSource,
        pagination: this.paging,
        onPagination: (pagination: Pagination) => {
          this.onPagination(pagination);
        },
        columns: [
          { displayHeader: 'عنوان ', displayColumn: 'title'                                                      },
          { displayHeader: 'سازمان', displayColumn: 'organizationName'                                           },
          { displayHeader: '.', displayColumn: 'groupName'        , displayColumnCSS: CssEnum.BADGE_PRIMARY },
          { displayHeader: 'وضعیت ', displayColumn: 'enable'           , type: CellType.icon                      ,
             icon: (element: Role)=> element.enable ? IconEnum.check : IconEnum.xMark                            },
          {  displayHeader: 'عملیات', displayColumn: 'action'  , type: CellType.action,
            actions: [
              {
                type: ActionType.inlineTableButton,
                tooltip: 'انتخاب'                 , icon: IconEnum.select, color: "primary",
                onClick: (element: Role) => this.selectedRole(element),
              }
            ]
          }
        ]
      }
    }
    // @formatter:on
  }

  private selectedRole(element: Role) {
    this.dialogRef.close(element)
  }

  onPagination(pagination: Pagination) {
    this.paging = pagination;
    this.load();
  }

}
