/**
 * Revision History:
 *    Date            Author           Task ID                         Notes
 * ==========   =================   ==============  ===============================================
 * 2022.01.25   milad.sorour
 */

import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject} from 'rxjs';
import {Pagination} from '../../model/pagination.model';

export class AppTableDatasource<T> extends MatTableDataSource<T> {
  totalCount: number | undefined
  _pagination = new BehaviorSubject<any>({});

  get pagination(): Pagination {
    return this._pagination.value;
  }

  set pagination(value: Pagination) {
    this._pagination.next(value);
  }

}

