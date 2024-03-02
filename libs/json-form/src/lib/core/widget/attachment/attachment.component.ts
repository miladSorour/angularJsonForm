import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {AttachmentService} from './attachment.service';
import {Attachment} from './attachment.model';
import {Pagination} from "../../model/pagination.model";
import {QueryResult} from "../../model/queryResult.model";
import {AppAttachmentConfig} from "./app-attachment.config";
import {AppContainerModel} from "../../json-form/model/app-container.model";
import {WidgetTypeModel} from "../../config/widget-type.model";
import {AppFormGroup} from "../../model/app-form-group";
import {CellType, TableType} from "../table/cv-table-widget/app-table.config";
import {ActionType} from "../table/cv-table-widget/action-item-config";
import {AppTableDatasource} from "../table/app-table-datasource";
import {LayoutUtilsService} from "../../service/layout-utils.service";
import {ServiceLocator} from "../../service/locator.service";
import {HttpResponse} from "@angular/common/http";
import {AppDialogService} from "../dialog/service/app-dialog.service";
import {saveAs} from "file-saver";
import {notifyError, notifySuccess} from '../../Util/util-layout';
import { DownloadFileService } from '../../service/downloadFile.service';
import { UserModel } from '../../model/user.model';
import { IconEnum } from '../../enum/icon.enum';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent  implements OnInit {

  @Input() data         : AppAttachmentConfig;
  fileCode              = '-1';
  fileName              = '';
  baseInfoHeader        : any;
  objectId              : any;
  classificationObject  : any;
  containerEdit         : AppContainerModel[];
  paginationInfo        : Pagination = new Pagination('e.id');
  tableDataSource       = new AppTableDatasource<any>();
  attachment            : Attachment = new Attachment();
  urlHref               : string;
  fileUploader          : FileUploader = new FileUploader({url: 'api/attachment/save'});
  entitySearch          : Attachment = new Attachment();
  layoutUtilsService    : LayoutUtilsService
  appDialogService      : AppDialogService;
  files                 : File[] = [];
  entityList            : Attachment[] | undefined ;
  defaultImageSrc       = 'assets/media/avatars/blank.png';
  selectedValue         : Attachment;
  attachmentFormGroup   = new AppFormGroup<Attachment>({});

  constructor(private attachmentService          : AttachmentService  ,
              private cdr                        : ChangeDetectorRef  ,
              private downloadFileService        : DownloadFileService,) {

    this.layoutUtilsService           = ServiceLocator.injector.get(LayoutUtilsService);
    this.appDialogService             = ServiceLocator.injector.get(AppDialogService);
    this.fileUploader.onCompleteItem  = (item: any, response: any, status: any, header: any) => {
      const resp                      = JSON.parse(response);
      this.fileCode                   = resp.fileCode;
      this.fileName                   = resp.fileName;
      this.urlHref                    = 'api/attachment/getFile/' + this.fileCode;
    };
    this.reset();
  }

  ngOnInit(): void {
    this.objectId = this.data.objectId
    this.baseInfoHeader = this.data.baseInfoHeader
    this.classificationObject = this.data.classificationObject
    this.loadAll();
    this.initContainerEdit();
  }

  initContainerEdit() {
    this.containerEdit = [
      {
        widgetType: WidgetTypeModel.crudTemplate,
        config: {pageTitle: '', actions: [], container: [this.getFormContainer(), this.getTabContainer()]}
      }
    ];
  }

  getFormContainer() : AppContainerModel {
    // @formatter:off
    return {
      widgetType : WidgetTypeModel.form,
      cols       : 12,             rows : 1,
      config : {
        formGroup   : this.attachmentFormGroup,
        formControl :  [
          { name: 'id'                         , inputType: WidgetTypeModel.hidden                                                    },
          { name: 'fileCode'                   , inputType: WidgetTypeModel.hidden                                                    },
          { name: 'fileName'                   , inputType: WidgetTypeModel.hidden                                                    },
          { name: 'classificationObject'       , inputType: WidgetTypeModel.hidden                                                    },
          { name: 'objectId'                   , inputType: WidgetTypeModel.hidden                                                    },
          {
            name: 'fileTypeId'                 , inputType: WidgetTypeModel.baseInfo , placeholder: 'نوع فایل' , cols: 2, rows: 1      ,
            headerId: () => {return this.baseInfoHeader},
                                                                                                                                      },
          { name: 'description'                , inputType: WidgetTypeModel.textArea , placeholder: 'توضیحات'  , cols: 6, rows: 1     },
        ],
        actions : [
          { title: 'ثبت'     , color: 'primary', onClick: () => this.save(), disabled: (form: AppFormGroup<Attachment>) => {return form.invalid},},
          { title: 'پاک کردن', color: 'warn'   , onClick: () => this.resetFormGroup()                                                               }
        ]
      }
    }
    // @formatter:on
  }

  getTabContainer() : AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.table,
      cols: 12, rows: 1,
      config: {
        tableType: TableType.normal,
        tableName: 'مستندات',
        pagination: this.paginationInfo,
        dataSource: this.tableDataSource,
        onPagination: (pagination: Pagination) => {
          this.onPagination(pagination);
        },
        columns: [
          {
            displayHeader: 'تصویر'      , displayColumn: 'fileCode', type: CellType.image,
            image: {alt: 'کاربر'        , src: (element: UserModel) =>
              {return (element.fileCode!='-1'&&element.fileCode?.length)?'/api/attachment/front/getFile/' + element.fileCode:this.defaultImageSrc;       }}
          },
          { displayHeader: 'نام فایل'  , displayColumn: 'fileName'                                                                                },
          { displayHeader: 'نوع فایل'  , displayColumn: 'fileTypeTopic'                                                                           },
          { displayHeader: 'توضیحات'   , displayColumn: 'description'                                                                             },
          {
            displayHeader: 'عملیات'    , displayColumn: 'action'  , type: CellType.action                                                         ,
            actions: [
              { type: ActionType.dropDownButton, title: 'دانلود', icon: IconEnum.edit  , onClick: (element: Attachment) => this.download(element) },
              { type: ActionType.dropDownButton, title: 'حذف'   , icon: IconEnum.delete, onClick: (element: Attachment) => this.delete(element)   }
            ]
          }
        ]
      }
    }
    // @formatter:on
  }

  reset() {
    this.resetFormGroup();
    this.loadAll();
  }

  onPagination(pagination: Pagination) {
    this.paginationInfo = pagination;
    this.loadAll();
  }

  download(element: Attachment) {
    this.downloadFileService.downloadFile('/api/attachment/front/getFile/' + element.fileCode).subscribe(
      (res: string | Blob) => {
        saveAs(res, this.fileName);
      });
  }

  delete(element: Attachment): any {
    const appDialogConfirmationModel = {
      onClose: (res: boolean) => {
        if (res) {
          this.attachmentService.delete(element.id).subscribe((res: HttpResponse<Attachment>) => {},
            ()=> {},
            () => {
              this.attachmentService.deleteCoreFile(element.fileCode).subscribe(() => {
                notifySuccess('حذف با موفقیت انجام شد')
                this.loadAll()
              });
          });
        }
      }
    }
    this.appDialogService.openDeleteConfirmationDialog(appDialogConfirmationModel)
  };

  loadAll() {
      if (this.objectId && this.classificationObject) {
        this.entitySearch.objectId = this.objectId + '';
        this.entitySearch.classificationObject = this.classificationObject;
        this.attachmentService.getAllGridWithPagination(this.entitySearch, this.paginationInfo).subscribe(
          (res: QueryResult<Attachment>) => {
            if (res) {
              this.entityList            = res.entityList;
              this.tableDataSource.totalCount = res.totalRecords;
            }
            // @ts-ignore
            this.tableDataSource.data = this.entityList
          });
      }
  }

  showAlertNotSelectFileAndReturn() {
    notifyError('فایلی برای بارگذاری انتخاب نشده است');
    return false;
  }

  onSelect(event: any) {
    event.addedFiles.forEach((item: any) => {
      this.files.push(item);
    })
    setTimeout(()=>{
      this.cdr.detectChanges()
    }, 150)

  }

  onRemove(event: any) {
    this.files = this.files.filter(item =>
        item.name !== event.name
    );
  }

  save() {
    if (this.files.length > 0) {
      let count = 0;
      for (const item of this.files) {
        this.attachment = new Attachment();
        this.attachmentService.putInCoreFile(item).toPromise()
            .then((res: any) => {
              return this.addValuesToAttachmentObject(res);
            }, () => {
              return null;
            })
            .then((attachment) => {
              if (!attachment) {
                count = this.showAlertNotUploadAndUpdateCount(item, count);
                return;
              }
              this.patchValue(attachment);
              this.attachmentService.save(this.attachmentFormGroup.getFormValue()).toPromise()
                  .then(() => {
                    return true;
                  })
                  .then(() => {
                    count++;
                    if (count == this.files.length) {
                      notifySuccess('ثبت با موفقیت انجام شد')
                      this.reset();
                    }
                  });
            });
      }
    } else {
      return this.showAlertNotSelectFileAndReturn();
    }
  }

  patchValue(attachment: Attachment | null) {
    this.attachmentFormGroup.patchValue({fileCode: attachment?.fileCode,
      objectId: attachment?.objectId, fileName: attachment?.fileName, classificationObject: attachment?.classificationObject})
  }

  showAlertNotUploadAndUpdateCount(item: File, count: number) {
    notifyError('فایلی ' + item.name + '.بارگذاری نشد ')
    count++;
    if (count == this.files.length) {
      this.reset();
    }
    return count;
  }

  addValuesToAttachmentObject(res: any) {
    this.attachment.fileName = res.fileName;
    this.attachment.fileCode = res.fileCode;
    this.attachment.objectId = this.objectId + '';
    this.attachment.classificationObject = this.classificationObject;
    return this.attachment;
  }

  resetFormGroup() {
    this.attachmentFormGroup.reset()
    this.files = [];
    this.attachment = new Attachment();
    this.attachment.objectId = this.objectId + '';
  }
}
