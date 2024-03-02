import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AppBaseInfoPropertyConfig} from './app-base-info-property.config';
// import {} from '../../model/';
import {
  BaseInformationPropertyTypeConfig,
  BaseInformationPropertyTypeEnum
} from '../../constant/base-information-property-type.enum';
import {Validators} from '@angular/forms';
import { BaseInformationPropertyService } from './base-information-property.service';
import { BaseInformationPropertyValueService } from './baseInformationPropertyValue/base-information-property-value.service';
import { AppFormControlDatasource } from '../form/app-form-control-datasource';
import { BaseInformationProperty } from './base-information-property.model';
import { WidgetTypeModel } from '../../config/widget-type.model';
import { BaseInformationPropertyValue } from './baseInformationPropertyValue/base-information-property-value.model';

@Component({
  selector: 'app-base-info-property',
  template: ``
})
export class BaseInfoPropertyWidgetComponent implements OnChanges {

  @Input() data: AppBaseInfoPropertyConfig;

  constructor(private baseInformationPropertyService: BaseInformationPropertyService,
              private baseInformationPropertyValueService: BaseInformationPropertyValueService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadProperty()
  }

  loadProperty() {
    let baseInformationPropertyTypeEnum = new BaseInformationPropertyTypeEnum();
    // @ts-ignore
    this.baseInformationPropertyService.getList({"baseInformationId": this.data.headerId ? this.data.headerId() : null}).subscribe((res: BaseInformationProperty[]) => {
      let formControl: any[] = [];
      for (const item of res) {
        this.createFormControl(baseInformationPropertyTypeEnum, item, formControl);
      }
      this.loadPropertyValue(formControl);
      this.createFormGroup(formControl);
    });
  }

  private createFormGroup(formControl: any[]) {
    let dynamicFormControl: AppFormControlDatasource = this.data.dynamicFormControl;
    let formGroup = this.data.formGroup;
    formGroup.createFormGroup(formControl)
    let copyData = dynamicFormControl.data;
    copyData.push(...formControl)
    dynamicFormControl.data = copyData;
  }

  private createFormControl(baseInformationPropertyTypeEnum: BaseInformationPropertyTypeEnum, item: BaseInformationProperty, formControl: any[]) {
    // @ts-ignore
    let baseInformationPropertyType: BaseInformationPropertyTypeConfig = baseInformationPropertyTypeEnum[item.type.index.toString()];
    if (baseInformationPropertyType.inputType.name === WidgetTypeModel.baseInfo.name) {
      formControl.push({
        name: item.id?.toString(), inputType: baseInformationPropertyType.inputType,
        placeholder: item.title, validators: [item.isNullable ? Validators.required : null],
        headerId: () => {
          return item.baseListHeaderId
        },
        cols: 4, rows: 1
      })
    } else {
      formControl.push({
        name: item.id?.toString(), inputType: baseInformationPropertyType.inputType,
        placeholder: item.title, validators: [item.isNullable ? Validators.required : null],
        cols: 4, rows: 1
      })
    }
  }

  private loadPropertyValue(formControl: any[]) {
    if (formControl.length && this.data.entityId && (+this.data.entityId()  > 0)) {
      this.baseInformationPropertyValueService.getList({
        "fkId": this.data.entityId(), "tableId": this.data.tableType
      }).subscribe((res: BaseInformationPropertyValue[]) => {
        formControl.forEach(item => {
          item.id = res.find(p => p.baseInformationPropertyId == item.id)?.id;
          item.value = res.find(p => p.baseInformationPropertyId == item.id)?.value;
        })
      })
    }
  }
}
