import {ActionItemConfig} from '../table/cv-table-widget/action-item-config';
import {AppContainerModel} from '../../json-form/model/app-container.model';

export class AppDialogTemplateConfig {
  pageTitle: string
  actions  : ActionItemConfig  [] = [];
  container: AppContainerModel[] = [];
}
