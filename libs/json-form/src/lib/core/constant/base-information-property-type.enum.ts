import {WidgetTypeConfig, WidgetTypeModel} from "../config/widget-type.model";

// @formatter:off
export class BaseInformationPropertyTypeConfig {
  index     : number;
  inputType : WidgetTypeConfig;
}

export class BaseInformationPropertyTypeEnum {
    0  : BaseInformationPropertyTypeConfig = {index: 0, inputType: WidgetTypeModel.string     }; // متنی
    1  : BaseInformationPropertyTypeConfig = {index: 1, inputType: WidgetTypeModel.number     }; //عددی
    2  : BaseInformationPropertyTypeConfig = {index: 2, inputType: WidgetTypeModel.switch     }; // بولین(صحیح/غلط)
    3  : BaseInformationPropertyTypeConfig = {index: 3, inputType: WidgetTypeModel.baseInfo   }; //لیستی
    4  : BaseInformationPropertyTypeConfig = {index: 4, inputType: WidgetTypeModel.dateAndTime}; // تاریخ
}
