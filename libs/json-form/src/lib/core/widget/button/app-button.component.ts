import {Component, Input} from "@angular/core";
import {AppButtonActionModel} from "./app-button-action.model";



@Component({
  selector: 'app-button',
  templateUrl: 'app-button.component.html',
  styleUrls: ['app-button.component.scss']
})

export class AppButtonComponent{
  @Input() data: AppButtonActionModel[];


  getBooleanCallBackFunction(func: any, element?: any): boolean {
    if (func && typeof func === 'boolean') {
      return func;
    } else if (func) {
      return func(element);
    } else {
      return false;
    }
  }

  getStringCallBackFunction(func: any, element: any): string {
    if (func && typeof func === 'string') {
      return func;
    } else if (func) {
      return func(element);
    } else {
      return '';
    }
  }
}

