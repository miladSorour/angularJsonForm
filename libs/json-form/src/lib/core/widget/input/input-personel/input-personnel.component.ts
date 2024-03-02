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
import {FormBuilder, NgControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AppDialogService} from '../../dialog/service/app-dialog.service';
import {AppDialogModel} from '../../dialog/models/app-dialog.model';
import {DialogSizeEnum} from "../../dialog/models/dialog-size.enum";
import {AppBaseInputModel} from "../app-base-input.model";
import {AppInputBaseConfig} from "../app-input-base-config";
import {AppFormConfig} from '../../form/app-form.config';
import {AppFormControlModel} from '../../form/app-form-control.model';
import { IconEnum } from '../../../enum/icon.enum';
import { PersonnelService } from '../../../service/personnel.service';
import { Personnel } from '../../../model/personnel.model';
import { PersonnelSearchComponent } from './dialog-personnel-search/personnel-search.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-input-personnel',
  templateUrl: './input-personnel.component.html'
})
// eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
export class AppInputPersonnelComponent extends AppBaseInputModel<AppInputBaseConfig> implements DoCheck, OnInit, OnChanges {

  @Input() suffixIcon       : string;
  @Input() suffixIconClicked: any;
  @Output() valueChange     = new EventEmitter();

  selectedTitle: string | undefined = '';
  differ       : KeyValueDiffer<string, any>;
  isDisable    = false;
  isRequired   = false;
  isReadOnly   = false;
  isInputControlRequired = false;
  // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
  iconEnum =  IconEnum;

  constructor(
    @Self() @Optional() public control: NgControl,
    private dialog          : MatDialog,
    private personnelService: PersonnelService,
    private appDialogService: AppDialogService,
    private differs         : KeyValueDiffers,
    private formBuilder     : FormBuilder) {
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

    let appFormConfig: AppFormConfig = changes.appFormConfig.currentValue;
    let control = this.findCurrentFormControl(appFormConfig, this.control);
    let object = appFormConfig.formGroup.value;
    this.selectedTitle = object[control.selectedTitle!];

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
        if (item.key === '_value' && item.currentValue !== null) {
          let appFormConfig: AppFormConfig = this.appFormConfig;
          let control = this.findCurrentFormControl(appFormConfig, this.control);
          let object = appFormConfig.formGroup.value;
          if (object[control.selectedTitle!]) {
            this.selectedTitle = object[control.selectedTitle!];
          }
        }
      });
    }
  }

  inputChange() {
    this.valueChange.emit(this.value);
    this.control.control?.markAsTouched();
  }

  clearInput() {
    this.selectedTitle = '';
    this.value = null;
  }

  onSuffixIconClicked() {
    const groupDialogModel: AppDialogModel = {
      title: 'پرسنل',
      size: DialogSizeEnum.lg,
      onClose: (res: Personnel) => {
        if (res) {
          this.value = res.id
          this.inputForm.patchValue({myInput: this.value})
          let control = this.findCurrentFormControl(this.appFormConfig, this.control);
          this.selectedTitle = res.fullName;
          this.appFormConfig.formGroup.patchValue({[control.selectedTitle!.toString()]: this.selectedTitle})
          if (control && control.onChangeValue) {
            control.onChangeValue(res)
          }
        }
      }
    }
    this.appDialogService.openDialog<PersonnelSearchComponent, Personnel>(PersonnelSearchComponent, groupDialogModel)
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
