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
import {AppBaseInputModel} from '../../app-base-input.model';
import {AppInputBaseConfig} from '../../app-input-base-config';
import {MatSelectChange} from "@angular/material/select";
import {AppFormConfig} from "../../../form/app-form.config";
import {AppFormControlModel} from "../../../form/app-form-control.model";
import {AppDialogModel} from "../../../dialog/models/app-dialog.model";
import {DialogSizeEnum} from "../../../dialog/models/dialog-size.enum";
import {AppDialogService} from "../../../dialog/service/app-dialog.service";
import {MatDialog} from "@angular/material/dialog";
import {BaseInformationService} from "../baseInformation.service";
import {AppTreeNodeModel} from "../../../tree/app-tree-node.model";
import { BaseInfoEnum } from '../../../../enum/baseInfo.enum';
import { IconEnum } from '../../../../enum/icon.enum';
import { BaseInformation } from '../../../../model/baseInfromation.model';
import { InputBaseInformationTreeDialogComponent } from './baseInformation-tree-dialog/input-base-information-tree-dialog.component';


@Component({
  selector: 'app-input-base-information-tree',
  templateUrl: './input-base-information-tree.component.html'
})
export class InputBaseInformationTreeComponent extends AppBaseInputModel<AppInputBaseConfig> implements DoCheck, OnInit, OnChanges {

  /**
   * these arent real inputs, we are getting child directives as a input
   * please do not add another input
   */
  @Input() suffixIcon: string;
  @Input() suffixIconClicked: any;
  @Input() headerId: BaseInfoEnum;
  @Output() valueChange = new EventEmitter();
  baseInformationList: EventEmitter<any[]> = new EventEmitter<any[]>();
  differ: KeyValueDiffer<string, any>;
  isDisable = false;
  isRequired = false;
  isInputControlRequired = false;
  isReadOnly = false;
  selectedTitle: string | undefined = '';
  iconEnum = IconEnum;

  constructor(
    @Self() @Optional() public control: NgControl,
    private dialog: MatDialog,
    private baseInformationService: BaseInformationService,
    private cdr: ChangeDetectorRef,
    private appDialogService: AppDialogService,
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
    const selectedTitleCol = appFormConfig.formControl.find((control: AppFormControlModel) => control.name === this.control.name)
    let object = appFormConfig.formGroup.value;
    this.selectedTitle = object[selectedTitleCol.selectedTitle];

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
    this.selectedTitle = '';
    this.value = null;
  }

  onSuffixIconClicked() {
    const baseInformationDialogModel: AppDialogModel = {
      title: 'اطلاعات پایه',
      size: DialogSizeEnum.md,
      dialogData: this.headerId,
      onClose: (res: AppTreeNodeModel) => {
        if (res) {
          this.value = res.key
          this.inputForm.patchValue({myInput: res.key})
          let appFormConfig: AppFormConfig = this.appFormConfig;
          const selectedTitleCol = appFormConfig.formControl.find((control: AppFormControlModel) => control.name === this.control.name);
          appFormConfig.formGroup.patchValue({[selectedTitleCol.selectedTitle]: res.label})
          this.selectedTitle = res.label;
          if (selectedTitleCol && selectedTitleCol.onChangeValue) {
            selectedTitleCol.onChangeValue(res);
          }
        }
      }
    }
    this.appDialogService.openDialog<InputBaseInformationTreeDialogComponent, BaseInformation>(InputBaseInformationTreeDialogComponent, baseInformationDialogModel)
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
}
