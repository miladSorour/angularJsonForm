import {FormGroup} from '@angular/forms';
import {createFormGroup, createFormGroupByDataSource} from '../Util/util-crud';
import {AppFormControlDatasource} from '../widget/form/app-form-control-datasource';
import {AppFormControlModel} from '../widget/form/app-form-control.model';

export class AppFormGroup<T> extends FormGroup {

  getFormGroup(): AppFormGroup<T> {
    return this;
  }

  getFormValue(): any {
    return this.getRawValue();
  }

  patchValue(value: T): any {
    super.patchValue(value);
  }

  patchValueOnField(columnName: string, value: any) {
    this.controls[columnName].patchValue(value);
  }

  getColumnValue(controlName: string): number | string | object | any {
    return this.get(controlName)?.value!
  }

  createFormGroupByDataSource(formControl : AppFormControlDatasource) {
    createFormGroupByDataSource(formControl, this);
  }

  createFormGroup(formControl : AppFormControlModel[] | any) {
    createFormGroup(formControl, this);
  }

  disableColumn(controlName: string) {
    this.get(controlName)?.disable()
  }

  enableColumn(controlName: string) {
    this.get(controlName)?.disable()
  }

  disableFormGroup() {
    this.disable();
  }

  reset() {
    super.reset();
  }
}
