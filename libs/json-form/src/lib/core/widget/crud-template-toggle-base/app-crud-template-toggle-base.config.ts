import { AppContainerModel } from '../../json-form/model/app-container.model'

export class AppCrudTemplateToggleBaseConfig {
  containerEdit: AppContainerModel[] = []
  containerGrid: AppContainerModel[] = []
  showList: () => boolean
}
