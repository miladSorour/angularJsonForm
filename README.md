# json-form-builder



## Getting started

# Table Of Content

[naming conventions](#naming-conventions)

[How to create CRUD](#how-to-create-crud)

- [First steps](#first-steps)
- [How to create table](#how-to-create-table)
- [How to create search form](#how-to-create-search-form)
- [How to create edit/insert form](#how-to-create-edit-or-insert-form)
- [Final steps](#final-steps)

- [widget types](widget-type)
  - [chart](#chart)
    - [line chart](#line-chart)
    - [bar chart](#bar-chart)
    - [pie chart](#pie-chart)
  - [form](#form)
    - [form control](#form-control)
      - [input type](#input-types)
        - [string](#string)
        - [number](#number)
        - [enum](#enum)
        - [organization](#organization)
        - [location](#location)
        - [baseInformation](#base-information)
        - [fileUploader](#file-uploader)
        - [dateAndTime](#date-and-time)
        - [checkBox](#check-box)
        - [switch](#switch)
        - [treeSwitch](#tree-switch)
        - [formControl](#form-control2)
        - [formArray](#form-array)
        - [accordion](#accordion)
        - [custom](#custom)
      - [event types](#event-types)
        - [disable](#disable)
        - [hide](#hide)
        - [onChangeValue](#on-change-value)
      - [inputValidators](#input-validators)
        - [nationalCode](#national-code)
  - [divider](#divider)
  - [table](#table)
    - [with paginator](#with-paginator)
    - [without paginator](#without-paginator)
    - [with lazy sort](#with-lazy-sort)
    - [column types](#column-types)
      - [simple](#simple)
      - [calculate](#calculate)
      - [image](#image)
      - [icon](#icon)
      - [innerhtml](#innerhtml)
      - [progressBar](#progress-bar)
      - [nested](#nested)
      - [custom css](#column-with-custom-css)
      - [action](#action)
        - [inline button](#inline-button)
        - [dropdown button](#dropdown-button)
        - [Inline Button And Drop down Button](#inline-button-and-drop-down-button)
        - [with authority](#with-authority)
      - [pipe Column](#pipe-column)
        - [with pipe arg](#with-pipe-arg)
        - [without pipe arg](#without-pipe-arg)
  - [tree table](#tree-table)
  - [tab](#tab)
  - [button](#button)
  - [crud template](#crud-template)
  - [crud template Toggle Base](#crud-template-Toggle-base)
  - [Tree](#tree)
    - [single mode](#single-mode)
    - [multi mode](#multi-mode)
    - [context menu](#context-menu)
      - [create context menu](#create-context-menu)
        - [context events](#context-menu)
          - [hidden context menu](#hidden-context-menu)
          - [disabled context menu](#disabled-context-menu)
  - [attachment](#attachment)
  - [base info property](#base-info-property)
  - [dialog](#dialog)
    - [dialog events]()
      - [onClosed dialog](#onClosed-dialog)
  - [pdf viewer](#pdf-viewer)

[How to create custom input](#create-custom-input)

[How to create custom widget](#create-custom-widget)

## naming conventions

- organization



## how to create crud

## First steps

- `First steps`

```typescript
  @Component({
  selector: 'base-exception-translator',
  template: `
    <h1>THIS IS TEMPORARY!</h1>
  `,
   })
  // create a class as your component , extend BaseComponent and add your model as a type parameter
  export class AppExceptionTranslatorComponent extends BaseComponent<AppExceptionTranslatorModel> implements OnInit {

  // add constructor with your service as an argument
  constructor(
    private appExceptionTranslatorService: AppExceptionTranslatorService,
  ) {
   // call super class and pass service as argument
    super(appExceptionTranslatorService)
  }
  // the potential contents of this method is explained in the "Final-steps" section of the document
  ngOnInit() {}

```

## how to create table

- `How to create table`

```typescript
  // create a getTableContainer method with AppContainerModel as type
  getTableContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.table,
      cols: 12,                 rows: 1,
      config: {
        // create a tableType config and declare it as TableType.normal for a normal table
        tableType: TableType.normal,
        // declare a table name with your desired name (NOTE: this isn't shown to user)
        tableName: 'خطاهای سامانه',
        // declare a table dataSource which handles the data for the table
        dataSource: this.tableDataSource,
        onPagination: (pagination: Pagination) => {
          this.pagination = pagination;
          this.load();
        },
        // create a columns object declaring your table columns inside
        // displayHeader is shown as table headers
        // displayColumn must be the same as the fields declared in model
        columns: [
          {displayHeader: 'خطای لاتین'  , displayColumn: 'englishMessage'                                               },
          {displayHeader: 'خطای فارسی' , displayColumn: 'persianMessage'                                               },
          {displayHeader: 'کد خطا'     , displayColumn: 'code'         , displayColumnCSS: CssEnum.BADGE_PRIMARY       },
          // create an object for a dropdown menu containing refrences to other operations such as delete and edit
          {
            displayHeader: 'عملیات'    , displayColumn: 'action', type: CellType.action,
            actions: [
              {
                type: ActionType.dropDownButton, title: 'ویرایش', icon: IconEnum.edit,
                // call methods as an onClick event for example here for edit action we call our getEditContainer method
                onClick: (element: AppExceptionTranslatorModel) => {this.goToEditContainer(element)},
              },
              {
                type: ActionType.dropDownButton, title: 'حذف', icon: IconEnum.delete,
                // here we call the delete method as an onClick event which will handle deleting a record
                // the delete method is declared in base-component.model.ts and we have to pass the id
                // NOTE: id is declared within baseEntity.model.ts so there is no need for declaration inside your components' model
                onClick: (element: AppExceptionTranslatorModel) => this.delete(element.id),
              }
            ]
          }
        ]
      }
    }
    // @formatter:on
  }

  // create a initContainerList method with void as type
  // in this method we declare the title of the page and then pass our "getTableContainer()" method as the container
  // also declare a "this.containerList" config which containes our generic CRUD templates
  initContainerList(): void {
    // @formatter:off
    // NOTE the name of this property (containerList)
    this.containerList = [
      {
        widgetType: WidgetTypeModel.crudTemplate,
        config: {
          // this is the title shown to user as our CRUD title
          pageTitle: 'خطاهای سامانه',
          actions: [
            // here we declare buttons doing the crud operations
            // the title of each property is the name of each button
            // the 'جدید' button does the INSERT operation , onClick this will open your formGroup for adding a new record
            // NOTE: formGroups are explained at the form section of the document
            { title: 'جدید'        , onClick: () => this.changeView()       , color: 'primary'                 },
            // the 'به روز رسانی' button does the refresh action
            { title: 'به روز رسانی', onClick: () => this.load()             , color: 'warn'                    },
            // the 'جستجو' gives us a form with intended for search operation
            { title: 'جستجو'       , onClick: null                          , color: 'accent' , id: 'searchBox'},
          ],
          // here we pass our getTableContainer() method
          container: [this.getTableContainer()],
          // here we pass the getSearchBoxContainer() method for a search box which will be shown onClick of the 'جستجو' button
          // this form is explained at the "Create Search form" section
          searchBoxContainer: [this.getSearchBoxContainer()]
        }
      }
    ];
    // @formatter:on

```

## how to create search form

- `Create Search form`

```typescript
    // create a getTableContainer method with AppContainerModel as type
    getSearchBoxContainer(): AppContainerModel {
      // @formatter:off
      return {
        // declare your widgetType as "WidgetTypeModel.form" for a normal form
        widgetType : WidgetTypeModel.form,
        cols       : 12,             rows : 1,
        config : {
          // create a formGroup config and declare it as this.searchFormGroup for a search form
          // NOTE: searchFormGroup is declared within base-component.mode.ts
          formGroup   : this.searchFormGroup,
          // create a formControl config which containes each of the inputs
          formControl :  [
            // each object is an input
            // declare "name"s equal to the name of the fields inside your model
            // create an "inputType" property , this property determines the type of your input , "WidgetTypeModel.string" gives you a text input
            // for a placeholder declare a "placeholder" and set it to a string as your desired placeholder for the input
            // declare a "cols" property which determins the width of the input
            // declare a "rows" property which determins the height of the input
            {name: 'englishMessage'  , inputType: WidgetTypeModel.string       , placeholder: 'عنوان خطا انگلیسی'  , cols: 5, rows: 2} ,
            {name: 'persianMessage'  , inputType: WidgetTypeModel.string       , placeholder: 'عنوان خطا فارسی'    , cols: 5, rows: 2} ,
            {name: 'code'            , inputType: WidgetTypeModel.number       , placeholder: 'کد خطا'             , cols:5 , rows: 2} ,
          ],
          actions: [
            // call load() method as the onClick event which does the search operation
            { title:    'جستجو', color: 'primary', onClick: () => this.load()          },
            // call resetSearchForm() to delte all the values currently inside the inputs
            { title: 'پاک کردن', color: 'warn'   , onClick: () => this.resetSearchForm()}
          ]
        }
      };
      // @formatter:on
    }

```

## how to create edit or insert form

- `Create a form intended for edit adn insert operations`

Create a getFormContainer method which returns an object containing our form properties

when the 'جدید' button inside the initContainerList() method is clicked on , or the 'ویرایش' is selected from the dropdown menu declared in getTableContainer() method a form is created for the said operations

the properties declared inside this method determines the inputs of the form

```typescript

  getFormContainer() {
    // @formatter:off
    return {
      // create a widgetType property and set to WidgetTypeModel.form for a normal form
      widgetType : WidgetTypeModel.form,
      cols       : 12,         rows : 1,
      config     : {
        // create a formGroup config and declare it as this.editFormGroup for an edit form
        formGroup   : this.editFormGroup,
        // create a formControl config , in this config declare your inputs
        // NOTE: the name of each input must be the same as the name of the fields inside your model
        // NOTE: we dont have an "id" field inside our model for AppExceptionTranslator but this field is declared inside baseEntity.model.ts
        // each property of and its components are explained in the "How-to-create-search-form" section
        formControl :  [
          // create an input with name as "id" and the type as hidden  , this is your record id (IMPORTANT!)
          { name: 'id'             ,inputType: WidgetTypeModel.hidden                                                                                          },
          { name: 'englishMessage' ,inputType: WidgetTypeModel.string , placeholder: 'خطا لاتین'    , cols: 4 , rows: 1 ,validators: [Validators.required]      },
          { name: 'persianMessage' ,inputType: WidgetTypeModel.string , placeholder: 'خطا فارسی'   , cols: 4 , rows: 1 ,validators: [Validators.required]      },
          { name: 'code'           ,inputType: WidgetTypeModel.number , placeholder: 'کد خطا'      , cols: 4 , rows: 1 ,validators: [Validators.required]      }
        ],
        actions : [
          // here we use the persist() method for editing and insert operations , this method is declared at base-component.model.ts
          { title: 'ثبت'     , color: 'primary', onClick: () => this.persist(), disabled: (form: AppFormGroup<UserModel>) => {return form.invalid}},
          { title: 'پاک کردن', color: 'warn'   , onClick: () => this.editFormGroup.reset()}
        ]
      }
    }
    // @formatter:on
  }

```

## final steps

Make some Changes to th @Component() decorator

in the template section declare 2 <app-json-form [hidden]="" [containerList]=""></app-json-form>

the first tag is for the table

```typescript
// the [containerList] attribute must be the same as the name
<app-json-form [hidden]="!showList" [containerList]="containerList"></app-json-form>

```

```typescript

@Component({
  selector: 'base-exception-translator',
  template: `
    <app-json-form [hidden]="!showList" [containerList]="containerList"></app-json-form>
    <app-json-form [hidden]="showList"  [containerList]="containerEdit"></app-json-form>
  `,
})

```

Create an afterPersist() method

this method will handle some operations after the persist() method is called

this method gets called at the end of the persist method so we don't need to call it

```typescript

  afterPersist() {
    super.afterPersist();
    // when changeView() is called the edit/insert form is disposed and the table is shown
    this.changeView()
    // when load() is called the data is refreshed and shown inside the table
    this.load()
  }


```

## widget types

## chart

### line-chart

### bar-chart

```typescript
  getBarChartContainer(): AppContainerModel {
    return {
      widgetType: WidgetTypeModel.barChart,
      cols: 12, rows: 1,
      config: {
        chartName: '',
        chartType: 'category',
        data: [
          {
            name: "استعلام",
            xColumnName: "date",
            yColumnName: "value",
            data: [
              { "date": "1401/03/01", "value": 20 },
              { "date": "1401/05/02", "value": 40 },
              { "date": "1401/03/05", "value": 30 },
              { "date": "1401/06/02", "value": 10 },
              { "date": "1401/01/01", "value": 50 }],
          },
        ]
      }
    }
  }
```

### pie-chart

```typescript

  getPieChartContainer(): AppContainerModel {
    return {
      widgetType: WidgetTypeModel.pieChart,
      cols: 12, rows: 1,
      config: {
        chartName: '',
        chartType: 'category',
        data:
          {
            name: "استعلام",
            labelName: "label",
            valueName: "value",
            data: [
              { "label": "1401/03/01", "value": 20 },
              { "label": "1401/04/02", "value": 40 }
              ],
          },
      }
    }
  }
```

```typescript
  getBarChartContainer(): AppContainerModel {
    return {
      widgetType: WidgetTypeModel.barChart,
      cols: 12, rows: 1,
      config: {
        chartName: '',
        chartType: 'category',
        data: [
          {
            name: "استعلام",
            xColumnName: "date",
            yColumnName: "value",
            data: [
              { "date": "1401/03/01", "value": 20 },
              { "date": "1401/05/02", "value": 40 },
              { "date": "1401/03/05", "value": 30 },
              { "date": "1401/06/02", "value": 10 },
              { "date": "1401/01/01", "value": 50 }],
          },
        ]
      }
    }
  }
```

## Form

- `create form`

```typescript
 containerEdit  : AppContainerModel[];
 editFormGroup  = new AppFormGroup<T>({});

 ngOnInit() {
   this.initContainerEdit();
   this.editFormGroup.createFormGroup(this.getFormContainer().config.formControl);
 }

 getFormContainer() {
    // @formatter:off
    return {
      widgetType : WidgetTypeModel.form,
      cols       : 12,             rows : 1,
      config     : {
        formGroup   : this.editFormGroup,
        formControl :  [
          { name: 'id'                  ,inputType: WidgetTypeModel.hidden                                                                                                                                 },
          { name: 'fullName'            ,inputType: WidgetTypeModel.hidden                                                                                                                                 },
          { name: 'username'            ,inputType: WidgetTypeModel.string    ,validators: [Validators.required], placeholder: 'نام کاربری' ,cols: 4, rows: 1                                              },
          { name: 'enabled'             ,inputType: WidgetTypeModel.switch    ,validators: [Validators.required], placeholder: 'وضعیت'      ,cols: 4, rows: 1                                              },
          { name: 'enabled'        , inputType:
          WidgetTypeModel.ToggleGroup,
          placeholder: 'وضعیت',cols:3 , rows: 1 , labelsGroup:
          {any:'هر دو',inactive:'غیر فعال', active:'فعال'}                                   },
          { name: 'fileCode'            ,inputType: WidgetTypeModel.fileUploader                                , placeholder: 'عکس پروفایل',cols: 4, rows: 4 , showRemove: true, showDownload: true       }
        ],
        actions : [
          { title: 'ثبت'     , color: 'primary', onClick: () => this.editInfo(), disabled: (form: AppFormGroup<UserModel>) => {return form.invalid},},
          { title: 'پاک کردن', color: 'warn'   , onClick: () => this.resetFormGroup()}
        ]
      }
    }
    // @formatter:on
  }

```

add this component to html file

```html
<app-json-form
  *ngIf="!showList"
  [containerList]="containerEdit"
></app-json-form>
```

## form control

## input type

### string

- `how to create string type input`

```typescript
{name: 'userName' , inputType: WidgetTypeModel.string   ,placeholder:  'نام کاربری'   , cols: 2}

// name : In this section we write attributeName , this name must be same with the model name for read data frome backend.
// inputType : In this section we can define the type of the input here , first write WidgetTypeModel. and then write the type of input.
// palceholder : In this section we write a placeholder for the input.
// cols : In this section we can set the width of the input.
'**features**'
// minlength  : string =>  we can set the minimum of this input
// maxlength  : string  => we can set the maximum of this input , the defult value is '60'.
// isDisable  : boolean => this features don't allow user to chang the value and will be pale , defulte value is false
// required   : boolean => if required === '' return true , else if required !== undefined return the value of this.required , and if you don't set any value is defult = false
// isReadOnly : boolean => this features don't allow user to chang the value, defulte value is false

```

### number

- `how to create number type input`

```typescript
{name: 'userName' , inputType: WidgetTypeModel.number   ,placeholder:  'نام کاربری'   , cols: 2 }
// in order to create a number input declare "inputType" as "WidgetTypeModel.number"
'**features**'
// min : string => we can set the minimum of this input.
// max : string => we can set the maximum of this input.
// isDisable : boolean => this features don't allow user to chang the value, defulte value is false
// isRequired : boolean => this features force client to fill this input, defulte value is false
// isReadOnly =  read description in string section

```

### enum

- `how to create string type input`

```typescript
{name: 'userName' , inputType: WidgetTypeModel.string   ,placeholder:  'نام کاربری'   , cols: 2 , enumXPath: JavaEnum.LOGIN_HISTORY_STATUS   , isObject : false , required :true , isMultiple : false }
// in order to create a enum input declare "inputType" as "WidgetTypeModel.enum"
'**features**'
// enumxPath : In this section, we determine the path where we determined the enum values(from common pakage).
// is Object : boolean => In this section we select the input is Object or not ,if we chose 'isObject : false' it's return id ,if we chose 'isObject : true' it's return object ,
// if you dont define the 'isObject' is defult false.
// isMultiple : boolean => if we have more than one value we set isMultiple : true , else set false , and if you don't set any value is defult = false.
// required : read description in string section.

```

### organization

- `how to use organization component`

```typescript
{name: 'organizationId'  , inputType: WidgetTypeModel.organization   , placeholder: 'یگان'   , selectedTitle: 'organizationName'},

//to use organization you must import 'AccessControlModule' in module of directory
// second step is write " selectedTitle: 'organizationName' " in input of form
```

### location

- `how to use location component`

```typescript
{name: 'birthLocationId'  , inputType: WidgetTypeModel.location , placeholder:
'محل تولد' , selectedTitle: 'birthLocationTitle'},

//to use InputLocation you must import 'AccessControlModule' in module of directory
// second step is write " selectedTitle: 'birthLocationTitle' " in input of form
```

### base-information

first determine the header id of the base information

then declare a name for it and set it as the header id in common/baseInfo.enum.ts

```typescript
export enum BaseInfoEnum {
  BASE_ALARM_ID = 10313,
  // for example we have the base alarm id header with the header id of 10313
}
```

then use the header like this in your json form

```typescript
{name: 'baseAlarmTopic', inputType: WidgetTypeModel.baseInfo, placeholder: 'مبنای تولید هشدار'  , cols:3 , rows: 2, headerId: () =>  BaseInfoEnum.BASE_ALARM_ID } ,
```

### file-uploader

- `how to create fileUploader type input`

```typescript
{name: 'fileCode' , inputType: WidgetTypeModel.fileUploader   ,placeholder:  'عکس پروفایل'   , cols: 2 , showRemove: true , showFileName :true , showDownload : true }
// in order to create a fileUploader input declare "inputType" as "WidgetTypeModel.fileUploader"
'**features**'
// showRemove   : boolean => show remove button
// showFileName : boolean => show fileName
// showDownload : boolean => show download button

```

### tree-switch

```typescript
{ name: 'enabled' , inputType: WidgetTypeModel.treeSwitch, placeholder: 'وضعیت' ,cols:3 , rows: 1 ,
labelsGroup:{any:'هر دو',inactive:'غیر فعال', active:'فعال'}                                   }
```

### form-control2

- `how to create formControl type input`

```typescript
          {
            name: 'birthCertificateSerial', inputType: WidgetTypeModel.formControl, placeholder: 'birthCertificateSerial', cols: 4, rows: 1, formControl: [
              { name: 'birthCertificateSerialHeadNumber', inputType: WidgetTypeModel.number, placeholder: 'testال شناسنامه', validators: [Validators.required], cols: 5, rows: 1, },
              { name: 'birthCertificateSerialScriptId', inputType: WidgetTypeModel.baseInfo, placeholder: 'test حرفی', cols: 4, selectedTitle: 'birthCertificateSerialScriptTitle', rows: 1, headerId: () => BaseInfoEnum.SEX },
              { name: 'birthCertificateSerialNumber', inputType: WidgetTypeModel.number, placeholder: 'test عددی', cols: 3, rows: 1, },
            ]
          },
```

### form-array

- `how to create formArray type input`

```typescript
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
```

### accordion
- `how to create accordion type input`
```typescript
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

```

## custom

in order to create a custom input follow the steps below :

1. Create a component ts file , make sure that the component extends BaseDialogComponent

```typescript
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-dialog-search-organization',
  template: ` <app-json-form
    [containerList]="dialogCrudContainer"
  ></app-json-form>`,
})
export class OrganizationSearchComponent extends BaseDialogComponentModel<Organization> {}
```

2. make a Pagination instance and declare a constructor like below:

```typescript
  paging = new Pagination('e.id');

  constructor(private injector: Injector,
              public dialogRef: MatDialogRef<OrganizationSearchComponent>,
              private organizationService: OrganizationService) {
    super(injector, organizationService);
    this.initDialogContainer();
  }

```

3. declare 2 methods , one with your container and in the other one initialize the container

```typescript
getTableContainer(): AppContainerModel {
  // @formatter:off
  return {
    widgetType: WidgetTypeModel.table,
    cols: 12,                     rows: 1,
    config: {
      tableType: TableType.normal,
      tableName: 'سازمان',
      dataSource: this.tableDataSource,
      pagination: this.paging,
      onPagination: (pagination: Pagination) => {
        this.onPagination(pagination);
      },
      columns: [
        {displayHeader: 'عنوان '          , displayColumn: 'name'                               },
        {displayHeader: 'موقعیت جفرافیایی', displayColumn: 'location' ,type: CellType.calculate,
          calcDisplayColumn: (element: any) => {return element.location.title}                  },
        { displayHeader: 'عملیات'         , displayColumn: 'action'  , type: CellType.action,
          actions: [
            {
              type: ActionType.inlineTableButton,
              tooltip: 'انتخاب'                 , icon: IconEnum.select, color: "primary",
              onClick: (element: Organization) => this.selectedOrganization(element),
            }
          ]
        }
      ]
    }
  }
  // @formatter:on
}

initDialogContainer() {
  this.dialogCrudContainer = [
    {
      widgetType: WidgetTypeModel.dialogTemplate,
      config: {
        pageTitle: 'سازمان',
        container: [this.getSearchFormContainer(), this.getTableContainer()]
      },
      rows: 1,
    }
  ];
  this.searchFormGroup.createFormGroup(this.getSearchFormContainer().config.formControl)
}

```

4. add these methods for handling selection and pagination

```typescript
    // pass the element with the type as your model , here my model was Organization so i passed organization
  private selectedOrganization(element: Organization) {
    // this method will close the dialog and put the selected value as the input value
    // name this method whatever you want , this method must be called as an onClick event in the container method
    this.dialogRef.close(element)
  }

  onPagination(pagination: Pagination) {
    this.paging = pagination;
    this.load();
  }
```

5. declare a vaiable with your component in customInput.model.ts like below:

```typescript
  static org : CustomInputConfig = {name : "org" , component : OrganizationSearchComponent}
```

6. declare your input in the form control like this :

```typescript
{ name: 'organizationName', inputType: WidgetTypeModel.custom,  dialogCom : CustomInputModel.org  ,dialogSize : DialogSizeEnum.xxl , dialogTopic : "organizationName", placeholder: 'یگان' , cols: 4 , rows: 1 ,validators: [Validators.required]}
// here we have 3 main properties
// dialogCom : here specify the component that you made in the prior steps
// dialogSize : declare a size for the dialog , the sizes are base on DialogSizeEnum
// dialogTopic : declare this as the name of the column you want as the value for the input
```

## event types

### on-change-value

- `create form control with onChangeValue event`

```typescript
  formControl : [
                  {
                    name: 'personnelId', inputType: WidgetTypeModel.personnel      ,
                    validators: [Validators.required], placeholder: 'پرسنل'        ,
                    cols: 4,                                         rows: 1       ,
                    selectedTitle:'fullName'                                       ,
                    onChangeValue:(result: Personnel)=> { this.fillUserInfo(result)
                  }
                ]
```

```ts
  fillUserInfo(personnel: Personnel) {
    if (personnel != undefined) {
      this.loadPersonnelOfficeRelatedSazman(personnel);
    }
  }
```

### disable

- `disable input`

```typescript
formControl: [
  {
    name: 'password',
    inputType: WidgetTypeModel.string,
    validators: [Validators.required],
    placeholder: 'عنوان',
    cols: 4,
    rows: 1,
    onDisabled: () => true,
  },
];
```

### hide

- `hide form control conditionally`

```typescript
formControl: [
  {
    name: 'password',
    inputType: WidgetTypeModel.password,
    validators: [Validators.required],
    placeholder: 'رمز عبور',
    cols: 4,
    rows: 1,
    hide: (element: AppFormGroup<UserModel>) => {
      element.getColumnValue('id') > 0;
    },
  },
];
```

### input-validators
inputValidators are extend validators angular. A validators is a function that processes a FormControl or collection of controls and returns an error map or null.

#### national-code
```ts
    { name: 'nationalNumber', inputType: WidgetTypeModel.number, placeholder: 'nationalCode', validators: [InputValidators.required,InputValidators.nationalCode()], cols: 4, rows: 1, },
```

# divider

## use in Container

```ts
  getDividerContainer(): AppContainerModel {
    return {
      widgetType: WidgetTypeModel.divider,
      cols: 12, rows: 1,
      config:{title:'test'}
    }
  }
```

## use in form control

```ts
{ name: 'divider', inputType:
 WidgetTypeModel.divider,   title:'اطلاعات هویتی' },
```

# Table

### with paginator

- `create table with pagination`

```typescript

 tableDataSource = new AppTableDatasource<User>();
 pagination = new Pagination('e.id');

 getTableContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.table,
      cols: 12,                 rows: 1,
      config: {
        tableType : TableType.normal,
        tableName : 'کاربران',
        dataSource: this.tableDataSource,
        onPagination: (pagination: Pagination) => {
          this.onPagination(pagination);
        },
        columns: [
           { displayHeader: 'عکس'           , displayColumn: 'fileCode', type: CellType.image,
            image: {alt: 'کاربر'            , src: (element: UserModel) =>  (element.fileCode!='-1'&&element.fileCode?.length)?'/api/attachment/front/getFile/' + element.fileCode:this.imageSrc}           },
           { displayHeader: 'نام'           , displayColumn: 'firstName'                                                                                                                                    },
           { displayHeader: 'نام خانوادگی'  , displayColumn: 'lastName'                                                                                                                                     },
           { displayHeader: 'نام کاربری'    , displayColumn: 'username'                                                                                                                                     },
           { displayHeader: 'عملیات'        , displayColumn: 'action'    , type: CellType.action,
             actions: [
               { type: ActionType.dropDownButton, title: 'ویرایش'                , icon: IconEnum.edit        , onClick: (element: UserModel) => this.goToEditContainer(element)},
               { type: ActionType.dropDownButton, title: 'حذف'                   , icon: IconEnum.delete      , onClick: (element: UserModel) => this.delete(element)           },
             ]
          }
        ]
      }
    }
    // @formatter:on
  }

 private onPagination(pagination: Pagination) {
   this.pagination = pagination;
   this.load(pagination)
 }

 load() {
   loadWithPagination(this.entitySearch, this.userService, this.pagination, null, (res: QueryResult<User>) => this.afterLoad(res))
 }

 afterLoad(res: QueryResult<User>) {
   if (res) {
     this.tableDataSource.data = res.entityList!
     this.tableDataSource.totalCount = res.totalRecords;
   }
 }
```

### without paginator

- `create table without pagination`

```typescript

 tableDataSource = new AppTableDatasource<User>();

 getTableContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.table,
      cols: 12,                 rows: 1,
      config: {
        tableType : TableType.normal,
        tableName : 'کاربران',
        dataSource: this.tableDataSource,
        columns: [
           { displayHeader: 'عکس'           , displayColumn: 'fileCode', type: CellType.image,
            image: {alt: 'کاربر'            , src: (element: UserModel) =>  (element.fileCode!='-1'&&element.fileCode?.length)?'/api/attachment/front/getFile/' + element.fileCode:this.imageSrc}           },
           { displayHeader: 'نام'           , displayColumn: 'firstName'                                                                                                                                    },
           { displayHeader: 'نام خانوادگی'  , displayColumn: 'lastName'                                                                                                                                     },
           { displayHeader: 'نام کاربری'    , displayColumn: 'username'                                                                                                                                     },
           { displayHeader: 'عملیات'        , displayColumn: 'action'    , type: CellType.action,
             actions: [
               { type: ActionType.dropDownButton, title: 'ویرایش'                , icon: IconEnum.edit        , onClick: (element: UserModel) => this.goToEditContainer(element)},
               { type: ActionType.dropDownButton, title: 'حذف'                   , icon: IconEnum.delete      , onClick: (element: UserModel) => this.delete(element)           },
             ]
          }
        ]
      }
    }
    // @formatter:on
  }

 load() {
   load(this.entitySearch, this.userService, null, (res: User[]) => this.afterLoad(res))
 }

 afterLoad(res: User[]) {
   if (res) {
     this.tableDataSource.data = res
   }
 }
```

### with lazy sort

- `create table with lazy sort`

```typescript

 tableDataSource = new AppTableDatasource<User>();
 pagination = new Pagination('e.id');

 getTableContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.table,
      cols: 12,                 rows: 1,
      config: {
        tableType : TableType.normal,
        tableName : 'کاربران',
        withLazySort: true
        dataSource: this.tableDataSource,
        onPagination: (pagination: Pagination) => {
          this.onPagination(pagination);
        },
        columns: [
           { displayHeader: 'نام'           , displayColumn: 'firstName'              }, // defualt lazy sort base on displayColumn
           { displayHeader: 'نام خانوادگی'  , displayColumn: 'lastName'  , onLazySort: name},
           { displayHeader: 'نام کاربری'    , displayColumn: 'username'  , onLazySort: user},
        ]
      }
    }
    // @formatter:on
  }

 private onPagination(pagination: Pagination) {
   this.pagination = pagination;
   this.load(pagination)
 }

 load() {
   loadWithPagination(this.entitySearch, this.userService, this.pagination, null, (res: QueryResult<User>) => this.afterLoad(res))
 }

 afterLoad(res: QueryResult<User>) {
   if (res) {
     this.tableDataSource.data = res.entityList!
     this.tableDataSource.totalCount = res.totalRecords;
   }
 }
```

- `create table without pagination`

```typescript

 tableDataSource = new AppTableDatasource<User>();
 pagination = new Pagination('e.id');

 getTableContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.table,
      cols: 12,                 rows: 1,
      config: {
        tableType : TableType.normal,
        tableName : 'کاربران',
        dataSource: this.tableDataSource,
        columns: [
           { displayHeader: 'عکس'           , displayColumn: 'fileCode', type: CellType.image,
            image: {alt: 'کاربر'            , src: (element: UserModel) =>  (element.fileCode!='-1'&&element.fileCode?.length)?'/api/attachment/front/getFile/' + element.fileCode:this.imageSrc}           },
           { displayHeader: 'نام'           , displayColumn: 'firstName'                                                                                                                                    },
           { displayHeader: 'نام خانوادگی'  , displayColumn: 'lastName'                                                                                                                                     },
           { displayHeader: 'نام کاربری'    , displayColumn: 'username'                                                                                                                                     },
           { displayHeader: 'عملیات'        , displayColumn: 'action'    , type: CellType.action,
             actions: [
               { type: ActionType.dropDownButton, title: 'ویرایش'                , icon: IconEnum.edit        , onClick: (element: UserModel) => this.goToEditContainer(element)},
               { type: ActionType.dropDownButton, title: 'حذف'                   , icon: IconEnum.delete      , onClick: (element: UserModel) => this.delete(element)           },
             ]
          }
        ]
      }
    }
    // @formatter:on
  }

 load() {
   load(this.entitySearch, this.userService, null, (res: User[]) => this.afterLoad(res))
 }

 afterLoad(res: User[]) {
   if (res) {
     this.tableDataSource.data = res
   }
 }
```

## column types

### simple

```typescript
columns: [{ displayHeader: 'نام', displayColumn: 'firstName' }];
```

### Calculate

```typescript
columns: [
            {
             displayHeader: 'عکس', displayColumn: 'fileCode', type: CellType.calculate,
             calcDisplayColumn:(row: T extends BaseEntity like user.model.ts)=> this.calColumnName(row);
            }
         ]
```

```ts
calColumnName(row: User): string {
  return row.firstName + " " + row.lastName
}
```

### Image

```typescript
 // global variable -->  imageSrc = 'assets/media/avatars/blank.png';
 columns: [
              {
                displayHeader: 'عکس', displayColumn: 'fileCode', type: CellType.image,
                 image: {
                   alt: 'کاربر',
                   src: (element: UserModel) => (element.fileCode!='-1'&&element.fileCode?.length)?'/api/attachment/front/getFile/' + element.fileCode:this.imageSrc;
                 }
              }
          ]
```

### InnerHtml

```typescript
columns: [
            {
             displayHeader: 'عکس', displayColumn: 'fileCode', type: CellType.innerHtml,
             calcDisplayColumn:(row: T extends BaseEntity like user.model.ts)=> this.calColumnName(row);
            }
         ]

```

```ts
calColumnName(row: User) {
  return {
    <html>
      <body>
        <h2 title="I'm a header">The title Attribute</h2>
        <p title="I'm a tooltip">Mouse over this paragraph, to display the title attribute as a tooltip.</p>
      </body>
    </html>
  }
}
```

### progress-bar
```typescript
 columns: [
              {
                displayHeader: 'درصد پیشرفت', displayColumn: 'progressBar', type: CellType.progressBar, displayColumnCSS:CssEnum.PROGRESS_SUCCESS
              }
          ]
```


### Icon

```typescript
columns: [
  {
    displayHeader: 'وضعیت ',
    displayColumn: 'enabled',
    type: CellType.icon,
    icon: (element: UserModel) =>
      element.enabled ? IconEnum.check : IconEnum.xMark,
  },
];
```

### Nested

```typescript
columns: [
           {
             displayHeader: 'وضعیت ', displayColumn: 'enabled', type: CellType.nested,
             nestedColumn : {nestedColumn:'userRoles', align:'vertical' },
             displayColumnCSS: CssEnum.BADGE_SUCCESS}
           }
         ]

columns: [
           {
             displayHeader: 'وضعیت ', displayColumn: 'enabled', type: CellType.nested,
             nestedColumn : {nestedColumn:'userRoles', align:'horizontal' },
             displayColumnCSS: CssEnum.BADGE_PRIMARY}
           }
         ]
```

### column with custom css

```typescript

columns: [{
  { displayHeader: 'نقش ها' , displayColumn: 'roleTitle' , displayColumnCSS: CssEnum.BADGE_PRIMARY}
]

```

- `with calculated css`

```typescript
import {UserModel} from "./user.model";

columns: [
  {displayHeader: 'نقش ها', displayColumn: 'roleTitle', displayColumnCSS: (element: UserModel) => this.calculateCss(element)}
]

calculateCss(element:UserModel){
    if (element.status === 1) {
        return CssEnum.BADGE_PRIMARY
    } else {
        return CssEnum.BADGE_WARNING
    }
}

```

### Action

#### Inline Button

```typescript
columns: [
    actions: [
               { type: ActionType.inlineTableButton, title: 'ویرایش'                , icon: IconEnum.edit        , onClick: (element: UserModel) => this.goToEditContainer(element) },
               { type: ActionType.inlineTableButton, title: 'حذف'                   , icon: IconEnum.delete      , onClick: (element: UserModel) => this.delete(element)            },
               { type: ActionType.inlineTableButton, title: 'تغییر رمز عبور'        , icon: IconEnum.lock        , onClick: (element: UserModel) => this.openResetPassword(element) }
             ]
         ]
```

#### Dropdown Button

```typescript
columns: [
    actions: [
               { type: ActionType.dropDownButton, title: 'ویرایش'                , icon: IconEnum.edit        , onClick: (element: UserModel) => this.goToEditContainer(element) },
               { type: ActionType.dropDownButton, title: 'حذف'                   , icon: IconEnum.delete      , onClick: (element: UserModel) => this.delete(element)            },
               { type: ActionType.dropDownButton, title: 'تغییر رمز عبور'        , icon: IconEnum.lock        , onClick: (element: UserModel) => this.openResetPassword(element) }
             ]
         ]
```

### Inline Button And Drop down Button

```typescript
columns: [
    actions: [
               { type: ActionType.inlineTableButton, title: 'ویرایش'                , icon: IconEnum.edit        , onClick: (element: UserModel) => this.goToEditContainer(element) },
               { type: ActionType.dropDownButton   , title: 'حذف'                   , icon: IconEnum.delete      , onClick: (element: UserModel) => this.delete(element)            },
               { type: ActionType.dropDownButton   , title: 'تغییر رمز عبور'        , icon: IconEnum.lock        , onClick: (element: UserModel) => this.openResetPassword(element) }
             ]
         ]
```

### with Authority

```typescript
columns: [
    actions: [
               {
                 type: ActionType.inlineTableButton, title: 'ویرایش',
                 icon: IconEnum.edit,
                 onClick: (element: UserModel) => this.goToEditContainer(element),
                 hasAuthority:()=> RoleMenuEnum.EDIT_ROLE_MENU
                },
             ]
         ]
```

## pipe Column

### without pipe arg

```typescript
columns: [
  {
    displayHeader: 'نام',
    displayColumn: 'firstName',
    pipe: 'any pipe that angular support it supported bytypescript form like Date,',
  },
];
```

### with pipe arg

```typescript
 columns: [
            { displayHeader: 'نام' , displayColumn: 'firstName', pipe: 'any pipe that angular support it supported bytypescript form like Date', pipeArg: 1,2,2 }
          ]
```

## Tree Table

- `Simple sample to create table withtypescript`

```typescript
 getTreeTable() {
    let childNode = new NodeModel();
    childNode.value = {"organizationName": "سازمان میلاد", "groupName": "تشکیلات میلاد"}
    let nodeList: NodeModel[] = []
    const root = new NodeModel();
    root.value = {"title": "نقش میلاد", "organizationName": "سازمان میلاد", "groupName": "تشکیلات میلاد"}
    root.children = [childNode]
    nodeList.push(root)
    this.treeTableDataSource.data = nodeList;

    return {
      widgetType: WidgetTypeModel.treeTable,
      cols: 12, rows: 1,
      config: {
        datasource: this.treeTableDataSource,
        tablesConfig: [
          {
            tableType: TableType.normal,
            tableName: 'نقش های سامانه',
            columns: [
              {displayHeader: 'عنوان ', displayColumn: 'title'},
              {displayHeader: 'سازمان', displayColumn: 'organizationName'},
              {displayHeader: 'تشکیلات', displayColumn: 'groupName', displayColumnCSS: CssEnum.BADGE_PRIMARY},
            ]
          },
          {
            tableType: TableType.normal,
            tableName: 'نقش های سامانه1',
            columns: [
              {displayHeader: 'نام ', displayColumn: 'organizationName'},
              {displayHeader: 'یه اسم دیگه', displayColumn: 'groupName', displayColumnCSS: CssEnum.BADGE_PRIMARY},
            ]
          }
        ]
      }
    }
  }
```

## Tab

- `create tab`

```typescript
getTabContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.tab,
      cols: 12,               rows: 5,
      config: [
        {
          tabID: "baseInformation-main", title: "اطلاعات اصلی",
          hide: () => false,
          container: [this.getMainBaseInformationFormContainer()]
        },
        {
          tabID: "baseInformation-specification", title: "مشخصات",
          defaultSelect: true
          hide: () => this.conditionHideTab(),
          container: [this.firstContainer(), this.secContainer()]
        }
      ]
    }
    // @formatter:on
  }
```

- `create tab with selected by defualt`

```typescript
getTabContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.tab,
      cols: 12,               rows: 5,
      config: [
        {
          tabID: "baseInformation-main", title: "اطلاعات اصلی",
          container: [this.getMainBaseInformationFormContainer()]
        },
        {
          tabID: "baseInformation-specification", title: "مشخصات",
          defaultSelect: true
          container: [this.firstContainer(), this.secContainer()]
        }
      ]
    }
    // @formatter:on
  }
```

- `do after click on tab`

```typescript
getTabContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.tab,
      cols: 12,               rows: 5,
      config: [
        {
          tabID: "baseInformation-main", title: "اطلاعات اصلی",
          hide: () => false,
          container: [this.getMainBaseInformationFormContainer()]
        },
        {
          tabID: "baseInformation-specification", title: "مشخصات",
          defaultSelect: true
          onSelectTab: () => this.loadTable(),
          container: [this.firstContainer(), this.secContainer()]
        }
      ]
    }
    // @formatter:on
  }
```

- `hide tab conditionally`

```typescript
getTabContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.tab,
      cols: 12,               rows: 5,
      config: [
        {
          tabID: "baseInformation-main", title: "اطلاعات اصلی",
          container: [this.getMainBaseInformationFormContainer()]
        },
        {
          tabID: "baseInformation-specification", title: "مشخصات",
          hide: () => this.conditionHideTab(),
          container: [this.firstContainer(), this.secContainer()]
        }
      ]
    }
    // @formatter:on
  }
```

- `tab refrence to another typescript file`

```typescript

getTabContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.tab,
      cols: 12,                   rows: 5,
      config: [
        {
          tabID: "baseInformation-main", title: "اطلاعات اصلی",
          hide: () => false,
          container: [this.getMainBaseInformationFormContainer()]
        },
        {
          tabID: "baseInformation-attribute", title: "مشخصات",
          hide: () => false,
          container: [
            this.baseInformationAttributeFormComponent.getFormContainer(),
            this.baseInformationAttributeFormComponent.getTableContainer()
          ]
        },
      ]
    }
    // @formatter:on
  }
```

## Crud template

in order to have a parent container for all of your other containers declare a widgetType property and set it as WidgetTypeModel.crudTemplate like instructed below

```typescript

  initContainerList(): void {
    // @formatter:off
    this.containerList = [
      {
        // IMPORTANT! section
        widgetType: WidgetTypeModel.crudTemplate,
        config: {
          pageTitle: 'خطاهای سامانه',
          actions: [
              // crud menu buttons
            { title: 'جدید'        , onClick: () => this.changeView()       , color: 'primary'                 },
            { title: 'به روز رسانی', onClick: () => this.load()             , color: 'warn'                    },
            { title: 'جستجو'       , onClick: null                          , color: 'accent' , id: 'searchBox'},
          ],
          container: [container 1, container 2 , ...],
          searchBoxContainer: [container 23 , container 4 ,...]
        }
      }
    ];
    // @formatter:on
  }

```
## crud template Toggle base
از این ویجت در مواقعی استفاده میشود که بخواهیم دو کراد تمپلیت را در یک صفحه داشته باشیم و بینشان سوییچ کنیم.
به عنوان مثال یک گرید از لیست دیتا را در حالت اولیه نشان میدهیم و یک فرم برای ساخت یک ردیف جدید را با سوییچ کردن نشان میدهیم

```
this.containerList = [
      {
        widgetType: WidgetTypeModel.crudTemplateToggleBase,
        config:{
          containerEdit:[ 
            {
              widgetType: WidgetTypeModel.crudTemplate,
              config: {
                pageTitle: 'فرم ثبت جدید',
                actions: [
                  {title: 'بازگشت', onClick: () => this.changeView(), color: 'primary'}
                ],
                container: [this.getFormContainer()],
                searchBoxContainer: []
              }
            }
          ],
          containerGrid:[
            {
              widgetType: WidgetTypeModel.crudTemplate,
              config: {
                pageTitle: 'لیست ثبت شده ها',
                actions: [
                  {title: 'جدید', onClick: () => this.changeView(), color: 'primary'},
                  {title: 'به روز رسانی', onClick: () => this.load(), color: 'warn'},
                  {title: 'جستجو', onClick: null, color: 'accent', id: 'searchBox'},
                ],
                container: [this.getTableContainer()],
                searchBoxContainer: [this.getSearchBoxContainer()]
              }
            }
          ],
          showList:()=> this.showList
        },
      }
    ]; 
    
    
```
## Tree

### single mode

- `use from tree in BaseInformationTreeComponent`

- define treeDataSource:

```typescript
export class BaseInformationTreeComponent
  extends BaseComponent<BaseInformation>
  implements OnInit
{
  treeDataSource = new AppTreeDatasource();
}
```

- initial root node :

```typescript

    // BaseInformationTreeComponent
    onSelectionChange(event?: any) {
        const treeNode = new AppTreeNodeModel();
        treeNode.key = event.value
        treeNode.label = event.source.triggerValue
        treeNode.nodeType = 'header'
        this.currentNode = treeNode;
        this.treeDataSource.data = [treeNode]
    }

    or

    // TreeOrganizationComponent
    loadRootOfGroupTree() {
      this.groupService.findByParent(null).subscribe(res => {
        res.forEach(item => {
          if (item.isEnable == true) {
            const treeNode = new AppTreeNodeModel();
            treeNode.key = res[0].id!
            treeNode.label = res[0].name!
            treeNode.leaf=false
            this.currentNode = treeNode;
            this.treeDataSource.data = [treeNode]
          }
        })

      });
    }
```

- create tree container of AppContainerModel:

```typescript
getTreeContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.tree,
      cols: 12,                   rows: 1 ,
      config: {
        datasource: this.treeDataSource,
        onClick     : (node: AppTreeNodeModel)                => this.loadNode(node),
        onNodeExpand: (node: AppTreeNodeModel)                => this.nodeExpand(node),
        onRefresh: (nodes: AppTreeNodeModel[])                => this.refreshNodes(nodes),
        showToolbar:true,
        contextMenu: [
          { title: 'درج زیرمجموعه', onClick: (element: AppTreeNodeModel) => this.addBaseInfo(element)   },
          { title: 'ویرایش'       , onClick: (element: AppTreeNodeModel) => this.editBaseInfo(element)  },
          { title: 'حذف'          , onClick: (element: AppTreeNodeModel) => this.delete(element.key) },
        ]
      },
    }
    // @formatter:on
  }

  nodeExpand(event:any, level?:number){
    this.loadNode(event.node)
  }

```

- refresh nodes function

```ts

  refreshNodes(nodes: AppTreeNodeModel[]){
    if(nodes.length > 0){
      this.refreshNode(nodes[0],0)
    }
  }

  refreshNode(node: AppTreeNodeModel,index:number){
    this.baseInformationService.find(node.key).subscribe(i => {
      node.label = i.topic!
      this.treeDataSource.refreshTree();
    });
    if(node.children && node.children.length>0){
      node.children?.forEach((item,index)=>{
        this.refreshNode(item,index)
      })
    }
  }

```

- create loadNode method for onClick or onNodeExpand:

```typescript
loadNode(node: AppTreeNodeModel) {
    if (node.key) {
      this.baseInformationService.findByHeaderAndParent(node.key, null).subscribe(items => {
        let nodeModelList: AppTreeNodeModel[] = [];
        items.forEach(i => {
          const nodeModel = new AppTreeNodeModel();
          nodeModel.key = i.id!
          nodeModel.label = i.topic!
          nodeModel.leaf=false
          nodeModelList.push(nodeModel)
        });
        node.children = nodeModelList;
        this.treeDataSource.refreshTree();
      });
    }
  }
```

### multi mode

- `use from tree in ConfirmationSettingsComponent`
- درختواره تشکیلات

```typescript
  getTreeContainer():AppContainerModel
{
  return {
    widgetType: WidgetTypeModel.tree,
    cols: 4, rows: 1,
    config: {
      showToolbar:true,
      selectionMode: 'checkbox',
      datasource: this.treeDataSource,
      onClick: (node: AppTreeNodeModel) => this.loadConfirms(node)
    }
  }
}
```

- فرم ثبت و ویرایش تنظیمات ارجاعات و تاییدات( لود درختواره براساس نوع فرآیند)

```typescript

  getFormContainer() {
    // @formatter:off
    return {
      widgetType : WidgetTypeModel.form,
      cols       : 12,             rows : 1,
      config     : {
        formGroup   : this.editFormGroup,
        formControl :  [
          { name: 'id'                        , inputType: WidgetTypeModel.hidden                                                                                           },
          { name: 'processType'               , inputType: WidgetTypeModel.enum        , validators: [Validators.required] , placeholder: 'نوع فرآیند'   , cols: 6 , rows: 1
            , enumXPath:ENUM_PATH_PROCESS_TYPE, onChangeValue: (event: any) => this.onSelectionChangeProcessType(event)                                                      },
          { name: 'organizationTypeId'        , inputType: WidgetTypeModel.baseInfo    , validators: [Validators.required] , placeholder: 'سطح ساختار'   , cols: 6 , rows: 1
            ,headerId: () => {return BaseInfoEnum.ORGANIZATION_TYPE_ID}, onChangeValue: (event: any) => this.onSelectionChangeBaseInfo(event)                                },
          { name: 'organizationTypeTopic'     , inputType: WidgetTypeModel.hidden                                                                                            },
          { name: 'starterGroupId'            , inputType: WidgetTypeModel.group                                           , placeholder: 'تشکیلات'       , cols: 6 , rows: 2 },
          { name: 'starterGroupName'          , inputType: WidgetTypeModel.hidden                                                                                            },
        ],
        actions : [
          { title: 'ثبت'     , color: 'primary', onClick: () => this.saveSelected(),
            disabled: (form: AppFormGroup<ConfirmationSettings>) => {return form.invalid} },
        ]
      }
    }
    // @formatter:on
  }
```

1- نمایش درختواره تشکیلات براساس نوع فرآیند انتخابی

```typescript

  onSelectionChangeProcessType(event?: any) {
    this.findConfirmationSettings.collectionMethod = null;
    this.findConfirmationSettings.processType = event.index
    if (this.findConfirmationSettings.processType && this.findConfirmationSettings.organizationTypeId) {
      this.loadTree(this.findConfirmationSettings);
    }
```

2- نمایش درختواره و نودهای تیک خورده براساس نودها یا تشکیلات های ذخیره شده از دیتابیس بعد از انتخاب نوع فرآیند

```typescript loadTree
  loadTree(findConfirmationSetting: ConfirmationSettings) {
    this.confirmationSettingsService.loadTree(findConfirmationSetting).subscribe(res => {
      const treeNode = new AppTreeNodeModel();
      treeNode.key = parseInt(String(res.id), 10)
      treeNode.label = res.label
      treeNode.children = this.loadChildren(res.children);
      this.treeDataSource.data = [treeNode]
      this.loadSelectionNode(findConfirmationSetting);
    });
  }
```

3- بارگزاری نودهای فرزند در درختواره

```typescript

  loadChildren(children: any): AppTreeNodeModel[] {
    if (children.length != 0) {
      let nodeModelList: AppTreeNodeModel[] = [];
      children.forEach((item: any) => {
        const nodeModel = new AppTreeNodeModel();
        nodeModel.key = parseInt(String(item.id), 10)!
        nodeModel.label = item.label!
        nodeModel.children = this.loadChildren(item.children);
        nodeModelList.push(nodeModel)
      })
      return nodeModelList;
    } else {
      return [];
    }
  }
```

4- نمایش تشکیلات تیک خورده در درختواره:در صورتی که تشکیلاتی از قبل تیک خورده باشد ،سطوح تائیدات آن و آن تشکیلات در گرید
سلسله مراتب سازمانی قابل نمایش می باشد

```typescript loadSelectionNode()

  loadSelectionNode(findConfirmationSetting: ConfirmationSettings) {
    this.nodeSelected = [];
    this.confirmationSettingsService.getSelected(findConfirmationSetting).subscribe(items => {
      this.confirmationSettingsNodeSelected = items;
      items.forEach(item => {
        let node = new AppTreeNodeModel();
        node.key = item.groupId!
        node.label = item.groupName!
        node.children = [];
        this.nodeSelected.push(node)
      });
      if (items)
        this.tableDataSource.data = items;
      this.treeDataSource.selectionNode = this.nodeSelected;
      this.cdr.detectChanges();
    });
  }
```

5- ذخیره گروهی تشکیلات انتخابی و تائیدات آنها

```ts saveSelected()

  saveSelected() {
    if (this.popConfirmationWithOutOrderNumber()) {
      this.confirmationSettingsService.updateList(this.confirmationSettingsNodeSelected).subscribe(() => {
        this.notifySuccess(TXT_SAVE_SUCCESS);
      })
    }
  }
```

6- نمایش همه سطوح تاییدات به ترتیب تایید در گرید سلسله مراتب سازمانی براساس نود های انتخابی از درختواره تشکیلات

```ts

loadConfirms(node : AppTreeNodeModel){
  let checked: boolean = true;
  let counter: number = 0;
  let orderNumber: number = 0;
  if (node) {
    this.confirmationSettingsNodeSelected.sort((a, b) => a.orderNumber! - b.orderNumber!).forEach((confirmationSettings, index) => {
      counter++;
      if (counter != confirmationSettings.orderNumber! && orderNumber == 0)
        orderNumber = counter;
      if (confirmationSettings.groupId == node.key) {
        checked = false
        this.confirmationSettingsNodeSelected.splice(index, 1);
      }
    })
    if (checked)
      this.confirmationSettingsNodeSelected.push(this.fullConfirmationSettings(node, counter, orderNumber))
    this.tableDataSource.data = this.confirmationSettingsNodeSelected.sort((a, b) => a.orderNumber! - b.orderNumber!);
  }
}
```

7- نمایش تشکیلات انتخابی در گرید سطح تاییدات براساس نود انتخاب شده

```ts fullConfirmationSettings()

  fullConfirmationSettings(node: AppTreeNodeModel, counter: number, orderNumber: number): ConfirmationSettings {
    let confirmationSettings = new ConfirmationSettings();
    confirmationSettings.id = -1;
    confirmationSettings.groupId = node.key;
    confirmationSettings.groupName = node.label;
    confirmationSettings.processType = this.findConfirmationSettings.processType;
    confirmationSettings.organizationTypeId = this.findConfirmationSettings.organizationTypeId;
    confirmationSettings.starterGroupId = this.findConfirmationSettings.starterGroupId;
    confirmationSettings.collectionMethod = this.findConfirmationSettings.collectionMethod;
    confirmationSettings.orderNumber = orderNumber != 0 ? orderNumber : counter + 1;
    return confirmationSettings
  }
```

## Attachment

- `use attachment`

for use attachment create method of AppContainerModel

```ts
  getAttachment() : AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.attachment,
      cols: 12,                   rows: 2,
      config: {
        objectId:  this.objectID,
        baseInfoHeader: BaseInfoEnum.FILE_TYPE_ID,
        classificationObject:  this.classificationObjectName ,
      },
    }
    // @formatter:on
  }
```

- define widgetType of WidgetTypeModel.attachment
- define config and add objectId, baseInfoHeader, classificationObject
- objectId is your id model for save attachemnt's
- baseInfoHeader is a file type of baseInfo, for define baseInfoHeader must add baseInfo number in BaseInfoEnum

```ts
export enum BaseInfoEnum {
  FILE_TYPE_ID = 68,
}
```

- classificationObject is a type of object in attachment , for define classificationObject

```ts
export class RequestForensicOperationsComponent extends BaseComponent<RequestForensicOperations> {

  classificationObjectName = 'FORENSIC_RELATED_ITEMS';
```

## Base Info Property

- `create dynamic form`

```typescript
  formControlDataSource = new AppFormControlDatasource<Role>();

ngOnInit() {
  super.ngOnInit();
  this.editFormGroup.createFormGroupByDataSource(this.formControlDataSource)
  this.load()
}

initContainerEdit(): void {
  this.containerEdit = [
    {
      widgetType: WidgetTypeModel.crudTemplate,
      config: {
        pageTitle: {new:'ایجاد شعار سال', edit:'ویرایش شعار سال'},
        actions: [{
          title: 'بازگشت', onClick: () => {
            this.changeView();
            this.load();
          }
        }],
        container: [this.getFormContainer(),this.baseInfoProperty()]
      }
    }
  ];
}

getFormContainer() {
  // @formatter:off
  this.formControlDataSource.data = [
    {name: 'id'               , inputType: WidgetTypeModel.hidden                                                                                     } ,
    {name: 'title'            , inputType: WidgetTypeModel.string       , placeholder: 'عنوان'   , validators: [Validators.required], cols: 4, rows: 1} ,
    {name: 'organizationId'   , inputType: WidgetTypeModel.organization , placeholder: 'سازمان'  , validators: [Validators.required], cols: 4, rows: 1  , selectedTitle: 'organizationName'} ,
    {name: 'organizationName' , inputType: WidgetTypeModel.hidden                                                                                     } ,
    {name: 'groupId'          , inputType: WidgetTypeModel.group        , placeholder: 'تشکیلات'  , validators: [Validators.required], cols: 4, rows: 2  , selectedTitle: 'groupName'} ,
    {name: 'groupName'        , inputType: WidgetTypeModel.hidden                                                                                     } ,
    {name: 'enable'           , inputType: WidgetTypeModel.switch       , placeholder: 'وضعیت'   , validators: [Validators.required], cols: 2, rows: 1} ,
    {name: 'unique'           , inputType: WidgetTypeModel.switch       , placeholder: 'یکتا'    , validators: [Validators.required], cols: 2, rows: 1} ,
  ]
  return {
    widgetType : WidgetTypeModel.form,
    config : {
      isDynamicControl  : true,
      formGroup         : this.editFormGroup,
      dynamicFormControl: this.formControlDataSource,
      actions : [
        {
          title: 'ثبت'     , color: 'primary',
          onClick: () => persist(this.editFormGroup.getFormValue(), this.roleService, null, (res: any)=> this.afterRolePersist(res)),
          disabled: (form: AppFormGroup<Role>) => {return form.invalid},
        },
        {
          title: 'پاک کردن', color: 'warn',
          onClick: () => this.resetFormGroup()
        }
      ]
    }
  }
  // @formatter:on
}

private baseInfoProperty() {
  return {
    // @formatter:off
    widgetType: WidgetTypeModel.baseInfoProperty,
    cols: 8,                             rows: 2,
    config: {
      tableType: TableIndexEnum.REQUEST_FORENSIC_OPERATIONS,
      headerId          : () => {return BaseInfoEnum.FORENSIC_BASE_INFO},
      entityId          : () => {return this.editFormGroup.getColumnValue('id')},
      dynamicFormControl: this.formControlDataSource,
      formGroup         : this.editFormGroup
    }
    // @formatter:on
  }
}

goToEditContainer(element: Role) {
  this.editFormGroup.patchValue(element);
}
```

add this component to html file

```html
<app-json-form
        *ngIf="!showList"
        [containerList]="containerEdit"
></app-json-form>
```

## Dialog

- `create dialog`

```ts
  constructor(
        private dialogService: AppDialogService,
) {}

ngOnInit() {
  this.openRelatedPersonnel(element)
}

private openRelatedPersonnel(element: Role) {
  const dialogConfig: AppDialogModel = {
    size: DialogSizeEnum.lg,
    dialogData: element,
  }
  this.dialogService.openDialog(UserSearchComponent, dialogConfig)
}
```

create UserSearchComponent and extend from BaseDialogComponentModel

```ts
@Component({
  selector: 'app-dialog-search-user',
  template: ` <app-json-form
    [containerList]="dialogCrudContainer"
  ></app-json-form>`,
})
export class UserSearchComponent
        extends BaseDialogComponentModel<UserModel>
        implements AfterViewInit
{
  constructor(private injector: Injector, private userService: UserService) {
    super(injector, userService);
    this.dialogCrudContainer = [
      {
        widgetType: WidgetTypeModel.dialogTemplate,
        config: {
          pageTitle: 'کاربران',
          container: [this.getSearchFormContainer(), this.getTableContainer()],
        },
      },
    ];
  }

  ngAfterViewInit(): void {
    console.log(this.dialogConfig.dialogData.element.id);
  }
}
```

### onClosed dialog

#### default button on dialog is cross for close dialog ----> this button call dialog onClose function

```ts
  constructor(
        private dialogService: AppDialogService,
) {}

ngOnInit() {
  this.openRelatedPersonnel(element)
}

private openRelatedPersonnel(element: Role) {
  const dialogConfig: AppDialogModel = {
    size: DialogSizeEnum.lg,
    dialogData: element,
    onClose: (row) => this.logReturnValueFromDialog(row)
  }
  this.dialogService.openDialog(UserSearchComponent, dialogConfig)
}

logReturnValueFromDialog(element: Role) {
  console.log(element);
}
```

create UserSearchComponent and extend from BaseDialogComponentModel

```ts
@Component({
  selector: 'app-dialog-search-user',
  template: ` <app-json-form
    [containerList]="dialogCrudContainer"
  ></app-json-form>`,
})
export class UserSearchComponent
        extends BaseDialogComponentModel<UserModel>
        implements AfterViewInit
{
  constructor(
          private injector: Injector,
          private userService: UserService,
          public dialogRef: MatDialogRef<UserSearchComponent>
  ) {
    super(injector, userService);
    this.dialogCrudContainer = [
      {
        widgetType: WidgetTypeModel.dialogTemplate,
        config: {
          pageTitle: 'کاربران',
          container: [this.getSearchFormContainer(), this.getTableContainer()],
        },
      },
    ];
  }

  ngAfterViewInit(): void {
    console.log(this.dialogConfig.dialogData.element.id);
    this.closeDialog(dialogRef, this.dialogConfig.dialogData.element);
  }
}
```

## pdf viewer

first declare an action intended for pdf viewer

```typescript
{
  type: ActionType.dropDownButton, title: 'چاپ کاربرگ خودمعرفی مدیریتی', icon: IconEnum.delete,
          // call openPdfViewer method and pass url and file name to it
          onClick: (element: ProposalResponsibilityModel) =>  this.pdfViewerService.openPdfViewer("api/proposalResponsibility/exportReport/" + element.id,"pdf.کاربرگ خودمعرفی مدیریتی"),
}
```

## create custom input

- `create input`

1- create component on path src/app/core/widget/input

```ts
@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
})
export class InputNumberComponent
        extends AppBaseInputModel<AppInputBaseConfig>
        implements DoCheck, OnInit, OnChanges {}
```

2- add created component into module core

```ts
export const APP_COMPONENT = [
  AppTableWidgetComponent,
  AppTabComponent,
  AppTreeTableWidgetComponent,
  CarouselComponent,
  TextAreaComponent,
  PersonCardComponent,
  History1Component,
  MenuHistoryComponent,
  TasksComponent,
  InputStringComponent,
  InputNumberComponent,
  InputDateComponent,
  InputBaseInformationComponent,
  InputSliderComponent,
  DialogComponent,
  AppDialogOpener,
  AppJsonFormComponent,
  AppLineChartComponent,
  OffCanvasComponent,
  AppDialogComponent,
  InputSwitchComponent,
  AppFormWidgetComponent,
  AppButtonComponent,
  InputCheckboxComponent,
  AppDialogConfirmationComponent,
  ACInputGroupComponent,
  InputEnumComponent,
  AppCrudTemplateComponent,
  AppInputPersonnelComponent,
  AppInputUsersComponent,
  AppDialogTemplateComponent,
  AppInputRoleComponent,
  InputTextAreaComponent,
  FileUploaderComponent,
  InputPasswordComponent,
  ACInputOrganizationComponent,
  AppTreeComponent,
  AttachmentComponent,
  BaseInfoPropertyWidgetComponent,
];
```

3- add constructor

```ts
 constructor(
        @Self() @Optional() public control: NgControl,  // to get value from formControl
        private differs: KeyValueDiffers,               // this object hold changes of this obejct
        private formBuilder: FormBuilder) {             // for create formControl
  super();
  this.differ = this.differs.find({}).create();
  this.control.valueAccessor = this;              // assign formControl to current valueAccessor
}
```

4- add this function to handle read only disable and required

```ts
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
this.disabledInput(changes);

if (changes.readonly) {
  this.isInputReadOnly();
}
if (changes.required) {
  this.isInputRequired();
}
}

ngDoCheck(): void {
  const change = this.differ.diff(this);
  if (change) {
    change.forEachChangedItem(item => {
      if (item.key === '_value' && item.currentValue === null) {
        this.inputForm.reset();
      }
    });
  }
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

private initForm() {
  this.inputForm = this.formBuilder.group({
    myInput: ['', Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
  });
}
```

5- define a html file with blow content

```html
<form [formGroup]="inputForm">
  <mat-form-field style="width: 100%">
    <input
            formControlName="myInput"
            type="number"
            [matTooltip]="tooltip"
            [min]="min"
            [max]="max"
            [placeholder]="placeholder"
            [disabled]="isDisable"
            [required]="isRequired || isInputControlRequired"
            [readonly]="isReadOnly"
            [(ngModel)]="value"
            (blur)="onBlur($event)"
            (input)="inputChange()"
            matInput
    />
    <mat-icon
            [ngClass]="suffixIconClicked? 'hover_text': ''"
            matSuffix
            (click)="onSuffixIconClicked()"
    >{{suffixIcon}}
    </mat-icon>
    <mat-error *ngIf="isControlHasError('myInput','bizError')">
      {{this.inputForm.controls.myInput.getError('bizError').message}}
    </mat-error>
    <mat-error *ngIf="isParentControlHasError('required')">
      {{placeholder}} <strong>{{ 'اجباری می باشد' }}</strong>.
    </mat-error>
    <mat-error *ngIf="isControlHasError('myInput','pattern')">
      الگوی ورود اطلاعات برای {{placeholder}} رعایت نشده است.
    </mat-error>
    <mat-error *ngIf="isControlHasError('myInput','min')">
      مقدار ورودی برای {{placeholder}} بایستی بیشتر یا مساوی {{min}} باشد.
    </mat-error>
    <mat-error *ngIf="isControlHasError('myInput','max')">
      مقدار ورودی برای {{placeholder}} بایستی کمتر یا مساوی {{max}} باشد.
    </mat-error>
  </mat-form-field>
</form>
```

6- add component selector into app-form-widget.component.ts

```html
<!--number-->
<ng-container *ngIf="tile.inputType.name === widgetTypeEnum.number.name">
  <div [ngClass]="'col-lg-' + tile.cols +  ' p-2' ">
    <app-input-number
            [placeholder]="tile.placeholder"
            [formControlName]="tile.name"
            [appFormConfig]="data"
            [disabled]="getBooleanCallBackFunction(tile.onDisabled, data.formGroup, false)"
            (blur)="tile.onBlur($event)"
    >
    </app-input-number>
  </div>
</ng-container>
```

7- define input into src/app/core/config/widget-type.model.ts

```ts
export class WidgetTypeModel {
  static number: WidgetTypeConfig = {
    name: 'number              ',
    component: InputNumberComponent,
  };
}
```

- `create input with different title and value`

all descriptions for creating input with different titles and values are the same as simple input, but some methods be
added to assign the selected title of record into the inner input

1- add dialog service into constructor

```ts
 private appDialogService: AppDialogService
```

2- define global variable selectedTitle

```ts
selectedTitle = '';
```

3- add these lines into onChange() method

```ts
let appFormConfig: AppFormConfig = changes.appFormConfig.currentValue;
let control = this.findCurrentFormControl(appFormConfig, this.control);
let object = appFormConfig.formGroup.value;
this.selectedTitle = object[control.selectedTitle!];
```

```ts
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
        this.selectedTitle = object[control.selectedTitle!];
      }
    });
  }
}
```

4- add method onSuffixIconClicked

```ts
onSuffixIconClicked();
{
  const organizationDialogModel: AppDialogModel = {
    title: 'سازمان',
    size: DialogSizeEnum.md,
    onClose: (res: Organization) => {
      if (res) {
        this.value = res.id;
        this.inputForm.patchValue({ myInput: this.value });
        let control = this.findCurrentFormControl(
                this.appFormConfig,
                this.control
        );
        this.selectedTitle = res.name;
        this.appFormConfig.formGroup.patchValue({
          [control.selectedTitle!.toString()]: this.selectedTitle,
        });
        if (control && control.onChangeValue) {
          control.onChangeValue(res);
        }
      }
    },
  };
  this.appDialogService.openDialog<OrganizationSearchComponent, Organization>(
          OrganizationSearchComponent,
          organizationDialogModel
  );
}
```

5- create html file with blow content

```html
<form [formGroup]="inputForm">
  <mat-form-field style="width: 100%">
    <mat-label>{{placeholder}}</mat-label>
    <input
            formControlName="myInput"
            [required]="isRequired || isInputControlRequired"
            [readonly]="true"
            [(ngModel)]="selectedTitle"
            (input)="inputChange()"
            matInput
    />
    <button type="button" mat-icon-button matSuffix>
      <mat-icon
              class="material-icons-outlined "
              style="color:#9f0b0b;"
              matSuffix
              (click)="clearInput()"
      >
        <fa-icon [icon]="iconEnum.eraser"></fa-icon>
      </mat-icon>
    </button>
    <button type="button" mat-icon-button matSuffix>
      <mat-icon
              class="material-icons-outlined "
              matSuffix
              (click)="onSuffixIconClicked()"
      >
        <fa-icon [icon]="iconEnum.search"></fa-icon>
      </mat-icon>
    </button>
    <mat-error *ngIf="isControlHasError('myInput','bizError')">
      {{this.inputForm.controls.myInput.getError('bizError').message}}
    </mat-error>
    <mat-error *ngIf="isParentControlHasError('required')">
      {{placeholder}} <strong>{{ 'اجباری می باشد' }}</strong>.
    </mat-error>
  </mat-form-field>
</form>
```

## create custom widget

- `create widget`

1- create component on path src/app/core/widget

```ts
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-tab-widget',
  template: `
    <ng-container>
      <app-json-form
        *ngIf="data && data.container"
        [containerList]="data.container"
      >
      </app-json-form>
    </ng-container>
  `,
})
export class AppTabComponent implements OnInit {
  @Input() data: AppTabConfig[];
}
```

2- add created component into module core

```ts
export const APP_COMPONENT = [
  AppTableWidgetComponent,
  AppTabComponent,
  AppTreeTableWidgetComponent,
  CarouselComponent,
  TextAreaComponent,
  PersonCardComponent,
  History1Component,
  MenuHistoryComponent,
  TasksComponent,
  InputStringComponent,
  InputNumberComponent,
  InputDateComponent,
  InputBaseInformationComponent,
  InputSliderComponent,
  DialogComponent,
  AppDialogOpener,
  AppJsonFormComponent,
  AppLineChartComponent,
  OffCanvasComponent,
  AppDialogComponent,
  InputSwitchComponent,
  AppFormWidgetComponent,
  AppButtonComponent,
  InputCheckboxComponent,
  AppDialogConfirmationComponent,
  ACInputGroupComponent,
  InputEnumComponent,
  AppCrudTemplateComponent,
  AppInputPersonnelComponent,
  AppInputUsersComponent,
  AppDialogTemplateComponent,
  AppInputRoleComponent,
  InputTextAreaComponent,
  FileUploaderComponent,
  InputPasswordComponent,
  ACInputOrganizationComponent,
  AppTreeComponent,
  AttachmentComponent,
  BaseInfoPropertyWidgetComponent,
];
```

3- define widget config model like blow model

name convention for model name is: App{widgetName}Config

```ts
export class AppTabConfig extends AppBaseJsonFormModel {
  tabID: string;
  title: string;
  disable?: any;
  hide?: any;
  defaultSelect?: boolean;
  container: AppContainerModel[];
  onSelectTab?: (index: number) => void;
}
```

4- define @input for received data

```ts
  @Input() data: AppTabConfig[];
```

5- add widget selector into app-json-form.component.ts

```html
<ng-container *ngIf="widget.widgetType.name === widgetTypeEnum.tab.name">
  <div [ngClass]="'col-lg-' + widget.cols +  ' m-0' ">
    <app-tab-widget [data]="widget.config"></app-tab-widget>
  </div>
</ng-container>
```

6- add widget config model into container model

```ts
export class AppContainerModel extends AppBaseJsonFormModel {
  widgetType: WidgetTypeConfig;
  config: AppCrudConfig | AppTreeConfig | AppTabConfig[] | any;
}
```

7- define input into src/app/core/config/widget-type.model.ts

```ts
export class WidgetTypeModel {
  static number: WidgetTypeConfig = {
    name: 'number              ',
    component: InputNumberComponent,
  };
}
```
