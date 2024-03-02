import {AppContainerModel} from '../../json-form/model/app-container.model';
import {AppBaseJsonFormModel} from "../../json-form/model/app-base-json-form.model";

export class AppTabConfig extends AppBaseJsonFormModel {
  tabID: string;
  title: string;
  disable?: any;
  hide?: any;
  defaultSelect?: boolean;
  container: AppContainerModel[];
  onSelectTab?: (index: number) => void
}
