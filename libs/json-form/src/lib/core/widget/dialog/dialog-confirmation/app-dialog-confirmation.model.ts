import {DialogSizeEnum} from '../models/dialog-size.enum';

export class AppDialogConfirmationModel {
  cancelButtonLabel ?: string;
  confirmButtonLabel?: string;
  icon              ?: string;
  content           ?: string;
  size?: DialogSizeEnum = DialogSizeEnum.xs;
  onClose            : (callBackParam: any) => any;
}

