import {ActionItemConfig} from '../table/cv-table-widget/action-item-config';
import {AppFormGroup} from '../../model/app-form-group';

export class AppFormActionModel extends ActionItemConfig {
  onClick: (appFormGroup: AppFormGroup<any>) => any
}
