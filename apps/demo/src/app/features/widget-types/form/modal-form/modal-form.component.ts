import {Component, Injector, OnInit} from '@angular/core';
import {AppFormControlDatasource, IconEnum} from '@pnrng/json-form';
import {WidgetTypeModel} from '@pnrng/json-form';
import {AppContainerModel} from '@pnrng/json-form';
import {CellType, TableType} from '@pnrng/json-form';
import {ActionType} from '@pnrng/json-form';
import {Validators} from "@angular/forms";
import {AppFormGroup} from '@pnrng/json-form';
import {BaseDialogComponentModel} from '@pnrng/json-form';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ModalFormService} from "./modal-form.service";
import {ModalFormModel} from "./modal-form.model";
import {getDistanceDate} from '@pnrng/json-form';

const TXT_INVALID_START_DATE='تاریخ شروع نمی تواند از تاریخ انفصال بزرگتر باشد.'
const TXT_INVALID_START_DUPLICATE='سازمان مورد نظر نمی تواند تکراری باشد'

@Component({
  selector: 'app-personnel-list',
  template: `<app-json-form [containerList]="dialogCrudContainer"></app-json-form>`,
})
export class FormModalComponent extends BaseDialogComponentModel<ModalFormModel> implements OnInit {

  formControlDataSource = new AppFormControlDatasource();
  containerList: AppContainerModel[];


  constructor(private injector: Injector,
              private modalFormService: ModalFormService,
              public dialogRef: MatDialogRef<FormModalComponent>,
              public dialog: MatDialog
  ) {
    super(injector, modalFormService);
  }

  ngOnInit() {
    super.ngOnInit()
    this.load()
  }

  initContainerList(): void {
    this.dialogCrudContainer = [
      {
        widgetType: WidgetTypeModel.dialogTemplate,
        config: {
          pageTitle: `modal form`,
          container: [this.getFormContainer(), this.getTableContainer()]
        },
      }
    ];
    this.editFormGroup.createFormGroup(this.getFormContainer().config.formControl)
  }

  getFormContainer(): AppContainerModel {
    return {
      widgetType: WidgetTypeModel.form,
      cols: 12,                rows: 1,
      config: {
        formGroup: this.editFormGroup,
        formControl: [
          { name: 'id'      , inputType: WidgetTypeModel.hidden },
          { name: 'personnelId'      , inputType: WidgetTypeModel.hidden       , value: this.dialogConfig.dialogData.id },
          { name: 'organizationName' , inputType: WidgetTypeModel.hidden                                                                                     } ,
          { name: 'organizationId'   , inputType: WidgetTypeModel.organization , placeholder: 'organization'       , cols: 6, rows: 1 ,validators:[Validators.required], selectedTitle: 'organizationName' },
          { name: 'startDate'        , inputType: WidgetTypeModel.dateAndTime  , placeholder: 'dateAndTime'   , cols: 6, rows: 1, validators:[Validators.required]},
          { name: 'isSeparate'       , inputType: WidgetTypeModel.switch       , placeholder: 'switch' , cols: 6, rows: 1, },
          { name: 'separateDate'     , inputType: WidgetTypeModel.dateAndTime  , placeholder: 'dateAndTime' , cols: 6, rows: 1,
            hide: (appFormGroup: AppFormGroup<ModalFormModel>) => {
              let status=appFormGroup.getColumnValue('isSeparate')
              if(status) {
                appFormGroup.enableColumn('separateDate')
              }else {
                appFormGroup.disableColumn('separateDate')
              }
              return !status
            },
            validators: [Validators.required]
          },
        ],
        actions: [
          { title: 'register'     , color: 'primary', onClick: () => this.persist(), disabled: (form: AppFormGroup<ModalFormModel>) => {return form.invalid}},
          { title: 'clear', color: 'warn'   , onClick: () => this.editFormGroup.reset()}
        ]
      }
    }
  }

  getTableContainer(): AppContainerModel {
    return {
      widgetType: WidgetTypeModel.table,
      cols: 12,                 rows: 1,
      config: {
        tableType: TableType.normal,
        tableName: '',
        dataSource: this.tableDataSource,
        pagination: this.pagination,
        columns: [
          { displayHeader: 'string'       , displayColumn: 'organizationName' },
          { displayHeader: 'date'   , displayColumn: 'startDate'}      ,
          { displayHeader: 'boolean' , displayColumn: 'isSeparate'      , type: CellType.icon, icon: (element: ModalFormModel)=> element.isSeparate ? IconEnum.check : IconEnum.xMark},
          { displayHeader: 'date' , displayColumn: 'separateDate'}   ,
          {
              displayHeader: 'actions'       , displayColumn: 'action', type: CellType.action,
              actions: [
                  {
                  type: ActionType.dropDownButton , title: 'edit' , icon: IconEnum.edit,
                   onClick: (element: ModalFormModel) => { this.editFormGroup.patchValue(element)}
                  },
                  { 
                    type: ActionType.dropDownButton, title: 'delete'   , icon: IconEnum.delete, 
                    onClick: (element: ModalFormModel) =>  this.delete(element.id),      
                  }
              ]
          }
        ]
      }
    }
  }

    /**
   * ذخیره اطلاعات براساس userId کاربر
   */
    persist() {
      let startDate= String(this.editFormGroup.get('startDate')?.value)
      let separateDate=String(this.editFormGroup.get('separateDate')?.value)
      const distance=getDistanceDate(startDate,separateDate)
      if(distance>0){
        this.notifySuccess(TXT_INVALID_START_DATE);
      }
      else if(this.tableDataSource.data.filter((item:any)=>item.organzationId==this.editFormGroup.get('organizationId')?.value).length>0
      ){
        this.notifySuccess(TXT_INVALID_START_DUPLICATE);
      } else{
        super.persist();
      }
    }
  

    load() {
      this.modalFormService.findByPersonnelId(this.dialogConfig.dialogData.id).subscribe(res=>{
        this.tableDataSource.data=res
      })
    }
    
    /**
     * بعد از ذخیره نقش اطلاعات مجددا بارگزاری میشود
     * @param entity UserRole
     */
    afterPersist(entity?: ModalFormModel) {
      super.afterPersist(entity);
      this.load()
    }
}
