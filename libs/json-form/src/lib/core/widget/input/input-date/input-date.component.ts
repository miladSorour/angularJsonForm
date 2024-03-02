import {
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
import moment from 'jalali-moment';
import {AppBaseInputModel} from '../app-base-input.model';
import {AppInputBaseConfig} from '../app-input-base-config';
import { IconEnum } from '../../../enum/icon.enum';


@Component({
  selector: 'input-date',
  templateUrl: './input-date.component.html'
})
export class InputDateComponent extends AppBaseInputModel<AppInputBaseConfig> implements DoCheck, OnInit, OnChanges {

  /**
   * these arent real inputs, we are getting child directives as a input
   * please do not add another input
   */
  @Input() suffixIcon: string;
  @Input() suffixIconClicked: any = null;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() gregorian: boolean = false;
  @Output() valueChange = new EventEmitter();
  differ: KeyValueDiffer<string, any>;
  isDisable = false;
  isRequired = false;
  isInputControlRequired = false;
  isReadOnly = false;
  iconEnum =  IconEnum;

  constructor(
    @Self() @Optional() public control: NgControl,
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
    this.datepickerChange();
    this.initForm();
    this.setMyInput()
  }

  // public dateChange(event: any, dateInput: any, picker: any) {    
  //   const faDate = dateInput.value;
  //   moment.locale('fa');    
  //   const enDateMomentFormat = moment(faDate).locale('en');
  //   const enDate = new Date(enDateMomentFormat.toLocaleString());
  //   picker._validSelected = enDate;
  //   picker.startAt = enDate;
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.inputForm) {
      this.initForm();
    }
    if (changes.readonly) {
      this.isInputReadOnly();
    }
    if (changes.required) {
      this.isInputRequired();
    }
  }

  ngDoCheck(): void {
    this.disabledInput();
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem(item => {
        if (item.key === '_value' && item.currentValue === null) {
          this.inputForm.reset();
        }
      });
    }
    this.setMyInput()
  }

  inputChange() {
    this.valueChange.emit(this.value);
    this.control.control?.markAsTouched();
  }

  setMyInput(){
    const control = this.findCurrentFormControl(this.appFormConfig, this.control);
    const controlValue=this.appFormConfig.formGroup.controls[control.name!.toString()].value;
    if(controlValue!=null && controlValue!='' && controlValue.length==10){
      this.inputForm.controls.myInput.patchValue(moment(controlValue, 'jYYYY/jMM/jDD'))
      this.dateChange()
     }
 }

  dateChange(){
    const control = this.findCurrentFormControl(this.appFormConfig, this.control);
    this.value=this.inputForm.controls.myInput.value.format('jYYYY/jMM/jDD')
    this.appFormConfig.formGroup.patchValue({[control.name!.toString()]: this.value})
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

  datepickerChange() {
    this.gregorian = !this.gregorian
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
}
