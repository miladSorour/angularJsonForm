import {
  Component,
  DoCheck,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  Optional,
  Self,
  SimpleChanges
} from '@angular/core';
import {AppBaseInputModel} from '../app-base-input.model';
import {FormBuilder, NgControl} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {InputEnumHandlerService} from './input-enum-handler.service';
import {AppEnumModel} from './app-enum.model';
import {AppInputBaseConfig} from '../app-input-base-config';
import {AppFormConfig} from '../../form/app-form.config';
import {AppFormControlModel} from '../../form/app-form-control.model';
import { IconEnum } from '../../../enum/icon.enum';

@Component({
  selector: 'app-input-enum',
  templateUrl: './input-enum.component.html'
})
export class InputEnumComponent extends AppBaseInputModel<AppInputBaseConfig> implements DoCheck, OnChanges {
  @Input() enumXPath: string;
  @Input() required = false;
  @Input() isMultiple = false;
  differ: KeyValueDiffer<string, any>;
  viewValue: number | number[];
  isObject = true;
  appEnumModel: AppEnumModel[];
  iconEnum =  IconEnum;


  constructor(
    @Optional() @Self() public control: NgControl,
    private differs: KeyValueDiffers,
    private formBuilder: FormBuilder,
    private inputEnumHandlerService: InputEnumHandlerService) {
    super();
    this.differ = this.differs.find({}).create();
    control.valueAccessor = this;
  }

  onSelectionChange(event: MatSelectChange) {
    let appFormConfig: AppFormConfig = this.appFormConfig;
    const selectedTitleCol = appFormConfig.formControl.find((control: AppFormControlModel) => control.name === this.control.name);
    this.viewValue = event.value;
    let enumList: AppEnumModel[] = []
    if (this.isObject && this.isMultiple) {
      // @ts-ignore
      this.viewValue.forEach(item => {
        // @ts-ignore
        let appEnumModels: AppEnumModel = this.appEnumModel.find(enumItem => enumItem.index === item);
        if (appEnumModels) {
          enumList.push(appEnumModels)
        }
      })
      this.value = enumList;
    } else if (this.isObject && !this.isMultiple) {
      this.value = this.appEnumModel.find(enumItem => enumItem.index === this.viewValue);
    } else if (!this.isObject && !this.isMultiple) {
      this.value = this.appEnumModel.find(enumItem => enumItem.index === this.viewValue)!.index;
    } else if (!this.isObject && this.isMultiple) {
      //FIXME complete this section
    }
    if (selectedTitleCol && selectedTitleCol.onChangeValue) {
      selectedTitleCol.onChangeValue(this.value)
    }
  }

  // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
  ngDoCheck(): void {
    this.disabledInput();
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem(item => {
        if (item.key === '_value' && item.currentValue === null) {
          this.clearInput()
        }
        if (item.key === '_value' && item.currentValue !== null) {
          if (this.isObject && !this.isMultiple) {
            // @ts-ignore
            this.viewValue = this.appEnumModel.find(enumItem => enumItem.index === item.currentValue.index)?.index;
          } else if (!this.isObject && !this.isMultiple) {
            this.viewValue = this.value
          }
        }
      });
    }
  }

  // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
  ngOnChanges(changes: SimpleChanges): void {
    this.detectIsObject(changes);
    if (!changes.inputForm) {
      this.initForm();
      this.initEnum();
    }
  }

  clearInput() {
    this.value = null;
    this.viewValue = -1
  }

  private detectIsObject(changes: SimpleChanges) {
    const appFormConfig: AppFormConfig = changes.appFormConfig.currentValue;
    const isObject = appFormConfig.formControl.find((control: AppFormControlModel) => control.name === this.control.name).isObject;
    if (isObject == false) {
      this.isObject = false;
    }
  }

  private initEnum() {
    this.inputEnumHandlerService.getAllValues(this.enumXPath).subscribe((enumModel: AppEnumModel[]) => {
      this.appEnumModel = enumModel;
    })
  }

  private initForm() {
    this.inputForm = this.formBuilder.group({
      myInput: ['']
    });
  }
}
