import {BaseComponent} from './base-component.model';
import {Directive, Injector} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AppDialogModel} from '../widget/dialog/models/app-dialog.model';
import {AppContainerModel} from '../json-form/model/app-container.model';
import {GenericService} from "./generic-service";

@Directive()
export class BaseDialogComponentModel<T> extends BaseComponent<T> {
  dialogConfig: AppDialogModel;
  dialogCrudContainer : AppContainerModel[];

  constructor(protected injectorObj: Injector,
              protected dialogGenericService?: GenericService<T> | null | undefined) {
    super(dialogGenericService);
    this.dialogConfig = this.injectorObj.get(MAT_DIALOG_DATA);
  }

  closeDialog(dialogRef: any, value: any){
    dialogRef.close(value);
  }
}
