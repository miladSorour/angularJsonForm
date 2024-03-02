import {Component, Input} from '@angular/core';
import {AppDialogTemplateConfig} from './app-dialog-template.config';

@Component({
  selector: 'app-dialog-template',
  templateUrl: './app-dialog-template.component.html'
})
export class AppDialogTemplateComponent {

  @Input() data: AppDialogTemplateConfig;
}
