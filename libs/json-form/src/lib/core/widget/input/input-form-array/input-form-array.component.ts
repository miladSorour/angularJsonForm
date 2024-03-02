import { ChangeDetectorRef, Component, DoCheck, Input, KeyValueDiffer, KeyValueDiffers, OnChanges, OnInit, Optional, Self, SimpleChanges } from '@angular/core';
import { NgControl, FormBuilder, Validators } from '@angular/forms';
import { AppBaseInputModel } from '../app-base-input.model';
import { AppInputBaseConfig } from '../app-input-base-config';
import { IconEnum } from '../../../enum/icon.enum';
import { AppFormConfig } from '../../form/app-form.config';
import { InputFormArrayConfig } from './input-form-array.config';
import { AppFormActionModel } from '../../form/app-form-action.model';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-input-form-array-template',
  templateUrl: './input-form-array.component.html'
})

export class InputFormArrayComponent extends AppBaseInputModel<AppInputBaseConfig> implements DoCheck, OnInit, OnChanges {
  /**
   * these arent real inputs, we are getting child directives as a input
   * please do not add another input
   */

  // default value set for str60, if your input is different change the maxlength
  @Input() suffixIcon: string;
  @Input() suffixIconClicked: any;

  differ: KeyValueDiffer<string, any>;
  isDisable = false;
  isRequired = false;
  isInputControlRequired = false;
  isReadOnly = false;;
  iconEnum = IconEnum
  inputFormArrayConfig: InputFormArrayConfig;

  constructor(
    @Self() @Optional() public control: NgControl,
    private differs: KeyValueDiffers,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder) {
    super();
    this.differ = this.differs.find({}).create();
    this.control.valueAccessor = this;
  }

  // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
  ngOnInit(): void {
    const controlValue = [].concat(...Array(this.control.control.value));
    this.inputFormArrayConfig = new InputFormArrayConfig(controlValue, this.appFormConfig)
    this.initForm();
    this.updateValue()
    this.isControlRequired();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.inputForm) {
      this.initForm();
    }
    // this.cdr.detectChanges()

    if (changes.readonly) {
      this.isInputReadOnly();
    }
    if (changes.required) {
      this.isInputRequired();
    }
  }

  ngDoCheck(): void {
    this.updateValue()
    this.disabledInput();
    const change = this.differ.diff(this);

    if (change) {
      change.forEachChangedItem(item => {
        if (item.key === '_value' && item.currentValue === null) {
          this.inputForm.reset();
        }
      });
    }
  }

  inputChange() {
    this.control.control?.markAsTouched();
  }

  clearInput() {
    this.value = null;
  }

  onSuffixIconClicked() {
    return this.suffixIconClicked(this.value);
  }

  /**
   * Checking control validation
   * ==============================
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to validators name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.inputForm.controls[controlName];
    if (!control) {
      return false;
    }
    if (control.hasError(validationType) && (control.dirty || control.touched)) {
      this.control.control.setErrors({ [validationType]: true });
    }
    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  /**
   * Checking parent control validation
   *
   * @param validationType string => Equals to validators name
   */
  isParentControlHasError(validationType: string) {
    const error = this.control.getError(validationType);
    if (!error) {
      return false;
    }
    return error && (this.control.dirty || this.control.touched);

  }

  private initForm() {
    this.inputForm = this.formBuilder.group({
      myInput: [[], Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]
    });
  }

  private isControlRequired(): void {
    if (this.control && this.control.errors && this.control.errors.hasOwnProperty('required')) {
      this.isInputControlRequired = this.control.errors.required;
    }
  }

  private isInputRequired(): void {
    if (this.required === '') {
      this.isRequired = true;
    } else if (this.required !== undefined) {
      this.isRequired = this.required;
    }
  }

  private isInputReadOnly(): void {
    if (this.readonly === '') {
      this.isReadOnly = true;
    } else if (this.readonly !== undefined) {
      this.isReadOnly = this.readonly;
    }
  }

  trackById(index: number, item: any): number {
    return index;
  }

  updateValue() {
    this.value = this.inputFormArrayConfig.configListValue
    this.inputForm.controls['myInput'].patchValue(this.value)
    this.control.control.patchValue(this.value)
  }

  actionClick(formConfig: AppFormConfig, index, callBackAction: any) {
    callBackAction(this.inputFormArrayConfig, formConfig, this.value, index)
    this.updateValue()
  }

  hideAction(action: AppFormActionModel, index: number, callBackHide: any) {
    return callBackHide(this.inputFormArrayConfig, action, index)
  }

  drop(event: CdkDragDrop<string[]>) {
    const temp=this.inputFormArrayConfig.appFormConfigs[event.previousIndex].formGroup.value
    this.inputFormArrayConfig.appFormConfigs[event.previousIndex].formGroup.patchValue(this.inputFormArrayConfig.appFormConfigs[event.currentIndex].formGroup.value)
    this.inputFormArrayConfig.appFormConfigs[event.currentIndex].formGroup.patchValue(temp)

  }
}

