import {AppFormGroup} from '../../model/app-form-group';

export class AppBaseJsonFormModel {
  cols?: number;
  rows?: number;
  hide?: (formGroup: AppFormGroup<any>) => void;
}
