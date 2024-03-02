import {
  Component,
  EventEmitter,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  Optional,
  Output,
  Self,
  SimpleChanges
} from '@angular/core';
import {FormBuilder, NgControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AppDialogService} from '../../dialog/service/app-dialog.service';
import {AppDialogModel} from '../../dialog/models/app-dialog.model';
import {AppBaseInputModel} from "../app-base-input.model";
import {AppInputBaseConfig} from "../app-input-base-config";
import {DialogSizeEnum} from "../../dialog/models/dialog-size.enum";
import {AppFormConfig} from '../../form/app-form.config';
import {InputCustomConfigModel} from "./input-custom-config.model";
import {ComponentType} from "@angular/cdk/portal";
import { IconEnum } from '../../../enum/icon.enum';
import { UserService } from '../../../service/user.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-input-custom',
  templateUrl: './input-custom.component.html'
})

export class InputCustomComponent extends AppBaseInputModel<AppInputBaseConfig> implements OnChanges {

  @Input() suffixIcon: string;
  @Input() suffixIconClicked: any;
  @Output() valueChange = new EventEmitter();

  selectedTitle: any;
  differ: KeyValueDiffer<string, any>;
  isDisable = false;
  isRequired = false;
  isReadOnly = false;
  isInputControlRequired = false;
  // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
  iconEnum = IconEnum;
  dialogCom   : ComponentType<any>;
  dialogSize  : DialogSizeEnum = DialogSizeEnum.md;
  dialogModel : any;
  dialogTopic : string;

  constructor(
    @Self() @Optional() public control: NgControl,
    private dialog: MatDialog,
    private usersService: UserService,
    private appDialogService: AppDialogService,
    private differs: KeyValueDiffers,
    private formBuilder: FormBuilder) {
    super();
    this.differ = this.differs.find({}).create();
    this.control.valueAccessor = this;
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

    // @ts-ignore
    if (control.dialogCom) {
      // @ts-ignore
      this.dialogCom = control.dialogCom.component
    }
    // @ts-ignore
    if (control.dialogSize) {
      // @ts-ignore
      this.dialogSize = control.dialogSize
    }
    // @ts-ignore
    if (control.dialogTopic) {
      // @ts-ignore
      this.dialogTopic = control.dialogTopic
    }
    // @ts-ignore
    if (control.dialogModel) {
      // @ts-ignore
      this.dialogModel = control.dialogModel
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
    // @ts-ignore
    const groupDialogModel: AppDialogModel = {
      title: '',
      size: this.dialogSize,
      onClose: (res:typeof this.dialogModel) => {
        if (res) {
          this.value = res.id
          this.inputForm.patchValue({myInput: this.value})
          let control = this.findCurrentFormControl(this.appFormConfig, this.control);
          this.selectedTitle = res[this.dialogTopic]
          // @ts-ignore
          this.appFormConfig.formGroup.patchValue({[this.dialogTopic]: this.selectedTitle})
          if (control && control.onChangeValue) {
            control.onChangeValue(res)
          }
        }
      }
    }
    // @ts-ignore
    this.appDialogService.openDialog<any, InputCustomConfigModel>(this.dialogCom , groupDialogModel)
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
      myInput: []
    });
  }
}
