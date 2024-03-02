import {Component, Injector, OnInit} from "@angular/core";
import {TreeModel} from "./tree.model";
import {TreeService} from "./tree.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Validators} from "@angular/forms";
import { BaseDialogComponentModel, WidgetTypeModel, AppContainerModel, AppFormGroup } from "@pnrng/json-form";

const ENUM_LOCATION = 'org.openprojects.framework.model.core.location.LocationType';

@Component({
  selector: 'app-location',
  template: `
    <app-json-form [containerList]="dialogCrudContainer"></app-json-form>`,
})

export class TreeFormComponent extends BaseDialogComponentModel<TreeModel> implements OnInit {

  constructor(private injector: Injector,
              private locationService: TreeService,
              public dialogRef: MatDialogRef<TreeFormComponent>) {
    super(injector,locationService);
  }

  ngOnInit() {
    this.initDialogContainer();
    this.editFormGroup.createFormGroup(this.getFormContainer().config.formControl)
    if (this.dialogConfig.dialogData.editMode == true) {
      this.locationService.find(this.dialogConfig.dialogData.element.key).subscribe(res => {
        this.editFormGroup.patchValue(res);
      });
    }
  }

  initDialogContainer() {
    this.dialogCrudContainer = [
      {
        widgetType: WidgetTypeModel.dialogTemplate,
        config: {
          pageTitle: 'ثبت',
          container: [this.getFormContainer()]
        },
        rows: 1,
      }
    ];
  }

  getFormContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.form, cols: 12, rows: 1,
      config: {formGroup: this.editFormGroup,
        formControl: [
          { name: 'id'            , inputType: WidgetTypeModel.hidden                                                                                           },
          { name: 'parentId'      , inputType: WidgetTypeModel.hidden                                                                                           },
          { name: 'type'          , inputType: WidgetTypeModel.enum         ,   validators: [Validators.required]  , placeholder: 'نوع'     , cols: 12, rows: 1
             , enumXPath: ENUM_LOCATION , isObject: false                                                       }  ,
          { name: 'title'         , inputType: WidgetTypeModel.string       ,   validators: [Validators.required]  , placeholder: 'عنوان'   , cols: 12, rows: 1 } ,
          { name: 'description'   , inputType: WidgetTypeModel.textArea                                            , placeholder: 'توضیحات' , cols: 12, rows: 2 } ,
        ],
        actions : [
          { title: 'ثبت'     , color: 'primary', onClick: () =>this.persist(), disabled: (form: AppFormGroup<TreeModel>) => {return form.invalid},},
          { title: 'پاک کردن', color: 'warn', onClick: () => this.editFormGroup.reset()}
        ]
      }
    }
    // @formatter:on
  }

  /**
   * بعد از ذخیره کدینگ جغرافیا اطلاعات مجددا بارگزاری میشود
   * @param entity TreeModel
   */
  afterPersist(entity?: TreeModel) {
    super.afterPersist(entity);
    this.dialogRef.close();
  }

  /**
   * ست کردن parentId قبل از ذخیره اطلاعات
   */
  beforePersist() {
    super.beforePersist();
      if (this.dialogConfig.dialogData.editMode == false) {
        this.editFormGroup.patchValueOnField('parentId', this.dialogConfig.dialogData.element.key)
      }
  }
}
