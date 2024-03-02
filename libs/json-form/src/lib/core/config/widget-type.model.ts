import {ComponentType} from '@angular/cdk/portal';
import {InputStringComponent} from '../widget/input/input-string/input-string.component';
import {InputNumberComponent} from '../widget/input/input-number/input-number.component';
import {AppButtonComponent} from '../widget/button/app-button.component';
import {InputCheckboxComponent} from '../widget/input/input-checkbox/input-checkbox.component';
import {InputDateComponent} from '../widget/input/input-date/input-date.component';
import {InputBaseInformationComponent} from '../widget/input/input-base-Information/input-base-information.component';
import {InputEnumComponent} from '../widget/input/input-enum/input-enum.component';
import {FileUploaderComponent} from '../widget/input/file/file-uploader.component';
import {InputSliderComponent} from '../widget/input/input-slider/input-slider.component';
import {AppTabComponent} from '../widget/tab/app-tab.component';
import {AppTreeComponent} from '../widget/tree/app-tree.component';
import {AppTableWidgetComponent} from '../widget/table/cv-table-widget/app-table-widget.component';
import {AppLineChartComponent} from '../widget/chart/line-chart/app-line-chart.component';
import {AppFormWidgetComponent} from '../widget/form/app-form-widget.component';
import {OffCanvasComponent} from '../widget/off-canvas/off-canvas.component';
import {AppCrudTemplateComponent} from '../widget/crud-template/app-crud-template.component';
import {AppDialogTemplateComponent} from '../widget/dialog-template/app-dialog-template.component';
import {
  InputBaseInformationHeaderComponent
} from "../widget/input/input-base-Information-header/input-base-information-header.component";
import {InputSwitchComponent} from '../widget/input/input-switch/input-switch.component';
import {ACInputOrganizationComponent} from '../widget/input/input-organization/a-c-input-organization.component';
import {AppInputPersonnelComponent} from '../widget/input/input-personel/input-personnel.component';
import {ACInputGroupComponent} from '../widget/input/input-group/a-c-input-group.component';
import {AppInputUsersComponent} from '../widget/input/input-users/input-users.component';
import {AppInputRoleComponent} from '../widget/input/input-role/input-role.component';
import {AttachmentComponent} from "../widget/attachment/attachment.component";
import {AppTreeTableWidgetComponent} from '../widget/table/cv-tree-table/app-tree-table-widget.component';
import {BaseInfoPropertyWidgetComponent} from '../widget/base-info-property/base-info-property-widget.component';
import {DigitalArchiveCardComponent} from "../widget/digital-archive-card/digital-archive-card.component";
import {InputBaseInformationTreeComponent} from "../widget/input/input-base-Information/input-base-Information-tree/input-base-information-tree.component";
import {InputOptionComponent} from "../widget/input/input-option/input-option.component";
import {InputCustomComponent} from "../widget/input/input-custom/input-custom.component";
import {InputLocationComponent} from "../widget/input/input-location/input-location.component";
import { AppBarChartComponent } from '../widget/chart/bar-chart/app-bar-chart.component';
import { AppPieChartComponent } from '../widget/chart/pie-chart/app-pie-chart.component';
import { InputTreeSwitchComponent } from '../widget/input/input-tree-switch/input-tree-switch.component';
import { AppDividerComponent } from '../widget/divider/app-divider.component';
import { InputColorComponent } from '../widget/input/input-color/input-color.component';
import { InputFormArrayComponent } from '../widget/input/input-form-array/input-form-array.component';
import { AppCrudTemplateToggleBaseComponent } from '../widget/crud-template-toggle-base/app-crud-template-toggle-base.component';

// @formatter:off
export class WidgetTypeConfig {
  name     : string;
  component: ComponentType<any>
  config  ?: Map<any,any>
}

