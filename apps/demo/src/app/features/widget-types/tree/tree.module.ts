import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '@pnrng/json-form';
import { RouterModule, Routes } from '@angular/router';
import { TreeComponent } from './tree.component';
import { TreeFormComponent } from './tree-form.component';

const routes: Routes = [
  {
    path: '',
    component: TreeComponent
  },

];

@NgModule({
  declarations: [
    TreeComponent,
    TreeFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],
})
export class TreeModule {
}
