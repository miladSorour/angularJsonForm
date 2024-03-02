import {AppTableDatasource} from '../app-table-datasource';
import {CheckBoxOption} from '../check-box-option.model';
import {ImageOption} from '../image-option.model';
import {Pagination} from '../../../model/pagination.model';
import {AppTableActionModel} from './app-table-action.model';
import {CssEnum} from '../../../constant/css.enum';

export class AppTableConfig {
  pagination?: Pagination;
  tableType ?: TableType;
  tableName: string;
  dataSource = new AppTableDatasource<any>();
  columns: Column[];
  rowClicked?: any;
  rowDoubleClicked?: any;
  rowCSS?: any;
  rowColor?: any;
  displayedColumns?: string[] = [];
  maxHeight?: string;
  onPagination?: (pagination: Pagination) => any
  onExport?: any;
  withLazySort?: boolean;
}

export class Column {
  displayHeader: string;
  displayColumn: string;
  calcDisplayColumn?: any;
  type?: CellType;
  actions?: AppTableActionModel[];
  // todo  define the pipe with type
  pipe?: any;
  pipeArg?: any[];
  tooltip?: any;
  checkBox?: CheckBoxOption;
  headerCSS ?: string;
  columnCSS?: CssEnum;
  displayColumnCSS?: CssEnum
  image?: ImageOption;
  // TODO add justify to html
  justify?: 'center' | 'right' | 'left' = 'left';
  nestedColumn ?: nestedColumn;
  onLazySort ?: string;
  icon?: (selectedRow: any, datasource: AppTableDatasource<any>, tableName: string) => any;
  hide ?: () => any;
  hasAuthority ?: () => string | string[];
}

export enum CellType {
  normal,
  action,
  checkBox,
  calculate,
  image,
  pickList,
  innerHtml,
  icon,
  progressBar,
  nested,
  date
}

export enum TableType {
  normal = '',
  small = 'small-table',
  small_tree_table = 'small-tree-table',
}

export class nestedColumn {
  align: 'vertical' | 'horizontal' = 'vertical';
  nestedColumn: string;
}

