import {Component, Inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppDialogModel} from './models/app-dialog.model';

@Component({
  selector: 'app-dialog',
  template: `
    <h1 mat-dialog-title>{{data.title}}</h1>
    <div mat-dialog-content>
      <app-json-form *ngIf="data.container"
                     [containerList]="data.container">
      </app-json-form>
    </div>
    <div mat-dialog-actions>
      <ng-container *ngFor="let actionButton of data.actionButton">
        <button mat-button [color]="actionButton.class"
                [disabled]="getBooleanCallBackFunction(actionButton?.disabled)"
                (click)="actionButton.onClick()">
          {{actionButton.title}}
        </button>
      </ng-container>
      <button mat-button [mat-dialog-close]="" cdkFocusInitial>بستن</button>
    </div>
  `
})
export class AppDialogComponent {

  constructor(public dialogRef: MatDialogRef<AppDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  getBooleanCallBackFunction(func: any, element?: any): boolean {
    if (func && typeof func === 'boolean') {
      return func;
    } else if (func) {
      return func(element);
    } else {
      return false;
    }
  }
}


@Component({
  selector: 'app-dialog-opener',
  template: ``,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class AppDialogOpener implements OnChanges {


  @Input() dialogData: AppDialogModel

  constructor(public dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dialogData.currentValue != null && changes.dialogData.currentValue != changes.dialogData.previousValue) {
      this.openDialog()
    }
  }

  openDialog() {
    this.dialog.open(AppDialogComponent, {
      width: '500px',
      data: this.dialogData,
    });
  }
}
