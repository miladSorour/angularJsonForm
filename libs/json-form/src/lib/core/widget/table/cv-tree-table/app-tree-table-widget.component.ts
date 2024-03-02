// @ts-nocheck
import {
	ChangeDetectorRef,
	Component,
	DoCheck,
	EventEmitter,
	Input,
	KeyValueDiffer,
	KeyValueDiffers,
	OnChanges,
	OnInit,
	Output,
	QueryList,
	SimpleChanges,
	ViewChild,
	ViewChildren
} from '@angular/core';
import {AppTreeTableConfig, Option} from './app-tree-table.config';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NodeModel} from './node.model';
import {RequiredDecorator} from '../../../decorator/required.decorator';
import {AppTableConfig, CellType, Column} from '../cv-table-widget/app-table.config';
import {ActionItemConfig, ActionType} from '../cv-table-widget/action-item-config';
import {IconEnum} from '../../../enum/icon.enum';

// https://material.angular.io/components/table/examples
// <mat-text-column name="symbol" justify="end"></mat-text-column>
@Component({
	selector: 'app-tree-table',
	templateUrl: './app-tree-table-widget.component.html',
	styleUrls: ['app-tree-table-widget.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', padding: '0px'})),
			state('expanded', style({height: '*', padding: '3px', 'padding-right': '0'})),
			transition(
				'expanded <=> collapsed',
				animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
			)
		])
	]
})
// eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
export class AppTreeTableWidgetComponent implements OnInit, DoCheck {
	@ViewChild('outerSort', {static: true}) sort: MatSort;
	@ViewChildren('innerSort') innerSort: QueryList<MatSort>;
	@ViewChildren('innerTables') innerTables: QueryList<MatTable<any>>;

  @Input() @RequiredDecorator data: AppTreeTableConfig;
  cellType = CellType;
  ActionType = ActionType;
  iconEnum = IconEnum;


  dataSource = new MatTableDataSource<NodeModel>();
  displayedColumns:any = [];
  displayedHeader :any = [];
	selectedRow: EventEmitter<any> = new EventEmitter<any>();
	differ: KeyValueDiffer<any, any>;
	filteredValues = {};

	public static compareFunction(firstNode: NodeModel, secondNode: NodeModel, event: Sort): number {
		const sortDir = event.direction === 'asc' ? 1 : -1;
		if (firstNode.value[event.active] > secondNode.value[event.active]) {
			return sortDir;
		} else if (firstNode.value[event.active] < secondNode.value[event.active]) {
			return -1 * sortDir;
		} else {
			return 0;
		}
	}

	constructor(
		private cd: ChangeDetectorRef,
		private differs: KeyValueDiffers) {
		this.differ = this.differs.find({}).create();
	}

	ngOnInit() {
    this.displayColumns()
		//this.dataSource.filterPredicate = this.customFilterPredicate();
    this.data.datasource._dataChange.subscribe(data => {
      this.dataSource.data = data
    });
	}

  displayColumns() {
    let length = this.data.tablesConfig.length;
    for (let i = 0; i < length; i++) {
      let appTableConfig = this.data.tablesConfig[i];
      this.displayedColumns.push(appTableConfig.columns.map(c => c.displayColumn))
      this.displayedHeader.push(appTableConfig.columns.map(c => c.displayHeader))
    }
  }

  getActionRowCol(column: Column, element: any): string {
    let rowCol = 1;
    column.actions.forEach(action => {
      if (!this.getBooleanCallBackFunction(action.hide, element)) {
        rowCol += 1;
      }
    });
    return rowCol.toString();
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

  actionClicked(onClick: any, element: any) {
    return onClick(element, this.data.dataSource, this.data.tableName);
  }

  getDropDownAction(actions: ActionItemConfig[]): ActionItemConfig[] {
    return actions.filter(action => action.type === ActionType.dropDownButton);
  }

  calcSortHeader(column: Column): string {
    if (!this.data.withLazySort) {
      return column.displayColumn
    } else {
      if (column.onLazySort) {
        return column.onLazySort
      } else {
        return "e." + column.displayColumn;
      }
    }
  }

  calcDisplayColumn(element: any, displayColumn: any) {
    return displayColumn(element, this.data.dataSource, this.data.tableName);
  }

	ngDoCheck(): void {
		//const change = "this.differ.diff(this.option.filterValue)";
    const change = "";
    if (change) {
			change.forEachChangedItem(item => {
				// @ts-ignore
        this.filteredValues[item.key] = item.currentValue;
			});
			this.applyFilter1();
		}
	}

	applyFilter(filterValue: string) {
		this.innerTables.forEach(table => {
			(table.dataSource as MatTableDataSource<NodeModel>).filter = filterValue.trim().toLowerCase();
		});
	}

	nodeClicked(event: NodeModel) {
		this.selectedRow.emit(event);
	}

	toggleRow(element: NodeModel) {
		if (element.children && element.children.length) {
			this.toggleElement(element);
		}
		this.cd.detectChanges();
		this.innerTables.forEach(
			(table, index) =>
				((table.dataSource as MatTableDataSource<NodeModel>).sort = this.innerSort.toArray()[index])
		);
	}

	isExpanded(row: NodeModel): string {
		if (row.expanded) {
			return 'expanded';
		} else {
			return 'collapsed';
		}
	}

	toggleElement(row: NodeModel) {
		row.expanded = !row.expanded;
	}

	actionOnClick(onClick: any, element) {
		return onClick(element);
	}

	private customFilterPredicate() {
		return (data: any, filters: any) => {
			let myMap = null;
			if (filters !== '{}') {
				myMap = new Map(Object.entries(JSON.parse(filters)));
			}
			const matchFilter = [];
			if (myMap == null) {
				return true;
			} else {
				// Or if you don't want to specify specifics columns =>
				// const columns = (<any>Object).values(data);
				// Main loop
				data.children.forEach(child => {
					const customFilter = [];
					myMap.forEach((value: any, key: any) => {
						customFilter.push(child.value[key] === value);
					});
					matchFilter.push(customFilter.every(Boolean)); // AND
				});
				return matchFilter.some(Boolean); // OR
			}
		};
	}

	applyFilter1() {
		this.dataSource.filter = JSON.stringify(this.filteredValues);
	}

	getColumnCSS(columnCSS: any, element) {
		if (columnCSS && typeof columnCSS === 'string') {
			return columnCSS;
		} else if (columnCSS) {
			return columnCSS(element, this.dataSource);
		} else {
			return '';
		}
	}

	sortOuterTable(event: Sort) {
		if (event.direction === '') {
			this.dataSource.data = JSON.parse(JSON.stringify(this.dataSource));
		} else {
			this.dataSource.data = JSON.parse(JSON.stringify(this.dataSource)).sort(
				(firstNode: NodeModel, secondNode: NodeModel) => AppTreeTableWidgetComponent.compareFunction(firstNode, secondNode, event)
			);
		}
	}

	sortInnerTable(event: Sort, element: NodeModel) {
		const temp = JSON.parse(JSON.stringify(this.dataSource)).filter(item => element.value.orderListID === item.value.orderListID);
		const tempChild = temp[0].children;
		if (event.direction === '') {
			element.children = tempChild;
		} else {
			element.children = tempChild.sort((node1: NodeModel, node2: NodeModel) => AppTreeTableWidgetComponent.compareFunction(node1, node2, event)
			);
		}
	}

  getStringCallBackFunction(func: any | undefined, element: any): string {
    if (func && typeof func === 'string') {
      return func;
    } else if (func) {
      return func(element, this.data.dataSource, this.data.tableName);
    } else {
      return '';
    }
  }
}



