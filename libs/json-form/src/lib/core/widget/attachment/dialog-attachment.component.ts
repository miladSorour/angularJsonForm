import {Component, Injector, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {BaseDialogComponentModel} from "../../model/base-dialog-component.model";
import {Attachment} from "./attachment.model";
import {AttachmentService} from "./attachment.service";
import {WidgetTypeModel} from "../../config/widget-type.model";
import {AppContainerModel} from "../../json-form/model/app-container.model";

/**
 * کامپوننت اقدامات اقلام مرتبط در درخواست عملیات فارنزیک جهت ثبت ،حذف و ویرایش اقلام
 */
@Component({
  selector: 'app-dialog-attachment',
  template: `
    <app-json-form [containerList]="dialogCrudContainer"></app-json-form>`
})
export class DialogAttachmentComponent extends BaseDialogComponentModel<Attachment> implements OnInit {

  constructor(private injector: Injector,
              private attachmentService: AttachmentService,
              public dialogRef: MatDialogRef<DialogAttachmentComponent>,
  ) {
    super(injector, attachmentService);
  }

  ngOnInit() {
    this.initContainerList();
    this.editFormGroup.createFormGroup(this.getFormContainer().config.formControl);
  }

  initContainerList(): void {
    // @formatter:off
    this.dialogCrudContainer = [
      {
        widgetType: WidgetTypeModel.dialogTemplate,
        config: {
          pageTitle: 'مستندات',
          container: [this.getAttachment()],
        },
      }
    ];
    // @formatter:on
  }

  getAttachment(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.attachment,
      cols: 12,                   rows: 2,
      config: {
        objectId: this.dialogConfig.dialogData.objectId,
        baseInfoHeader: this.dialogConfig.dialogData.baseInfoHeader,
        classificationObject:this.dialogConfig.dialogData.objectName,
      },
    }
    // @formatter:on
  }

}
