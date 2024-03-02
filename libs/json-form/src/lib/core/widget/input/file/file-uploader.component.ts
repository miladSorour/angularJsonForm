import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef, Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  OnInit,
  Optional,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {UploadFileType} from './file-uploader.enum';
import {FileUploaderService} from './file-uploader.service';
import {ToastrService} from 'ngx-toastr';
import {FileUploader} from 'ng2-file-upload';
import {AppEventManagerService} from '../../../service/event-manager/app-eventManager.service';
import {OPFile} from './opfile.model';
import {AppBaseInputModel} from "../app-base-input.model";
import {AppInputBaseConfig} from "../app-input-base-config";
import {FormBuilder, NgControl, Validators} from "@angular/forms";
import {AppDialogService} from "../../dialog/service/app-dialog.service";
import {ServiceLocator} from "../../../service/locator.service";
import {BaseComponent} from "../../../model/base-component.model";
import { saveAs } from 'file-saver';
import {AppFormConfig} from "../../form/app-form.config";
import {AppFormControlModel} from "../../form/app-form-control.model";
import { DownloadFileService } from '../../../service/downloadFile.service';


@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styles: [`.margin-y {
    margin-right: 0.5rem;
    margin-left: 0.5rem
  }`],
})
export class FileUploaderComponent extends AppBaseInputModel<AppInputBaseConfig> implements OnChanges, OnInit, DoCheck {

  @ViewChild('fileInputElement') fileInputElement: ElementRef;
  @ViewChild('imagePreview') imagePreview: ElementRef<HTMLElement>;
   showRemove                                    : boolean            = false;
   showFileName                                  : boolean            = false;
   showDownload                                  : boolean            = false;
   fileCode                                                           = '-1';
   fileName                                                           = '';
   uploadButtonName                                                   = 'بارگذاری';
   removeButtonName                                                   = 'حذف';
   downloadButtonName                                                 = 'دانلود';
   fileType                                      : UploadFileType;
   maxFileSize                                                        = '11000000';
   showCropper                                                        = 'true';
   baseUrl                                                            = 'api/attachment';
   urlHref                                       : string;
   fileUploader                                  : FileUploader       = new FileUploader({url: this.baseUrl + '/save'});
   appDialogService                              : AppDialogService;
   baseComponent                                 : BaseComponent<any>;
   differ: KeyValueDiffer<string, any>;

  constructor(
    @Self() @Optional() public control : NgControl,
    private differs: KeyValueDiffers,
    private formBuilder                : FormBuilder,
    private fileUploadService          : FileUploaderService,
    private appEventManagerService     : AppEventManagerService,
    private toastr                     : ToastrService,
    private downloadFileService        : DownloadFileService,
    private cdr                        : ChangeDetectorRef,
  ) {
    super();
    this.control.valueAccessor = this;
    this.differ = this.differs.find({}).create();
    this.fileCode = this.value
    this.appDialogService = ServiceLocator.injector.get(AppDialogService);
    this.fileUploader.onCompleteItem = (item: any, response: any,) => {
      const resp = JSON.parse(response);
      this.fileCode = resp.fileCode;
      this.fileName = resp.fileName;
      this.urlHref = 'api/attachment/getFile/' + this.fileCode;
      this.value = resp.fileCode
      this.cdr.detectChanges()
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.inputForm) {
      this.initForm();
    }

    const   appFormConfig: AppFormConfig = changes.appFormConfig.currentValue;
    const showRemoveCol                = appFormConfig.formControl.find((control: AppFormControlModel) => control.name === this.control.name).showRemove;
    const showFileNameCol              = appFormConfig.formControl.find((control: AppFormControlModel) => control.name === this.control.name).showFileName;
    const showDownloadCol              = appFormConfig.formControl.find((control: AppFormControlModel) => control.name === this.control.name).showDownload;
    appFormConfig.formGroup.valueChanges.subscribe(() => {
      if (showRemoveCol) {
        this.showRemove = showRemoveCol
      }
      if (showFileNameCol) {
        this.showFileName = showFileNameCol
      }
      if (showDownloadCol) {
        this.showDownload = showDownloadCol
      }

    })
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngDoCheck(): void {
    this.disabledInput();
    const change = this.differ.diff(this);
    if (change) {      
      change.forEachChangedItem(item => {
        if (item.key === '_value' && item.currentValue === null) {
          this.inputForm.reset();
          this.imagePreview.nativeElement.setAttribute('src','');
          this.imagePreview.nativeElement.classList.add('d-none')
        }
      });
    }
  }

  initForm() {
    this.inputForm = this.formBuilder.group({
      myInput: ['']
    });
  }

  openFileChosserDialog() {
    this.fileInputElement.nativeElement.click();
  }

  fileReader(event: any) {
    const input = event.target;    
    if (input.files && input.files[0].size <= Number(this.maxFileSize)) {
      const file: OPFile = new OPFile();
      file.file = input.files[0];
      file.fileName = input.files[0].name;
      this.fileName = file.fileName;    
      // this.value=file.fileName
      if (this.showCropper !== 'false') {
        const image = new Image();
        const reader: FileReader = new FileReader();
        reader.onloadend = (e: any) => {
          image.src = e.target.result;
          // const control = this.findCurrentFormControl(this.appFormConfig, this.control);
          // this.appFormConfig.formGroup.patchValue({[control.name!.toString()]: e.target.result})          
          this.imagePreview.nativeElement.setAttribute('src', e.target.result);
          this.imagePreview.nativeElement.classList.remove('d-none')
        };
        reader.readAsDataURL(file.file);
        this.addToQueue(file);
      } else {
        this.addToQueue(file);
      }
    } else {
      this.toastr.warning('حجم فایل مورد نظر باید کمتر از ۱۰ مگابایت باشد');
      return;
    }
  }

  addToQueue(genericFile: OPFile) {
    this.fileUploader.clearQueue();
    genericFile.fileName = this.fileName;
    this.fileUploader.addToQueue([genericFile.file]);
    this.fileUploader.setOptions({
      additionalParameter: { fileCode: this.fileCode },
      url: this.fileUploader.options.url
    });
    this.upload();
  }

  upload() {
    this.fileUploader.queue[0].upload();
  }

  delete() {
    const appDialogConfirmationModel = {
      onClose: (res: boolean) => {
        if (res) {
              this.fileCode = '-1';
              this.fileName = '';
              this.value = this.fileCode;
              this.cdr.detectChanges();
        }
      }
    }
    this.appDialogService.openDeleteConfirmationDialog(appDialogConfirmationModel)
  }

  downloadFileByFileCode() {
    if (this.value && this.value != '-1') {
      this.downloadFileService.downloadFile('/api/DigitalArchive/downloadFile/' + this.value).subscribe(
        (res: string | Blob) => {
          saveAs(res, this.fileName);
        });
    } else {
      this.baseComponent.notifyError('فایلی برای دانلود موجود نیست')
    }

  }
}
