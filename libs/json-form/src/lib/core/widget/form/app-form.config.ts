import {AppBaseJsonFormModel} from '../../json-form/model/app-base-json-form.model';
import {AppFormGroup} from '../../model/app-form-group';
import {AppFormActionModel} from './app-form-action.model';
import {AppBaseInfoFormControlModel} from './app-baseinfo-form-control.model';
import {AppFormControlModel} from './app-form-control.model';
import {AppEnumFormControlModel} from './app-enum-form-control.model';
import {AppFormControlDatasource} from './app-form-control-datasource';

export class AppFormConfig extends AppBaseJsonFormModel {
  isDynamicControl: boolean;
  formGroup: AppFormGroup<any>
  formControl?: AppFormControlModel[] | AppBaseInfoFormControlModel[] | AppEnumFormControlModel | any;
  actions: AppFormActionModel[];
  actionsDisplay: boolean
  dynamicFormControl: AppFormControlDatasource;
  formTitle: string;
}
