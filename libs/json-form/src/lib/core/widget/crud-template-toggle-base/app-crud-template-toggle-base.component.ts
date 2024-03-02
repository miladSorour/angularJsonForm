import {Component, Input} from '@angular/core'
import { AppCrudTemplateToggleBaseConfig } from './app-crud-template-toggle-base.config'

@Component({
  template: `
    <app-json-form *ngIf='!getBooleanCallBackFunction(data.showList)' [containerList]='data.containerEdit'></app-json-form>
    <app-json-form [hidden]='!getBooleanCallBackFunction(data.showList)' [containerList]='data.containerGrid'></app-json-form>
  `,
  selector: 'app-crud-template-toggle-base',
})
export class AppCrudTemplateToggleBaseComponent {
  @Input() data: AppCrudTemplateToggleBaseConfig

  getBooleanCallBackFunction(func: any): boolean {
    if (func && typeof func === 'boolean') {
      return func
    } else if (func) {
      return func()
    } else {
      return false
    }
  }


}
