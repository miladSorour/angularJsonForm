import { Component, OnInit } from "@angular/core";
import { AppFormConfig, BaseComponent, BaseInfoEnum, IconEnum, InputValidators, UserModel } from '@pnrng/json-form';
import { AppFormControlDatasource } from '@pnrng/json-form';
import { WidgetTypeModel } from '@pnrng/json-form';
import { AppContainerModel } from '@pnrng/json-form';
import { CellType, TableType } from '@pnrng/json-form';
import { Pagination } from '@pnrng/json-form';
import { CssEnum } from '@pnrng/json-form';
import { ActionType } from '@pnrng/json-form';
import { Validators } from "@angular/forms";
import { AppFormGroup } from '@pnrng/json-form';
import { AppDialogModel, AppDialogService } from '@pnrng/json-form';
import { DialogSizeEnum } from '@pnrng/json-form';
import { FormModel } from "./form.model";
import { FormService } from "./form.service";
import { FormModalComponent } from "./modal-form/modal-form.component";
import { InputFormArrayConfig } from '../../../../../../../libs/json-form/src/lib/core/widget/input/input-form-array/input-form-array.config';
import { AppFormActionModel } from "libs/json-form/src/lib/core/widget/form/app-form-action.model";

@Component({
  selector: 'app-personnel-list',
  template: `
    <app-json-form [hidden]="!showList" [containerList]="containerList"></app-json-form>
    <app-json-form [hidden]="showList"  [containerList]="containerEdit"></app-json-form>
  `,
})
export class FormComponent extends BaseComponent<FormModel> implements OnInit {
  formControlDataSource = new AppFormControlDatasource();
  IconEnum

  constructor(
    private formService: FormService,
    private dialogService: AppDialogService,
  ) {
    super(formService)
  }

  ngOnInit() {
    super.ngOnInit();
    this.searchFormGroup.createFormGroup(this.getSearchBoxContainer().config.formControl);
    this.editFormGroup.createFormGroup(this.getFormContainer().config.formControl);
  }

  initContainerList(): void {
    // @formatter:off
    this.containerList = [
      {
        widgetType: WidgetTypeModel.crudTemplate,
        config: {
          pageTitle: 'input form',
          actions: [
            { title: 'new', onClick: () => { this.changeView(); this.editFormGroup.reset() }, color: 'primary' },
            { title: 'update', onClick: () => this.load(), color: 'warn' },
            { title: 'search', onClick: null, color: 'accent', id: 'searchBox' },
          ],
          searchBoxContainer: [this.getSearchBoxContainer()],
          container: [this.getTableContainer()]
        }
      }
    ];
    // @formatter:on
  }

