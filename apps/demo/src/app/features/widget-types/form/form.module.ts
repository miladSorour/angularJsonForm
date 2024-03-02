import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '@pnrng/json-form';
import {FormComponent} from "./form.component";
import { RouterModule, Routes } from '@angular/router';
import { FormModalComponent } from './modal-form/modal-form.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent
  },

];

@NgModule({
  declarations: [
    FormComponent,
    FormModalComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],
})
export class FormModule {
}
