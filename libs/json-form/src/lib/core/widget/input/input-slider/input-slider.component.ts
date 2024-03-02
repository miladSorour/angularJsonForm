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
import {FormBuilder, FormGroup, NgControl} from '@angular/forms';
import {AppBaseInputModel} from '../app-base-input.model';
import {AppInputBaseConfig} from '../app-input-base-config';


@Component({
  selector: 'input-slider',
  templateUrl: './input-slider.component.html'
})
export class InputSliderComponent extends AppBaseInputModel<AppInputBaseConfig> implements DoCheck, OnInit, OnChanges {

  /**
   * these arent real inputs, we are getting child directives as a input
   * please do not add another input
   */
  @Input() disabled: any;
  @Input() readonly: any;
  @Input() required: any;
  @Input() placeholder: string;
  @Input() tooltip: string;
  @Input() suffixIcon: string;
  @Input() suffixIconClicked: any;
  @Output() valueChange = new EventEmitter();
  differ: KeyValueDiffer<string, any>;
  isDisable = false;
  isRequired = false;
  isInputControlRequired = false;
  isReadOnly = false;
  inputForm: FormGroup;

  constructor(
    @Self() @Optional() public control: NgControl,
    private differs: KeyValueDiffers,
    private formBuilder: FormBuilder) {
    super();
    this.differ = this.differs.find({}).create();
    this.control.valueAccessor = this;
  }

  ngOnInit(): void {
    this.initForm();
    this.isInputRequired();
    if (!this.isRequired) {
      this.isControlRequired();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled) {
      this.isInputDisabled();
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

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
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

  private isInputDisabled(): void {
    if (this.disabled === '') {
      this.isDisable = true;
    } else if (this.disabled !== undefined) {
      this.isDisable = this.disabled;
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
