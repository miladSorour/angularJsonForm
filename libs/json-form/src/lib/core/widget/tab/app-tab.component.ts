import {Component, Input, OnInit} from '@angular/core';
import {AppTabConfig} from './app-tab.config';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-tab-widget',
  template: `
    <nav mat-tab-nav-bar
         [style.width]="'100%'">
      <ng-container *ngFor="let item of data; let i = index">
        <a mat-tab-link *ngIf="!getBooleanCallBackFunction(item.hide, item, false)"
           [active]="selectedItem === i"
           (click)="select(i)">
          {{item.title}}
        </a>
      </ng-container>

    </nav>
    <ng-container *ngIf="!getBooleanCallBackFunction(data[selectedItem].hide, data[selectedItem], false)">
      <app-json-form *ngIf="data && data[selectedItem].container"
      [containerList]="data[selectedItem].container">
      </app-json-form>
    </ng-container>
  `,
  styles: [` a {
    cursor: pointer;
  } `],
})
export class AppTabComponent implements OnInit {

  selectedItem = 0;
  @Input() data: AppTabConfig[];

  constructor() {
  }

  ngOnInit() {
    let defaultSelectedTab = this.data.filter(tab=> tab.defaultSelect === true)[0];
    if (defaultSelectedTab) {
      this.selectedItem = this.data.indexOf(defaultSelectedTab);
    }
    if (this.data[this.selectedItem].onSelectTab) {
      // @ts-ignore
      this.data[this.selectedItem].onSelectTab(this.selectedItem)
    }
  }

  select(index: any) {
    if (this.data[index].onSelectTab) {
      // @ts-ignore
      this.data[index].onSelectTab(index)
    }
    this.selectedItem = index;
  }

  getBooleanCallBackFunction(func: any, element?: any, defaultReturn = false): boolean {
    if (func && typeof func === 'boolean') {
      return func;
    } else if (func) {
      return func(element);
    } else {
      return defaultReturn;
    }
  }
}
