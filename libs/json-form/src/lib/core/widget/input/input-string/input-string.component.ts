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
import {FormBuilder, NgControl, Validators} from '@angular/forms';
import {AppBaseInputModel} from '../app-base-input.model';
import {AppInputBaseConfig} from '../app-input-base-config';


@Component({
  selector: 'app-input-string',
  templateUrl: './input-string.component.html',
})
// eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
export class InputStringComponent extends AppBaseInputModel<AppInputBaseConfig> implements DoCheck, OnInit, OnChanges {
  /**
   * these arent real inputs, we are getting child directives as a input
   * please do not add another input
   */

    // default value set for str60, if your input is different change the maxlength
  @Input() maxlength = '60';
  @Input() minlength: string;
  @Input() suffixIcon: string;
  @Input() suffixIconClicked: any;

  differ: KeyValueDiffer<string, any>;
  isDisable = false;
  isRequired = false;
  isInputControlRequired = false;
  isReadOnly = false;

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
    this.isControlRequired();
  }

  // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.inputForm) {
      this.initForm();
    }
    this.cdr.detectChanges()

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
      myInput: ['', Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]
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
