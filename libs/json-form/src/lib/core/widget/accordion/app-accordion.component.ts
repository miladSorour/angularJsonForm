import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AppAccordionConfig} from './app-accordion.config';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-accordion-widget',
  template: `
    <div class="example-action-buttons">
      <button mat-button (click)="accordion.openAll()">باز کردن همه</button>
      <button mat-button (click)="accordion.closeAll()">بستن همه</button>
    </div>
    <mat-accordion class="example-headers-align" multi>
      <ng-container *ngFor="let item of data; let i = index">
        <mat-expansion-panel>
          <mat-expansion-panel-header>

            <mat-panel-title>{{item.title}}</mat-panel-title>
            <ng-container *ngIf="item.description">
              <mat-panel-description>{{item.description}}</mat-panel-description>
            </ng-container>

          </mat-expansion-panel-header>

          <app-json-form *ngIf="item && item.container && item.container.length > 0" [containerList]="data[selectedItem].container"></app-json-form>
        </mat-expansion-panel>
      </ng-container>
    </mat-accordion>

  `,
  styles: [` a {
    cursor: pointer;
  } `],
})
export class AppAccordionComponent implements OnInit {

  selectedItem = 0;
  @Input() data: AppAccordionConfig[];
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor() {
  }

  ngOnInit() {
    let defaultSelectedAccordion = this.data.filter(tab => tab.defaultSelect === true)[0];
    if (defaultSelectedAccordion) {
      this.selectedItem = this.data.indexOf(defaultSelectedAccordion);
    }
    if (this.data[this.selectedItem].onSelectAccordion) {
      // @ts-ignore
      this.data[this.selectedItem].onSelectAccordion(this.selectedItem)
    }
  }

  select(index: any) {
    if (this.data[index].onSelectAccordion) {
      // @ts-ignore
      this.data[index].onSelectAccordion(index)
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
