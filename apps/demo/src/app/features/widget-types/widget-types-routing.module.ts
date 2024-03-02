import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'form',
    loadChildren:()=>import('./form/form.module').then(m=>m.FormModule)
  },
  {
    path: 'tree',
    loadChildren:()=>import('./tree/tree.module').then(m=>m.TreeModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WidgetTypesRoutingModule {
}
