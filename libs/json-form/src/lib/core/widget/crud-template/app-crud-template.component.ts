import {Component, Input} from '@angular/core';
import {AppCrudConfig} from './app-crud.config';

@Component({
  selector: 'app-crud-template',
  templateUrl: './app-crud-template.component.html'
})
export class AppCrudTemplateComponent {

  @Input() data: AppCrudConfig;
}
