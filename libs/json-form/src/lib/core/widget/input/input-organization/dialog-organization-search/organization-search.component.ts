import {AfterViewInit, Component, Injector} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { CellType, TableType } from '../../../table/cv-table-widget/app-table.config';
import { BaseDialogComponentModel } from '../../../../model/base-dialog-component.model';
import { Pagination } from '../../../../model/pagination.model';
import { WidgetTypeModel } from '../../../../config/widget-type.model';
import { AppContainerModel } from '../../../../json-form/model/app-container.model';
import { IconEnum } from '../../../../enum/icon.enum';
import { ActionType } from '../../../table/cv-table-widget/action-item-config';
import { OrganizationService } from '../../../../service/organization.service';
import { Organization } from '../../../../model/organization.model';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-dialog-search-organization',
  template: `
    <app-json-form [containerList]="dialogCrudContainer"></app-json-form>`
})
export class OrganizationSearchComponent extends BaseDialogComponentModel<Organization> implements AfterViewInit {
  paging = new Pagination('e.id');

  constructor(private injector: Injector,
              public dialogRef: MatDialogRef<OrganizationSearchComponent>,
              private organizationService: OrganizationService) {
    super(injector, organizationService);
    this.initDialogContainer();
  }

  initDialogContainer() {
    this.dialogCrudContainer = [
      {
        widgetType: WidgetTypeModel.dialogTemplate,
        config: {
          pageTitle: 'سازمان',
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
          { name: 'id'               , inputType: WidgetTypeModel.hidden                                                  },
          { name: 'name'             , inputType: WidgetTypeModel.string       , placeholder: 'عنوان',  cols: 6, rows: 1  },
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
        tableName: 'سازمان',
        dataSource: this.tableDataSource,
        pagination: this.paging,
        onPagination: (pagination: Pagination) => {
          this.onPagination(pagination);
        },
        columns: [
          {displayHeader: 'عنوان '          , displayColumn: 'name'                               },
          {displayHeader: 'موقعیت جفرافیایی', displayColumn: 'location' ,type: CellType.calculate,
            calcDisplayColumn: (element: any) => {return element.location.title}                  },
          { displayHeader: 'عملیات'         , displayColumn: 'action'  , type: CellType.action,
            actions: [
              {
                type: ActionType.inlineTableButton,
                tooltip: 'انتخاب'                 , icon: IconEnum.select, color: "primary",
                onClick: (element: Organization) => this.selectedOrganization(element),
              }
            ]
          }
        ]
      }
    }
    // @formatter:on
  }

  private selectedOrganization(element: Organization) {
    this.dialogRef.close(element)
  }

  onPagination(pagination: Pagination) {
    this.paging = pagination;
    this.load();
  }
}
