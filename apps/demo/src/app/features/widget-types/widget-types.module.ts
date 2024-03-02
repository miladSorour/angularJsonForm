import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '@pnrng/json-form';
import {InlineSVGModule} from "ng-inline-svg-2";
import { WidgetTypesRoutingModule } from './widget-types-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CoreModule,
    WidgetTypesRoutingModule,
    InlineSVGModule,
    FontAwesomeModule,
  ],
})
export class WidgetTypesModule {
}
