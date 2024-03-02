// @ts-nocheck
/**
 * Revision History:
 *    Date            Author           Task ID                         Notes
 * ==========   =================   ==============  ===============================================
 * 2021.11.17   milad.sorour                        CSO > WebUI > Table Widget
 */
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { AppTableConfig, CellType, Column } from './app-table.config';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActionItemConfig, ActionType } from './action-item-config';
import { EventEnum } from '../../../enum/event.enum';
import { Pagination } from '../../../model/pagination.model';
import { IconEnum } from '../../../enum/icon.enum';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as XLSX from 'xlsx';
import { PageEvent } from '@angular/material/paginator';
import { convertToShamsi } from '../../../Util/util-date';

// FIXME @autoUnsub
@Component({
  selector: 'app-table-widget',
  templateUrl: './app-table-widget.component.html',
})
// https://material.angular.io/components/table/examples
// <mat-text-column name="symbol" justify="end"></mat-text-column>
export class AppTableWidgetComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() data: AppTableConfig;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('table', { read: ElementRef, static: true }) table: ElementRef;
  @ViewChild('paginator', { static: true }) paginator;

  cellType: typeof CellType = CellType;
  actionType: typeof ActionType = ActionType;
  eventEnum = EventEnum;
  iconEnum = IconEnum;
  iconSize: SizeProp = 'lg';
  asideIconSizeProp: SizeProp = 'md';
  displayedColumns: string[] = Array();
  ActionType = ActionType;

  ngOnInit(): void {
    this.data?.dataSource?._pagination.subscribe((value: Pagination) => {
      this.paginator.pageIndex = value.page;
      this.paginator.length = value.totalItems;
      this.data.dataSource.totalCount = value.totalItems;
    });

    if (this.data.withLazySort === true) {
      if (this.sort.sortChange) {
        this.sort.sortChange.subscribe((page) => {
          if (this.data.dataSource.pagination && this.data.onPagination) {
            this.data.dataSource.pagination.predicate = page.active;
            this.data.dataSource.pagination.sortDirection = page.direction;
            this.data.onPagination(this.data.dataSource.pagination);
          }
        });
      }
    }
    this.displayedColumns = this.displayColumns();
  }

  displayColumns(): [] {
    let displayedColumns;
    let item = [];
    if (localStorage.getItem(this.data.tableName)) {
      item = JSON.parse(localStorage.getItem(this.data.tableName));
    }
    if (!this.data.displayedColumns) {
      displayedColumns = this.data.columns.map((c) => c.displayColumn);
    } else {
      displayedColumns = this.data.displayedColumns;
    }
    if (item && item.length === displayedColumns.length) {
      displayedColumns = item;
    } else if (item && item.length !== displayedColumns.length) {
      localStorage.removeItem(this.data.tableName);
    }
    return displayedColumns;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && !changes.data.firstChange) {
      this.data.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit(): void {
    this.data.dataSource.sortingDataAccessor = (item, property) => {
      const calcColumns = this.data.columns.filter(
        (column) =>
          column.displayColumn === property &&
          column.type === CellType.calculate
      );
      const selectionColumns = this.data.columns.filter(
        (column) =>
          column.displayColumn === property && column.type === CellType.checkBox
      );
      if (calcColumns && calcColumns.length > 0) {
        return this.calcDisplayColumn(item, calcColumns[0].calcDisplayColumn);
      } else if (selectionColumns && selectionColumns.length > 0) {
        return !selectionColumns[0].checkBox.selection.isSelected(item);
      } else {
        return item[property];
      }
    };
    this.data.dataSource.sort = this.sort;
  }

  rowClick(row: any) {
    if (this.data.rowClicked !== undefined) {
      return this.data.rowClicked(row, this.data.tableName);
    }
  }

  actionClicked(onClick: any, element: any) {
    return onClick(element, this.data.dataSource, this.data.tableName);
  }

  actionHide(hide: any, element: any) {
    return hide(element, this.data.dataSource, this.data.tableName);
  }

  calcDisplayColumn(element: any, displayColumn: any) {
    return displayColumn(element, this.data.dataSource, this.data.tableName);
  }

  getStringCallBackFunction(func: any, element: any): string {
    if (func && typeof func === 'string') {
      return func;
    } else if (func) {
      return func(element, this.data.dataSource, this.data.tableName);
    } else {
      return '';
    }
  }

  getIconCallBackFunction(func: any, element: any): IconProp {
    if (func) {
      return func(element, this.data.dataSource, this.data.tableName);
    } else {
      return null;
    }
  }

  getBooleanCallBackFunction(func: any, element: any): boolean {
    if (func && typeof func === 'boolean') {
      return func;
    } else if (func) {
      return func(element, this.data.dataSource, this.data.tableName);
    } else {
      return false;
    }
  }

  onSelectionChange(event: MatCheckboxChange, row: any, column: Column) {
    if (event) {
      if (!column.checkBox.selection.isMultipleSelection() && event.checked) {
        this.data.dataSource.data.forEach((itemRow) => {
          if (
            itemRow !== row &&
            (itemRow[column.displayColumn] ||
              column.checkBox.selection.isSelected(itemRow))
          ) {
            itemRow[column.displayColumn] = false;
            column.checkBox.selection.deselect(itemRow);
          }
        });
        column.checkBox.selection.select(row);
        row[column.displayColumn] = true;
      } else {
        column.checkBox.selection.toggle(row);
        row[column.displayColumn] = event.checked;
      }
      if (column.checkBox.onSelect) {
        return column.checkBox.onSelect(
          row,
          this.data.dataSource,
          this.data.tableName
        );
      }
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(column: Column) {
    const numSelected = column.checkBox.selection.selected.length;
    const numRows = this.data.dataSource.data.length;
    return numSelected === numRows;
  }

  selectAll(event: MatCheckboxChange, column: Column) {
    if (this.isAllSelected(column)) {
      this.data.dataSource.data.forEach((row) => {
        row[column.displayColumn] = event.checked;
        column.checkBox.selection.toggle(row);
      });
    } else {
      this.data.dataSource.data.forEach((row) => {
        row[column.displayColumn] = event.checked;
        column.checkBox.selection.select(row);
      });
    }
    if (column.checkBox.onSelectAll) {
      return column.checkBox.onSelectAll(
        column,
        this.data.dataSource,
        this.data.tableName
      );
    }
  }

  getActionRowCol(column: Column, element: any): string {
    let rowCol = 1;
    column.actions.forEach((action) => {
      if (!this.getBooleanCallBackFunction(action.hide, element)) {
        rowCol += 1;
      }
    });
    return rowCol.toString();
  }

  setPaginationData(event: PageEvent) {
    if (!this.data.dataSource.pagination) {
      this.data.dataSource.pagination = new AppPaginationDatasource();
    }
    const pagination = this.data.dataSource.pagination;
    pagination.itemsPerPage = event.pageSize;
    pagination.page = event.pageIndex;
    pagination.totalItems = event.length;
    pagination.previousPage = event.previousPageIndex;
    this.data.dataSource.pagination = pagination;
    if (this.data.onPagination) {
      this.data.onPagination(this.data.dataSource.pagination);
    }
  }

  getDropDownAction(actions: ActionItemConfig[]): ActionItemConfig[] {
    return actions.filter(
      (action) => action.type === ActionType.dropDownButton
    );
  }

  changeColumnPositionAfterDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
    localStorage.setItem(
      this.data.tableName,
      JSON.stringify(this.displayedColumns)
    );
  }

  exportExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.data.tableName + '.xlsx');
  }

  calcSortHeader(column: Column): string {
    if (!this.data.withLazySort) {
      return column.displayColumn;
    } else {
      if (column.onLazySort) {
        return column.onLazySort;
      } else {
        return 'e.' + column.displayColumn;
      }
    }
  }
  public test() {
    console.log('call from parent');
  }

  public getShamsiDate(value: string) {
    convertToShamsi(value);
  }
}
