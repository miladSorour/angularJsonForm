/*
 *  Copyright © Financia [2014-Date] All Rights Reserved.
 *  No part of this program may be reproduced without express written consent by Financia.
 *
 *  This SOURCE CODE FILE, which has been provided by Financia as part
 *  of a Financia product for use ONLY by licensed users of the product,
 *  includes CONFIDENTIAL and PROPRIETARY information of Financia.
 *
 *  USE OF THIS SOFTWARE IS GOVERNED BY THE TERMS AND CONDITIONS
 *  OF THE LICENSE STATEMENT AND LIMITED WARRANTY FURNISHED WITH
 *  THE PRODUCT.
 *
 *  IN PARTICULAR, YOU WILL INDEMNIFY AND HOLD FINANCIA, ITS RELATED
 *  COMPANIES AND ITS SUPPLIERS, HARMLESS FROM AND AGAINST ANY
 *  CLAIMS OR LIABILITIES ARISING OUT OF THE USE, REPRODUCTION, OR
 *  DISTRIBUTION OF YOUR PROGRAMS, INCLUDING ANY CLAIMS OR LIABILITIES
 *  ARISING OUT OF OR RESULTING FROM THE USE, MODIFICATION, OR
 *  DISTRIBUTION OF PROGRAMS OR FILES CREATED FROM, BASED ON, AND/OR
 *  DERIVED FROM THIS SOURCE CODE FILE.
 */
// @ts-nocheck
import {Column, TableType} from '../cv-table-widget/app-table.config';
import {AppTreeTableDatasource} from './app-tree-table-datasource';
import {CssEnum} from '../../../constant/css.enum';

/**
 * //TODO explain Functionality of this class
 * Revision History:
 *    Date            Author           Task ID                         Notes
 * ==========   =================   ==============  ===============================================
 * 2021.10.26   m.sorour                             https://github.com/mlrv/ng-material-treetable
 */
export class AppTreeTableConfig {
  datasource: AppTreeTableDatasource;
  tablesConfig: TreeTableConfig[];
}

export class TreeTableConfig {
  tableType ?: TableType;
  tableName: string;
  columns: Column[];
  rowClicked?: any;
  rowDoubleClicked?: any;
  rowCSS?: CssEnum;
  rowColor?: any;
}
