import {WidgetTypeConfig, WidgetTypeModel} from '../../config/widget-type.model';
import {AppBaseJsonFormModel} from '../../json-form/model/app-base-json-form.model';
import {AppFormGroup} from '../../model/app-form-group';
import { AppFormConfig } from './app-form.config';

export class AppFormControlModel extends AppBaseJsonFormModel {
  name: string;
  inputType: WidgetTypeConfig;
  placeholder: string;
  value?: any;
  validators?: any[];
  config?: any;
  selectedTitle?: string;
  formControl?: AppFormControlModel[];
  formArray?: AppFormConfig;
  accordion?: { title: string, description: string, panel: AppFormControlModel[] }[];
  groupType?: 'userGroup' | 'group'
  onBlur?: (event: any) => void;
  onDisabled?: (appFormGroup: AppFormGroup<any>) => boolean;
  onChangeValue?: (result: any) => any;
}
