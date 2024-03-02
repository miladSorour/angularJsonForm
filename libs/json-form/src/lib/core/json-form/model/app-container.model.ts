import {AppBaseJsonFormModel} from './app-base-json-form.model';
import {AppFormConfig} from '../../widget/form/app-form.config';
import {AppTreeTableConfig} from '../../widget/table/cv-tree-table/app-tree-table.config';
import {AppTableConfig} from '../../widget/table/cv-table-widget/app-table.config';
import {WidgetTypeConfig} from '../../config/widget-type.model';
import {AppTabConfig} from '../../widget/tab/app-tab.config';
import {ActionItemConfig} from '../../widget/table/cv-table-widget/action-item-config';
import {AppTreeConfig} from '../../widget/tree/app-tree.config';
import {AppOffCanvasConfig} from '../../widget/off-canvas/app-off-canvas.config';
import {AppCrudConfig} from '../../widget/crud-template/app-crud.config';
import {AppDialogTemplateConfig} from '../../widget/dialog-template/app-dialog-template.config';
import {AppBaseInfoPropertyConfig} from '../../widget/base-info-property/app-base-info-property.config';
import { AppAccordionConfig } from '../../widget/accordion/app-accordion.config';
import { BarChartModel } from '../../widget/chart/bar-chart/bar-chart.model';
import {
  AppCrudTemplateToggleBaseConfig
} from '../../widget/crud-template-toggle-base/app-crud-template-toggle-base.config'

export class AppContainerModel extends AppBaseJsonFormModel {
  widgetType: WidgetTypeConfig;
  config: AppCrudConfig | AppCrudTemplateToggleBaseConfig | AppDialogTemplateConfig | AppFormConfig      | AppTableConfig            | AppTreeTableConfig   | AppTreeConfig
                        | AppTabConfig[]                  | ActionItemConfig[]      | AppOffCanvasConfig | AppBaseInfoPropertyConfig | AppAccordionConfig[] | BarChartModel | any
}
