import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges
} from '@angular/core';
import {FormBuilder, NgControl} from '@angular/forms';
import {BaseInformationService} from "./baseInformation.service";
import {AppBaseInputModel} from '../app-base-input.model';
import {AppInputBaseConfig} from '../app-input-base-config';
import {MatSelectChange} from "@angular/material/select";
import {AppFormConfig} from "../../form/app-form.config";
import {AppFormControlModel} from "../../form/app-form-control.model";
import { IconEnum } from '../../../enum/icon.enum';
import { BaseInfoEnum } from '../../../enum/baseInfo.enum';


@Component({
  selector: 'app-input-base-information',
  templateUrl: './input-base-information.component.html'
})
export class InputBaseInformationComponent extends AppBaseInputModel<AppInputBaseConfig> implements DoCheck, OnInit, OnChanges {

  /**
   * these arent real inputs, we are getting child directives as a input
   * please do not add another input
   */
  @Input() suffixIcon: string;
  @Input() suffixIconClicked: any;
  @Input() headerId: BaseInfoEnum;
  @Input() multiple: any;
  @Output() valueChange = new EventEmitter();
  baseInformationList: EventEmitter<any[]> = new EventEmitter<any[]>();
  differ: KeyValueDiffer<string, any>;
  isDisable = false;
  isRequired = false;
  isInputControlRequired = false;
  isReadOnly = false;
  isMultiple = false;
  iconEnum =  IconEnum;


  constructor(
    @Self() @Optional() public control: NgControl,
    private baseInformationService: BaseInformationService,
    private cdr: ChangeDetectorRef,
    private differs: KeyValueDiffers,
    private formBuilder: FormBuilder) {
    super();
    this.differ = this.differs.find({}).create();
    this.control.valueAccessor = this;
  }

  ngOnInit(): void {
    this.isInputRequired();
    if (!this.isRequired) {
      this.isControlRequired();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.inputForm) {
      this.initForm();
    }

    if (changes.readonly) {
      this.isInputReadOnly();
    }

    let appFormConfig: AppFormConfig = changes.appFormConfig.currentValue;
    const showMultipleSelect = appFormConfig.formControl.find((control: AppFormControlModel) => control.name === this.control.name).multiple;
    if (showMultipleSelect)
      this.multiple = showMultipleSelect
    if (this.multiple) {
      this.isInputMultiple();
    }

    if (changes.required) {
      this.isInputRequired();
    }
    if (changes.headerId.currentValue != null && changes.headerId.previousValue !== changes.headerId.currentValue) {
      this.baseInformationService.getBaseInformationByParentId(this.headerId).subscribe((baseInformationList) => {
        this.baseInformationList.next(baseInformationList.body);
      });
    }
  }

  ngDoCheck(): void {
    this.disabledInput();
  }

  inputChange() {
    this.valueChange.emit(this.value);
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
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to validators name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.inputForm.controls[controlName];
    if (!control) {
      return false;
    }
    if (control.hasError(validationType) && (control.dirty || control.touched)) {
      // @ts-ignore
      this.control.control.setErrors({[validationType]: true});
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

  onSelectionChange($event: MatSelectChange) {
    let appFormConfig: AppFormConfig = this.appFormConfig;
    const selectedTitleCol = appFormConfig.formControl.find((control: AppFormControlModel) => control.name === this.control.name);
    if (selectedTitleCol && selectedTitleCol.onChangeValue) {
      selectedTitleCol.onChangeValue($event.value, $event)
    }
  }

  private initForm() {
    this.inputForm = this.formBuilder.group({
      myInput: ['']
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

  private isInputMultiple(): void {
    if (this.multiple === '') {
      this.isMultiple = true;
    } else if (this.multiple !== undefined) {
      this.isMultiple = this.multiple;
    }
  }
}
