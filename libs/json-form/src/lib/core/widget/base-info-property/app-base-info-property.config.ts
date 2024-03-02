import {AppFormControlDatasource} from '../form/app-form-control-datasource';
import {AppFormGroup} from '../../model/app-form-group';
import { TableIndexEnum } from '../../enum/table-index.enum';

export class AppBaseInfoPropertyConfig {
  headerId: ()=> number | string;
  entityId: ()=> number | string;
  dynamicFormControl: AppFormControlDatasource;
  formGroup: AppFormGroup<any>;
  tableType: TableIndexEnum;
}
