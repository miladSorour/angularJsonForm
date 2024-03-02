import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppDialogConfirmationModel} from './app-dialog-confirmation.model';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './app-dialog-confirmation.component.html',
})
export class AppDialogConfirmationComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AppDialogConfirmationModel,
    public dialogRef: MatDialogRef<AppDialogConfirmationComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  closeDialog(result: boolean): void {
    this.dialogRef.close(result);
  }
}
