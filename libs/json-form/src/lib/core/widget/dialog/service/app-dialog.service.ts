import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/portal';
import {AppDialogModel} from '../models/app-dialog.model';
import {AppDialogConfirmationModel} from '../dialog-confirmation/app-dialog-confirmation.model';
import {AppDialogConfirmationComponent} from '../dialog-confirmation/app-dialog-confirmation.component';
import {DialogSizeEnum} from '../models/dialog-size.enum';

@Injectable({providedIn: 'root'})
export class AppDialogService {
  constructor(private dialog: MatDialog) {
  }

  openDialog<T, R = any>(component: ComponentType<T>, config: AppDialogModel | AppDialogConfirmationModel) {
    let matDialogRef = this.dialog.open(component, {
      data: config,
      width: this.getDialogWidthSize(config.size),
    });
    matDialogRef.afterClosed().subscribe((res: R) => {
      if (config.onClose) {
        config.onClose(res)
      }
    })
  }

  openConfirmationDialog(dialogConfig: AppDialogConfirmationModel) {
    this.openDialog(AppDialogConfirmationComponent, dialogConfig);
  }

  openDeleteConfirmationDialog(onConfirm: AppDialogConfirmationModel) {
    const dialog: AppDialogConfirmationModel = {
      content: 'از حذف اطلاعات اطمینان دارید؟',
      cancelButtonLabel: 'خیر',
      confirmButtonLabel: 'بله',
      icon: '',
      size: DialogSizeEnum.xs,
      onClose: (res: any) => {
        onConfirm.onClose(res)
      },
    }
    this.openConfirmationDialog(dialog)
  }

  openWarningConfirmationDialog(onConfirm: AppDialogConfirmationModel) {
    const dialog: AppDialogConfirmationModel = {
      content: 'از تغییر اطلاعات اطمینان دارید؟',
      cancelButtonLabel: 'خیر',
      confirmButtonLabel: 'بله',
      icon: '',
      size: DialogSizeEnum.xs,
      onClose: (res: any) => {
        onConfirm.onClose(res)
      },
    }
    this.openConfirmationDialog(dialog)
  }

  openWarningConfirmDialog(onConfirm: AppDialogConfirmationModel) {
    const dialog: AppDialogConfirmationModel = {
      content: 'از ثبت و تائید اطلاعات اطمینان دارید؟',
      cancelButtonLabel: 'خیر',
      confirmButtonLabel: 'بله',
      icon: '',
      size: DialogSizeEnum.xs,
      onClose: (res: any) => {
        onConfirm.onClose(res)
      },
    }
    this.openConfirmationDialog(dialog)
  }

  getDialogWidthSize(size: DialogSizeEnum  = DialogSizeEnum.md): string {
    return JSON.parse(size).width
  }

}
