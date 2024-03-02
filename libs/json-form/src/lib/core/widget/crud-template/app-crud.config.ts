import {ActionItemConfig} from '../table/cv-table-widget/action-item-config';
import {AppContainerModel} from '../../json-form/model/app-container.model';
import {AppOffCanvasConfig} from '../off-canvas/app-off-canvas.config';

export class AppCrudConfig {
  pageTitle: string | {new:string,edit:string}
  pageEditMode: boolean = undefined;
  actions: ActionItemConfig[] = [];
  offCanvas?: AppOffCanvasConfig;
  container: AppContainerModel[] = [];
  searchBoxContainer ?: AppContainerModel[];

}