export class WidgetTypeModel {
  static string                  : WidgetTypeConfig = { name: 'string              '  , component: InputStringComponent                               };
  static password                : WidgetTypeConfig = { name: 'password            '  , component: InputStringComponent                               };
  static number                  : WidgetTypeConfig = { name: 'number              '  , component: InputNumberComponent                               };
  static button                  : WidgetTypeConfig = { name: 'button              '  , component: AppButtonComponent                                 };
  static checkbox                : WidgetTypeConfig = { name: 'checkbox            '  , component: InputCheckboxComponent                             };
  static textArea                : WidgetTypeConfig = { name: 'textArea            '  , component: null                                               };
  static dateAndTime             : WidgetTypeConfig = { name: 'dateAndTime         '  , component: InputDateComponent                                 };
  static baseInfo                : WidgetTypeConfig = { name: 'baseInfo            '  , component: InputBaseInformationComponent                      };
  static baseInfoTree            : WidgetTypeConfig = { name: 'baseInfoTree        '  , component: InputBaseInformationTreeComponent                  };
  static enum                    : WidgetTypeConfig = { name: 'enum                '  , component: InputEnumComponent                                 };
  static switch                  : WidgetTypeConfig = { name: 'switch              '  , component: InputSwitchComponent                               };
  static treeSwitch              : WidgetTypeConfig = { name: 'treeSwitch          '  , component: InputTreeSwitchComponent                           };
  static fileUploader            : WidgetTypeConfig = { name: 'fileUploader        '  , component: FileUploaderComponent                              };
  static range                   : WidgetTypeConfig = { name: 'range               '  , component: InputSliderComponent                               };
  static tab                     : WidgetTypeConfig = { name: 'tab                 '  , component: AppTabComponent                                    };
  static attachment              : WidgetTypeConfig = { name: 'attachment          '  , component: AttachmentComponent                                };
  static tree                    : WidgetTypeConfig = { name: 'tree                '  , component: AppTreeComponent                                   };
  static table                   : WidgetTypeConfig = { name: 'table               '  , component: AppTableWidgetComponent                            };
  static treeTable               : WidgetTypeConfig = { name: 'treeTable           '  , component: AppTreeTableWidgetComponent                        };
  static carousel                : WidgetTypeConfig = { name: 'carousel            '  , component: null                                               };
  static lineChart               : WidgetTypeConfig = { name: 'lineChart           '  , component: AppLineChartComponent                              };
  static barChart                : WidgetTypeConfig = { name: 'barChart            '  , component: AppBarChartComponent                               };
  static pieChart                : WidgetTypeConfig = { name: 'pieChart            '  , component: AppPieChartComponent                               };
  static donatChart              : WidgetTypeConfig = { name: 'donatChart            '  , component: null                                             };
  static form                    : WidgetTypeConfig = { name: 'form                '  , component: AppFormWidgetComponent                             };
  static organization            : WidgetTypeConfig = { name: 'organization        '  , component: ACInputOrganizationComponent                       };
  static personnel               : WidgetTypeConfig = { name: 'personnel           '  , component: AppInputPersonnelComponent                         };
  static users                   : WidgetTypeConfig = { name: 'users               '  , component: AppInputUsersComponent                             };
  static group                   : WidgetTypeConfig = { name: 'group               '  , component: ACInputGroupComponent                              };
  static offCanvas               : WidgetTypeConfig = { name: 'offCanvas           '  , component: OffCanvasComponent                                 };
  static crudTemplate            : WidgetTypeConfig = { name: 'crud                '  , component: AppCrudTemplateComponent                           };
  static crudTemplateToggleBase  : WidgetTypeConfig = { name: 'crudToggleBase      '  , component: AppCrudTemplateToggleBaseComponent                 };
  static dialogTemplate          : WidgetTypeConfig = { name: 'dialogTemplate      '  , component: AppDialogTemplateComponent                         };
  static hidden                  : WidgetTypeConfig = { name: 'hidden              '  , component: null                                               };
  static baseInfoHeader          : WidgetTypeConfig = { name: 'baseInfoHeader      '  , component: InputBaseInformationHeaderComponent                };
  static select                  : WidgetTypeConfig = { name: 'select              '  , component: null                                               };
  static role                    : WidgetTypeConfig = { name: 'role                '  , component: AppInputRoleComponent                              };
  static digitalArchiveCard      : WidgetTypeConfig = { name: 'digitalArchiveCard  '  , component: DigitalArchiveCardComponent                        };
  static baseInfoProperty        : WidgetTypeConfig = { name: 'baseInfoProperty    '  , component: BaseInfoPropertyWidgetComponent                    };
  static location                : WidgetTypeConfig = { name: 'location            '  , component: InputLocationComponent                             };
  static option                  : WidgetTypeConfig = { name: 'option              '  , component: InputOptionComponent                               };
  static custom                  : WidgetTypeConfig = { name: 'custom              '  , component: InputCustomComponent                               };
  static divider                 : WidgetTypeConfig = { name: 'divider             '  , component: AppDividerComponent                                };
  static formControl             : WidgetTypeConfig = { name: 'formControl         '  , component: null                                               };
  static accordion               : WidgetTypeConfig = { name: 'accordion           '  , component: null                                               };
  static color                   : WidgetTypeConfig = { name: 'color               '  , component: InputColorComponent                                };
  static formArray               : WidgetTypeConfig = { name: 'formArray           '  , component: InputFormArrayComponent                            };
}
