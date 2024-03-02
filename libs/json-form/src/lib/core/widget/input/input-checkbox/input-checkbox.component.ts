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
import {AppBaseInputModel} from '../app-base-input.model';
import {AppInputBaseConfig} from '../app-input-base-config';


@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html'
})
// eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
export class InputCheckboxComponent extends AppBaseInputModel<AppInputBaseConfig> implements DoCheck, OnInit, OnChanges {

  /**
   * these arent real inputs, we are getting child directives as a input
   * please do not add another input
   */
  @Input() suffixIcon: string;
  @Input() suffixIconClicked: any;
  @Input() min: string;
  @Input() max: string;
  @Output() valueChange = new EventEmitter();
  differ: KeyValueDiffer<string, any>;
  isDisable = false;
  isRequired = false;
  isInputControlRequired = false;
  isReadOnly = false;

  constructor(
    @Self() @Optional() public control: NgControl,
    private differs: KeyValueDiffers,
    private formBuilder: FormBuilder) {
    super();
    this.differ = this.differs.find({}).create();
    this.control.valueAccessor = this;
  }

  // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
  ngOnInit(): void {
    this.isInputRequired();
    if (!this.isRequired) {
      this.isControlRequired();
    }
  }

  // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
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

  // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
  ngDoCheck(): void {
    this.disabledInput();
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem(item => {
        if (item.key === '_value' && item.currentValue === null) {
          this.inputForm.reset();
          this.value = false;
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

  private initForm() {
    this.inputForm = this.formBuilder.group({
      myInput: []
    });
    this.value = false;
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
