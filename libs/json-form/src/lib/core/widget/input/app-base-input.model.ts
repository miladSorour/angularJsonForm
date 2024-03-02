import {Directive, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {AppAbstractValueAccessor} from './app-abstract-value-accessor';
import {AppInputBaseConfig} from './app-input-base-config';
import {FormGroup, NgControl} from '@angular/forms';
import {MatSelectChange} from "@angular/material/select";
import {AppFormConfig} from '../form/app-form.config';
import {AppFormControlModel} from '../form/app-form-control.model';

@Directive()
export class AppBaseInputModel<C extends AppInputBaseConfig> extends AppAbstractValueAccessor {
  @Input()  config: C;
  @Input() disabled: boolean;
  @Input() readonly: any;
  @Input() required: any;
  @Input() placeholder: string;
  @Input() tooltip: string;
  @Input() appFormConfig: AppFormConfig;
  @Output() blur = new EventEmitter();

  inputForm: FormGroup;

  onBlur($event: FocusEvent) {
    this.blur.next($event)
  }

  disabledInput() {
    if (this.inputForm) {
      if (this.disabled && this.disabled) {
        this.inputForm.get('myInput')?.disable();
      } else {
        this.inputForm.get('myInput')?.enable();
      }
    }
  }

  findCurrentFormControl(formConfig: AppFormConfig, control: NgControl): AppFormControlModel {
    if (formConfig.isDynamicControl) {
      return formConfig.dynamicFormControl.data.find((_control: AppFormControlModel) => _control.name === control.name)
    } else {
      return formConfig.formControl.find((_control: AppFormControlModel) => _control.name === control.name);
    }
  }
}
