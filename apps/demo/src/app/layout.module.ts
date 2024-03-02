import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from "./pages/routing";
import { MetronicComponent } from '@pnrng/metronic-template';
import { environment } from '../environments/environment';

const menuList = [
  {
    "id": 1,
    "title": "widget types",
    "route": null,
    "order": 1,
    "enabled": true,
    "cssClass": null,
    "parentId": null,
    "deleted": false,
    "children": [
      {
        "id": 11,
        "title": "form",
        "route": "/widget-types/form",
        "order": 1,
        "enabled": true,
        "cssClass": null,
        "parentId": 1,
        "children": [],
        "deleted": false
      },
      {
        "id": 12,
        "title": "tree",
        "route": "/widget-types/tree",
        "order": 2,
        "enabled": true,
        "cssClass": null,
        "parentId": 1,
        "children": [],
        "deleted": false
      },

    ],
  },
]

const routes: Routes = [
  {
    path: '',
    component: MetronicComponent,
    data:{menuList,environment},
    children: Routing,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class LayoutModule { }
