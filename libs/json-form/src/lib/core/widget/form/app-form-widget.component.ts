import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {AppFormConfig} from './app-form.config';
import {WidgetTypeModel} from '../../config/widget-type.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatAccordion } from '@angular/material/expansion';
import { IconEnum } from '../../enum/icon.enum';

@Component({
  selector: 'app-form-widget',
  templateUrl: './app-form-widget.component.html',
  styleUrls: ['app-form-widget.component.scss'],
})
export class AppFormWidgetComponent implements OnInit {
  @Input() data: AppFormConfig;
  widgetTypeEnum = WidgetTypeModel;
  control: any;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  accordionToggleMode=false
  iconEnum=IconEnum

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (!this.data.isDynamicControl) {
      this.control = this.data.formControl
    } else {
      this.data.dynamicFormControl?._dataChange.subscribe(data => {
        this.control = data
        this.cdr.detectChanges()
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.control, event.previousIndex, event.currentIndex);
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

  accordionToggle(){
    if(this.accordionToggleMode){
    this.accordion.closeAll()
    }else{
      this.accordion.openAll()
    }
    this.accordionToggleMode=!this.accordionToggleMode
  }
}
