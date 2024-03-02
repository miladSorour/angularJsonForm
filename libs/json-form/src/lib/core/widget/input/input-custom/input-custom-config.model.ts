import {AppContainerModel} from "../../../json-form/model/app-container.model";
import {DialogSizeEnum} from "../../dialog/models/dialog-size.enum";

export class InputCustomConfigModel {
  containerList : AppContainerModel;
  dialogSize : DialogSizeEnum;
  dialogModel : any;
  id : number;
  name : string;
}
