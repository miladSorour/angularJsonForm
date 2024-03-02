import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {WidgetTypeModel} from '../../config/widget-type.model';
import {AppContainerModel} from '../model/app-container.model';

@Component({
  selector: 'app-json-form',
  template: `
    <ng-container *ngFor="let widget of containerList">
      <ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.crudTemplate.name">
        <app-crud-template [data]="widget.config"></app-crud-template>
      </ng-container>

      <ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.crudTemplateToggleBase.name">
        <app-crud-template-toggle-base [data]="widget.config"></app-crud-template-toggle-base>
      </ng-container>
      
      <ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.dialogTemplate.name">
        <app-dialog-template [data]="widget.config"></app-dialog-template>
      </ng-container>
    </ng-container>

    <ng-container *ngIf="
                        containerList && containerList.length > 0
                        && containerList[0].widgetType.name !== widgetTypeEnum.crudTemplate.name
                        && containerList[0].widgetType.name !== widgetTypeEnum.crudTemplateToggleBase.name
                        && containerList[0].widgetType.name !== widgetTypeEnum.dialogTemplate.name ">
      <!--start mat grid-->
      <div fxLayout="row wrap" fxLayoutGap="15px">
        <ng-container *ngFor="let widget of containerList">
          <ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.form.name">
            <div [ngClass]="'col-lg-' + widget.cols +  ' m-0' ">
              <app-form-widget [data]="widget.config"></app-form-widget>
            </div>
          </ng-container>

          <ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.tree.name">
            <div [ngClass]="'col-lg-' + widget.cols +  ' m-0' ">
              <app-tree-widget [data]="widget.config"></app-tree-widget>
            </div>
          </ng-container>

          <ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.treeTable.name">
            <div [ngClass]="'col-lg-' + widget.cols +  ' m-0' ">
              <app-tree-table  [data]="widget.config"></app-tree-table>
            </div>
          </ng-container>

          <ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.table.name">
            <div [ngClass]="'col-lg-' + widget.cols +  ' m-0' ">
              <app-table-widget #childComponent [data]="widget.config"></app-table-widget>
            </div>
          </ng-container>

          <ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.tab.name">
            <div [ngClass]="'col-lg-' + widget.cols +  ' m-0' ">
              <app-tab-widget [data]="widget.config"></app-tab-widget>
            </div>
          </ng-container>

          <ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.accordion.name">
            <div [ngClass]="'col-lg-' + widget.cols +  ' m-0' ">
              <app-accordion-widget [data]="widget.config"></app-accordion-widget>
            </div>
          </ng-container>

          <ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.attachment.name">
            <div [ngClass]="'col-lg-' + widget.cols +  ' m-0' ">
              <app-attachment [data]="widget.config"></app-attachment>
            </div>
          </ng-container>

          <ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.baseInfoProperty.name">
            <div [ngClass]="'col-lg-' + widget.cols +  ' m-0' " >
              <app-base-info-property [data]="widget.config"></app-base-info-property>
            </div>
          </ng-container>

          <ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.barChart.name">
            <div [ngClass]="'col-lg-' + widget.cols +  ' m-0' " >
              <app-bar-chart [data]="widget.config"></app-bar-chart>
            </div>
          </ng-container>

          <ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.pieChart.name">
            <div [ngClass]="'col-lg-' + widget.cols +  ' m-0' " >
              <app-pie-chart [data]="widget.config"></app-pie-chart>
            </div>
          </ng-container>

          <ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.divider.name">
            <div [ngClass]="'col-lg-' + widget.cols +  ' m-0' " >
              <app-divider-widget [appDataConfig]="widget.config"></app-divider-widget>
            </div>
          </ng-container>

        </ng-container>

        <ng-container *ngFor="let widget of containerList">
          <ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.digitalArchiveCard.name">
            <div [ngClass]="'col-lg-' + widget.cols +  ' m-0' " fxFlex="auto">
              <app-digital-archive-card [data]="widget.config"></app-digital-archive-card>
            </div>
          </ng-container>
        </ng-container>
      </div>
    </ng-container>
  `,
  styleUrls: ['./app-json-form.component.scss']
})
/**
 * @see https://angularscript.com/angular-schema-form-builder/
 * @see https://hamidihamza.com/ajsf/?set=asf&example=asf-hack-conditional-required&framework=material-design&language=de
 * @see https://stackblitz.com/edit/angular-mat-tooltip-ki4r2q?file=app%2Fjson-input.component.ts
 * @see https://stackblitz.com/edit/angular-demo-matstepper-move?file=app%2Fdemo%2Fdemo.component.html  // mat-stepper with flex
 */
export class AppJsonFormComponent {
  @Input() containerList: AppContainerModel[];
  widgetTypeEnum = WidgetTypeModel;
}
