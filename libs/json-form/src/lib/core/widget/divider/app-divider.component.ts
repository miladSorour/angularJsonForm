import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { AppDividerConfig } from "./app-divider.config";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-divider-widget',
  template: `
  <div class="page-title d-flex flex-column justify-content-center flex-wrap my-3">
    <h2 class="page-heading d-flex text-dark fw-bold fs-5 flex-column justify-content-center my-0 mx-3">{{appDataConfig.title}}</h2>
    <div class="separator separator-dashed border-primary mb-6" style="width:100%"></div>
  </div>
  `,
  styles: [],
})
export class AppDividerComponent implements OnInit {

  @Input() appDataConfig: AppDividerConfig;

  constructor() {
  }

  ngOnInit() {
  }

}
