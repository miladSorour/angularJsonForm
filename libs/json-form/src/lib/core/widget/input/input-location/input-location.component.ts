import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormBuilder, NgControl} from '@angular/forms';
import {AppBaseInputModel} from '../app-base-input.model';
import {AppInputBaseConfig} from '../app-input-base-config';
import {AppFormConfig} from "../../form/app-form.config";
import {AppFormControlModel} from "../../form/app-form-control.model";
import { Observable, Subject} from 'rxjs';
import { Dropdown } from 'bootstrap';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IconEnum } from '../../../enum/icon.enum';
import { LocationService } from '../../../service/location.service';
import { BaseInfoEnum } from '../../../enum/baseInfo.enum';
import { LocationModel } from '../../../model/location.model';


@Component({
  selector: 'app-input-location',
  templateUrl: './input-location.component.html',
})
// eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
export class InputLocationComponent extends AppBaseInputModel<AppInputBaseConfig> implements DoCheck, OnInit, OnChanges {


  /**
   * these arent real inputs, we are getting child directives as a input
   * please do not add another input
   */
  @Input() suffixIcon: string;
  @Input() suffixIconClicked: any;
  @Input() locationName: BaseInfoEnum;
  @Input() multiple: any;
  @Output() valueChange = new EventEmitter();
  @Input() placeholder = '';
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  locationList: LocationModel[]=[]
  differ: KeyValueDiffer<string, any>;
  isDisable = false;
  isRequired = false;
  isInputControlRequired = false;
  isReadOnly = false;
  locationTerm = new Subject<string>();
  locationsList: LocationModel[]=[];
  selectedTitle: string  = '';
  iconEnum =  IconEnum;

  constructor(
    private locationService: LocationService,
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
    ngOnChanges(changes: SimpleChanges) {
      if (!changes.inputForm) {
        this.initForm();
      }
  
      if (changes.readonly) {
        this.isInputReadOnly();
      }
      if (changes.required) {
        this.isInputRequired();
      }

      let appFormConfig: AppFormConfig = changes.appFormConfig.currentValue;
      let control = this.findCurrentFormControl(appFormConfig, this.control);
      let object = appFormConfig.formGroup.value;
      this.selectedTitle = object[control.selectedTitle!];
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
  
  filterLocation(): void {
    const filterValue = this.input.nativeElement.value;
      if(filterValue !='' && filterValue !=null) {
      this.locationService.findByName(filterValue).subscribe(res=>{
        this.locationList=res
      })
    }
  }

  openedLocation(){
    this.selectedTitle=''
    this.value=null
    this.inputChange()

  }

  onSelectionChange(event: MatAutocompleteSelectedEvent) {
    if(this.selectedTitle!=event.option.value.title) {
      this.selectedTitle=event.option.value.title
      this.value=event.option.value.id
      let appFormConfig: AppFormConfig = this.appFormConfig;
      const selectedTitleCol = appFormConfig.formControl.find((control: AppFormControlModel) => control.name === this.control.name);
      if (selectedTitleCol && selectedTitleCol.onChangeValue) {
        selectedTitleCol.onChangeValue(event.option.value)
      }
   }
  }

  inputChange() {
    this.valueChange.emit(this.value);
    this.control.control?.markAsTouched();
 }

  clearInput() {
    this.value = null;
    this.selectedTitle = '';
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