  initContainerEdit() {
    this.containerEdit = [
      {
        widgetType: WidgetTypeModel.crudTemplate,
        config: {
          pageTitle: { new: 'new', edit: 'edit' },
          actions: [{ title: 'back', onClick: () => this.changeView() }], container: [this.getFormContainer()]
        }
      }
    ];
  }
  getTableContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.table,
      cols: 12, rows: 1,
      config: {
        tableType: TableType.normal,
        tableName: 'table',
        dataSource: this.tableDataSource,
        onPagination: (pagination: Pagination) => {
          this.onPagination(pagination);
        },
        columns: [
          { displayHeader: 'string', displayColumn: 'firstName' },
          { displayHeader: 'string', displayColumn: 'lastName' },
          { displayHeader: 'BADGE_PRIMARY', displayColumn: 'fatherName', displayColumnCSS: CssEnum.BADGE_PRIMARY },
          { displayHeader: 'date', displayColumn: 'birthDate' },
          { displayHeader: 'BADGE_SUCCESS', displayColumn: 'identifyNumber', displayColumnCSS: CssEnum.BADGE_SUCCESS },
          { displayHeader: 'string', displayColumn: 'nationalNumber' },
          {
            displayHeader: 'actions', displayColumn: 'action', type: CellType.action,
            actions: [
              {
                type: ActionType.dropDownButton,
                title: 'edit', icon: IconEnum.edit,
                onClick: (element: FormModel) => {
                  this.goToEditContainer(element)
                },
              },
              {
                type: ActionType.dropDownButton,
                title: 'delete', icon: IconEnum.delete,
                onClick: (element: FormModel) => this.delete(element.id),
              },
              {
                type: ActionType.dropDownButton,
                title: 'modal form', icon: IconEnum.select,
                onClick: (element: FormModel) => {
                  this.openPersonnelOrganization(element)
                },
              },
            ]
          }
        ]
      }
    }
    // @formatter:on
  }

  getSearchBoxContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.form,
      cols: 12, rows: 1,
      config: {
        formGroup: this.searchFormGroup,
        formControl: [
          { name: 'firstName', inputType: WidgetTypeModel.string, placeholder: 'string', cols: 3, rows: 1 },
          { name: 'lastName', inputType: WidgetTypeModel.string, placeholder: 'string', cols: 3, rows: 1 },
          { name: 'fatherName', inputType: WidgetTypeModel.string, placeholder: 'string', cols: 3, rows: 1 },
          { name: 'nationalNumber', inputType: WidgetTypeModel.string, placeholder: 'string', cols: 3, rows: 1 },
          { name: 'birthDate', inputType: WidgetTypeModel.dateAndTime, placeholder: 'dateAndTime', cols: 3, rows: 1 },
          { name: 'sexId', inputType: WidgetTypeModel.baseInfo, placeholder: 'baseInfo', cols: 3, rows: 1, headerId: () => BaseInfoEnum.SEX },
          { name: 'switch', inputType: WidgetTypeModel.switch, placeholder: 'switch', cols: 3, rows: 1, selectedTitle: 'switch', onChangeValue: (event: any) => this.onSelectionChange('birthLocation', event) },
          { name: 'enabled' , inputType: WidgetTypeModel.treeSwitch, placeholder: 'وضعیت' ,cols:3 , rows: 1                                   },
          { name: 'personnel', inputType: WidgetTypeModel.personnel, placeholder: 'personnel', cols: 3, rows: 1 },
          { name: 'group', inputType: WidgetTypeModel.group, placeholder: 'group', cols: 3, rows: 1, groupType:'group' },
          { name: 'userGroup', inputType: WidgetTypeModel.group, placeholder: 'userGroup', cols: 3, rows: 1, groupType:'userGroup' },
          { name: 'role', inputType: WidgetTypeModel.role, placeholder: 'role', cols: 3, rows: 1 },
          { name: 'users', inputType: WidgetTypeModel.users, placeholder: 'users', cols: 3, rows: 1 },
        ],
        actions: [
          { title: 'search', color: 'primary', onClick: () => this.load(), disabled: (form: AppFormGroup<UserModel>) => { return (form.invalid) }},
          { title: 'clear', color: 'warn', onClick: () => this.resetSearchForm(()=>this.searchFormGroup.patchValueOnField('enabled','')) }
        ]
      }
    }
    // @formatter:on
  }

  resetSearchForm2() {
    this.searchFormGroup.reset();
    // this.load()
  }

  getFormContainer() {
    return {
      widgetType: WidgetTypeModel.form,
      cols: 12, rows: 1,
      config: {
        formGroup: this.editFormGroup,
        formControl: [
          { name: 'id', inputType: WidgetTypeModel.hidden },
          { name: 'birthLocation', inputType: WidgetTypeModel.hidden, },
          { name: 'birthLocationTitle', inputType: WidgetTypeModel.hidden, },
          { name: 'registerLocation', inputType: WidgetTypeModel.hidden, },
          { name: 'registerLocationTitle', inputType: WidgetTypeModel.hidden, },
          { name: 'sexTopic', inputType: WidgetTypeModel.hidden, },
          { name: 'bloodTypeTopic', inputType: WidgetTypeModel.hidden, },
          { name: 'religionTopic', inputType: WidgetTypeModel.hidden, },
          { name: 'exReligionTopic', inputType: WidgetTypeModel.hidden, },
          { name: 'sectTopic', inputType: WidgetTypeModel.hidden, },
          { name: 'exSectTopic', inputType: WidgetTypeModel.hidden, },
          { name: 'dutyServiceTopic', inputType: WidgetTypeModel.hidden, },
          { name: 'dutyServiceLocation', inputType: WidgetTypeModel.hidden, },
          { name: 'dutyServiceLocationTitle', inputType: WidgetTypeModel.hidden, },
          { name: 'maritalStatusTopic', inputType: WidgetTypeModel.hidden, },
          { name: 'classificationTopic', inputType: WidgetTypeModel.hidden, },
          { name: 'birthCertificateSerialScriptTitle', inputType: WidgetTypeModel.hidden, },
          { name: 'divider', inputType: WidgetTypeModel.divider, title: 'divider' },
          { name: 'nationalNumber', inputType: WidgetTypeModel.number, placeholder: 'nationalCode', validators: [InputValidators.required,InputValidators.nationalCode()], cols: 4, rows: 1, },
          { name: 'fileCode', inputType: WidgetTypeModel.fileUploader, placeholder: 'fileUploader', cols: 4, rows: 1, },
          {
            name: 'inputsList', inputType: WidgetTypeModel.formArray, placeholder: 'inputsList', cols: 6, rows: 1, value: [{ a1: 'test1' }, { a1: 'test2' }],
            formArray: {
              cols: 6,
              formTitle: 'create',
              formGroup: this.editFormGroup,
              formControl: [
                { name: 'a1', inputType: WidgetTypeModel.string, placeholder: 'string', cols: 12, rows: 1 },
              ],
              actionsDisplay: false,
              actions: [
                {
                  title: 'add', color: 'primary', icon: IconEnum.plus,
                  onClick: (formConfigList: InputFormArrayConfig, formConfig: AppFormConfig, value: any, index: number) => {
                    formConfigList.add()
                  },
                  hide: (formConfigList: InputFormArrayConfig,action: AppFormActionModel, index: number) => {
                    return (action.title == 'add' && index === (formConfigList.appFormConfigs.length - 1))
                  }
                },
                {
                  title: 'remove', color: 'warn', icon: IconEnum.delete, onClick: (formConfigList: InputFormArrayConfig, formConfig: AppFormConfig, value: any, index: number) => {
                    formConfigList.removeByItem(formConfig)
                    if (formConfigList.length === 0) {
                      formConfigList.add()
                    }
                  },
                }
              ]
            }
          },
          { name: 'firstName', inputType: WidgetTypeModel.string, placeholder: 'string', cols: 4, rows: 1 },
          { name: 'lastName', inputType: WidgetTypeModel.color, placeholder: 'color', cols: 4, rows: 1 },
          { name: 'birthDate', inputType: WidgetTypeModel.dateAndTime, placeholder: 'dateAndTime', validators: [Validators.required], cols: 4, rows: 1, },
          { name: 'identifyDescription', inputType: WidgetTypeModel.textArea, placeholder: 'textArea', cols: 4, rows: 1, },
          { name: 'birthLocationId', inputType: WidgetTypeModel.location, placeholder: 'location', cols: 4, rows: 1, selectedTitle: 'birthLocationTitle', onChangeValue: (event: any) => this.onSelectionChange('birthLocation', event) },
          { name: 'sexId', inputType: WidgetTypeModel.baseInfo, placeholder: 'baseInfo', validators: [Validators.required], cols: 4, rows: 1, selectedTitle: 'sexTopic', headerId: () => BaseInfoEnum.SEX },
          {
            name: 'birthCertificateSerial', inputType: WidgetTypeModel.formControl, placeholder: 'birthCertificateSerial', cols: 4, rows: 1, formControl: [
              { name: 'birthCertificateSerialHeadNumber', inputType: WidgetTypeModel.number, placeholder: 'سریال شناسنامه', validators: [Validators.required], cols: 5, rows: 1, },
              { name: 'birthCertificateSerialScriptId', inputType: WidgetTypeModel.baseInfo, placeholder: 'سری حرفی', cols: 4, selectedTitle: 'birthCertificateSerialScriptTitle', rows: 1, headerId: () => BaseInfoEnum.SEX },
              { name: 'birthCertificateSerialNumber', inputType: WidgetTypeModel.number, placeholder: 'سری عددی', cols: 3, rows: 1, },
            ]
          },
          {
            name: 'inputAccordion', inputType: WidgetTypeModel.accordion, placeholder: 'baseInfo', cols: 12, rows: 1, accordion: [
              {title:'a1',description:'aaa1',panel:[
                { name: 'a11', inputType: WidgetTypeModel.number, placeholder: 'a11', validators: [Validators.required], cols: 4, rows: 1, },
                { name: 'a12', inputType: WidgetTypeModel.baseInfo, placeholder: 'a12', validators: [Validators.required], cols: 4, selectedTitle: 'birthCertificateSerialScriptTitle', rows: 1, headerId: () => BaseInfoEnum.SEX },
                { name: 'a13', inputType: WidgetTypeModel.number, placeholder: 'a13', cols: 4, rows: 1, },
              ]},
              {title:'a2',description:'aaa2',panel:[
                { name: 'a21', inputType: WidgetTypeModel.number, placeholder: 'a21', cols: 4, rows: 1, },
                { name: 'a22', inputType: WidgetTypeModel.baseInfo, placeholder: 'a22', cols: 4, selectedTitle: 'birthCertificateSerialScriptTitle', rows: 1, headerId: () => BaseInfoEnum.SEX },
                { name: 'a23', inputType: WidgetTypeModel.number, placeholder: 'a31', cols: 4, rows: 1, },
              ]}
            ]
          },

        ],
        actions: [
          { title: 'register', color: 'primary', onClick: () => this.persist(), disabled: (form: AppFormGroup<UserModel>) => { return form.invalid } },
          { title: 'clear', color: 'warn', onClick: () => this.editFormGroup.reset() }
        ]
      }
    }
  }

  private openPersonnelOrganization(personnel: FormModel) {
    const dialogConfig: AppDialogModel = { size: DialogSizeEnum.md, dialogData: personnel, onClose: () => this.load() }
    this.dialogService.openDialog(FormModalComponent, dialogConfig)
  }

  onSelectionChange(controlName: string, event?: any) {
    this.editFormGroup.patchValueOnField(`${controlName}Title`, event.title);
    this.editFormGroup.patchValueOnField(controlName, event);

  }

  private onPagination(pagination: Pagination) {
    this.pagination = pagination;
    this.load()
  }

  afterPersist(entity?: FormModel) {
    super.afterPersist(entity);
    this.changeView()
    this.load();
  }

}
