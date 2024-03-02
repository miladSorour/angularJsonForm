import {Component, Input} from '@angular/core';
import {AppOffCanvasConfig} from './app-off-canvas.config';

@Component({
  selector: 'app-off-canvas',
  templateUrl: 'off-canvas.component.html'
})
export class OffCanvasComponent {

  @Input() data: AppOffCanvasConfig;

}
