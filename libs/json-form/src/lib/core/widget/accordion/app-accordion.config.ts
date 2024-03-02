import {AppContainerModel} from '../../json-form/model/app-container.model';
import {AppBaseJsonFormModel} from "../../json-form/model/app-base-json-form.model";

export class AppAccordionConfig extends AppBaseJsonFormModel {
  title: string;
  description: string;
  disable?: any;
  hide?: any;
  defaultSelect?: boolean;
  container: AppContainerModel[];
  onSelectAccordion?: (index: number) => void
}
