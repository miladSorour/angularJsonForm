import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppContainerModel} from "../../../../../core/json-form/model/app-container.model";
import {Pagination} from "../../../../../core/model/pagination.model";
import {AppTableConfig, CellType, TableType} from "../../../../../core/widget/table/cv-table-widget/app-table.config";
import {AppTableDatasource} from "../../../../../core/widget/table/app-table-datasource";
import {WidgetTypeModel} from "../../../../../core/config/widget-type.model";
import {ActionType} from "../../../../../core/widget/table/cv-table-widget/action-item-config";
import {QueryResult} from "../../../../../core/model/queryResult.model";
import { IconEnum } from '../../../../enum/icon.enum';
import { UnitIdentity } from '../../../../model/unit-identity.model';
import { UnitIdentityService } from '../../../../service/unit-identity.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-unit-identity-search',
  templateUrl: './unit-identity-search.component.html'
})
export class UnitIdentitySearchComponent implements OnInit {
  pagination = new Pagination('e.id');
  containerList: AppContainerModel[];
  entityList   : UnitIdentity[] = [];
  tableModel   = new AppTableConfig();
  dataSource   = new AppTableDatasource<any>();
  entitySearch = new UnitIdentity();
  iconEnum     = new IconEnum();
  widgetTypeEnum = new WidgetTypeModel();

  @Input() public eventName: string;
  @Input() public formationFilter: false;
  private paginationInfo: Map<string, any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UnitIdentitySearchComponent>,
    private unitIdentityService: UnitIdentityService) {
  }

  ngOnInit(): void {
    this.initTable();
    this.loadGrid();
    let tableContainer = new AppContainerModel();
    tableContainer.widgetType = WidgetTypeModel.table
    tableContainer.config = this.tableModel;
    this.containerList = [tableContainer]
  }

  initTable() {
    // @formatter:off
    this.tableModel = {
      tableType: TableType.normal,
      tableName: 'ماهیت یگان',
      pagination: this.pagination,
      dataSource: this.dataSource,
      onPagination: (pagination: Pagination) => {
        this.onPagination(pagination);
      },
      columns: [
        { displayHeader: 'عنوان'        , displayColumn: 'title'     },
        { displayHeader: 'تعریف'        , displayColumn: 'definition'},
        { displayHeader: 'مصادیق'       , displayColumn: 'sample'    },
        {
          displayHeader: 'عملیات'       , displayColumn: 'action',type: CellType.action,
          actions: [
            {
              type: ActionType.inlineTableButton,
              tooltip: 'انتخاب'                 , icon: IconEnum.select, color: "primary",
              onClick: (element: UnitIdentity) => this.selectedUsers(element),
            }
          ]
        }
      ]
    }
    // @formatter:on
  }

  private onPagination(pagination: Pagination) {
    this.pagination = pagination;
    this.loadGrid()
  }

  loadGrid() {
    this.unitIdentityService.getAllGridWithPagination(this.entitySearch, this.tableModel.pagination).subscribe((res: QueryResult<UnitIdentity>) => {
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

  private selectedUsers(element: UnitIdentity) {
    this.dialogRef.close(element)
  }
}
