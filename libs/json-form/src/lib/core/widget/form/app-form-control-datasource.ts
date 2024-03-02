import {BehaviorSubject, distinct, of} from 'rxjs';
import {AppFormControlModel} from './app-form-control.model';
import * as milad from 'lodash';

export class AppFormControlDatasource {

  _dataChange = new BehaviorSubject<any[]>([]);

  get data(): any[] {
    return this._dataChange.value;
  }

  set data(value: any[]) {
    let unionBy = milad.unionBy(value, 'name');
    this._dataChange.next(unionBy);
  }
}

