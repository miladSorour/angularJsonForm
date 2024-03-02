import {AfterViewInit, Component, Injector} from '@angular/core';


import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ModelProperty} from "./model-property.model";
import {Validators} from "@angular/forms";
import { Pagination } from '../../../model/pagination.model';
import { CartableService } from '../../../service/cartable.service';
import { BaseDialogComponentModel } from '../../../model/base-dialog-component.model';
import { UserService } from '../../../service/user.service';
import { WidgetTypeModel } from '../../../config/widget-type.model';
import { Confirm } from '../../../model/confirm.model';
import { AppContainerModel } from '../../../json-form/model/app-container.model';


@Component({
  selector: 'base-confirmation',
  template: `
    <app-json-form [containerList]="dialogCrudContainer"></app-json-form>`
})
export class ConfirmationComponent extends BaseDialogComponentModel<Confirm> implements AfterViewInit {
  pagination = new Pagination('e.id');
  defaultImageSrc = 'assets/media/avatars/blank.png';
  public properties: ModelProperty[];
  public processInstanceId: string;

  constructor(private injector: Injector,
              private routerService: Router,
              private cartableService: CartableService,
              private userService: UserService,
              public dialogRef: MatDialogRef<ConfirmationComponent>,
  ) {
    super(injector, cartableService);
    this.dialogCrudContainer = [
      {
        widgetType: WidgetTypeModel.dialogTemplate,
        config: {
          pageTitle: 'تاییدات و نظر کارشناس',
          container: [this.getFormContainer()],
        },
      }
    ];
  }

  ngAfterViewInit(): void {
    this.loadAll()
  }

  getFormContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType : WidgetTypeModel.form,
      cols       : 12,             rows : 1,
      config     : {
        formGroup   : this.editFormGroup,
        formControl :  [
          { name: 'id'             ,inputType: WidgetTypeModel.hidden                                                                                           },
          { name: 'expertOpinion'  ,inputType: WidgetTypeModel.enum        ,validators: [Validators.required], placeholder: 'پاسخ'        ,cols: 6, rows: 2     },
          { name: 'description'    ,inputType: WidgetTypeModel.textArea    ,validators: [Validators.required], placeholder: 'توضیحات'     ,cols: 6, rows: 2     },
        ],
        actions : [
          { title: 'ثبت'         , color: 'primary', onClick: () => this.persist()  },
          { title: 'پاک کردن'    , color: 'warn'   , onClick: () => this.resetForm()}
        ]
      }
    }
    // @formatter:on
  }

  /**
   * پاک کردن اطلاعات فرم  (ثبت و ویرایش)
   */
  resetForm() {
    this.editFormGroup.reset()
    this.resetSearchForm();
  }

  loadAll() {
    if (this.dialogConfig.dialogData.modelId && this.dialogConfig.dialogData.processDefKey) {
      this.cartableService.getHistoricProcessInstance(this.dialogConfig.dialogData.modelId, this.dialogConfig.dialogData.processDefKey).subscribe(res => {
        this.processInstanceId = res.rootProcessInstanceId;

      });
    }
  }



}
