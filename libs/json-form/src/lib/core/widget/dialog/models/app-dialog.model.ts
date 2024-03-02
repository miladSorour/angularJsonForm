import {ActionItemConfig} from '../../table/cv-table-widget/action-item-config';
import {AppContainerModel} from '../../../json-form/model/app-container.model';
import {DialogSizeEnum} from './dialog-size.enum';

export class AppDialogModel {
  size?: DialogSizeEnum = DialogSizeEnum.lg;
  title?: string;
  container?: AppContainerModel[];
  actionButton?: ActionItemConfig[];
  dialogData?: any
  onClose?: (callBackParam : any) => any;
}
