import {NgModule} from '@angular/core';
import {AppTableWidgetComponent} from './widget/table/cv-table-widget/app-table-widget.component';

import {AppErrorComponent} from './widget/error/app-mat-error/app-error.component';
import {DynamicPipe} from './pipe/dynamic.pipe';
import {AppLineChartComponent} from "./widget/chart/line-chart/app-line-chart.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {CarouselComponent} from "./widget/carousel/carousel.component";
import {TextAreaComponent} from "./widget/text-area/text-area.component";
import {PersonCardComponent} from "./widget/person-card/person-card.component";
import {LoginHistoryComponent} from "./widget/login-history/login-history.component";
import {MenuHistoryComponent} from "./widget/menu-history/menu-history.component";
import {InlineSVGModule} from "ng-inline-svg-2";
import {InputStringComponent} from "./widget/input/input-string/input-string.component";
import {InputNumberComponent} from "./widget/input/input-number/input-number.component";
import {InputDateComponent} from "./widget/input/input-date/input-date.component";
import {InputBaseInformationComponent} from "./widget/input/input-base-Information/input-base-information.component";
import {InputSliderComponent} from "./widget/input/input-slider/input-slider.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "./material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppTabComponent} from './widget/tab/app-tab.component';
import {DialogComponent} from './widget/dialog/dialog.component';
import {AppJsonFormComponent} from './json-form/component/app-json-form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OffCanvasComponent} from './widget/off-canvas/off-canvas.component';
import {AppDialogComponent, AppDialogOpener} from './widget/dialog/app-dialog.component';
import {AppFormWidgetComponent} from './widget/form/app-form-widget.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppButtonComponent} from "./widget/button/app-button.component";
import {AppTreeComponent} from './widget/tree/app-tree.component';
import {TreeActionFilterPipe} from './widget/tree/tree-action-filter.pipe';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AppDialogConfirmationComponent} from './widget/dialog/dialog-confirmation/app-dialog-confirmation.component';
import {InputCheckboxComponent} from './widget/input/input-checkbox/input-checkbox.component';
import {InputEnumComponent} from './widget/input/input-enum/input-enum.component';
import {AppCrudTemplateComponent} from './widget/crud-template/app-crud-template.component';
import {AppDialogTemplateComponent} from './widget/dialog-template/app-dialog-template.component';
import {SortPipe} from './pipe/sort.pipe';
import {SearchPipe} from './pipe/search.pipe';
import {FlexLayoutModule} from "@angular/flex-layout";
import {InputBaseInformationHeaderComponent} from "./widget/input/input-base-Information-header/input-base-information-header.component";
import {InputTextAreaComponent} from './widget/input/input-text-area/input-text-area.component';
import {ACInputOrganizationComponent} from './widget/input/input-organization/a-c-input-organization.component';
import {AppInputUsersComponent} from './widget/input/input-users/input-users.component';
import {AppInputRoleComponent} from './widget/input/input-role/input-role.component';
import {InputSwitchComponent} from './widget/input/input-switch/input-switch.component';
import {AppInputPersonnelComponent} from './widget/input/input-personel/input-personnel.component';
import {ACInputGroupComponent} from './widget/input/input-group/a-c-input-group.component';
import {FileUploaderComponent} from "./widget/input/file/file-uploader.component";
import {InputPasswordComponent} from "./widget/input/input-password/input-password.component";
import {HasAuthorityDirective} from './directive/has-authority.directive';
import {AttachmentComponent} from "./widget/attachment/attachment.component";
import {NgxDropzoneModule} from "ngx-dropzone";
import {PrettyJsonPipe} from './pipe/pretty-json.pipe';
import {BaseInfoPropertyWidgetComponent} from './widget/base-info-property/base-info-property-widget.component';
import {AppTreeTableWidgetComponent} from "./widget/table/cv-tree-table/app-tree-table-widget.component";
import {RouterModule} from "@angular/router";
import {DigitalArchiveCardComponent} from "./widget/digital-archive-card/digital-archive-card.component";
import {AppInputUnitIdentityComponent} from "./widget/input/input-unit-identity/input-unit-identity.component";
import {InputBaseInformationTreeComponent} from "./widget/input/input-base-Information/input-base-Information-tree/input-base-information-tree.component";
import {TreeModule} from 'primeng/tree';
import {ContextMenuModule} from 'primeng/contextmenu';
import {MenuHistoryInnerComponent} from "./widget/menu-history/menu-history-inner/menu-history-inner.component";
import {LoginHistoryInnerComponent} from "./widget/login-history/login-history-inner/login-history-inner.component";
import {TreeActionPipe} from './pipe/tree-action.pipe';
import {PdfViewerComponent} from "./widget/pdf-viewer/pdf-viewer.component";
import {PdfJsViewerModule} from "ng2-pdfjs-viewer";
import {InputOptionComponent} from "./widget/input/input-option/input-option.component";
import {InputCustomComponent} from "./widget/input/input-custom/input-custom.component";
import {DialogAttachmentComponent} from "./widget/attachment/dialog-attachment.component";
import {InputLocationComponent} from "./widget/input/input-location/input-location.component";
import { AppAccordionComponent } from './widget/accordion/app-accordion.component';
import { AppBarChartComponent } from './widget/chart/bar-chart/app-bar-chart.component';
import { AppPieChartComponent } from './widget/chart/pie-chart/app-pie-chart.component';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTreeSwitchComponent } from './widget/input/input-tree-switch/input-tree-switch.component';
import { AppDividerComponent } from './widget/divider/app-divider.component';
import { TasksComponent } from './widget/tasks/tasks.component';
import { GroupSearchComponent } from './widget/input/input-group/dialog-group-search/group-search.component';
import { OrganizationSearchComponent } from './widget/input/input-organization/dialog-organization-search/organization-search.component';
import { RoleSearchComponent } from './widget/input/input-role/role-search/role-search.component';
import { InputBaseInformationTreeDialogComponent } from './widget/input/input-base-Information/input-base-Information-tree/baseInformation-tree-dialog/input-base-information-tree-dialog.component';
import { UnitIdentitySearchComponent } from './widget/input/input-unit-identity/dialog-unit-identity-search/unit-identity-search.component';
import { PersonnelSearchComponent } from './widget/input/input-personel/dialog-personnel-search/personnel-search.component';
import { UsersSearchComponent } from './widget/input/input-users/dialog-users-search/users-search.component';
import { ConfirmationComponent } from './widget/tasks/confirmation/confirmation.component';
import { OrganizationService } from './service/organization.service';
import { AuthService } from './service/auth.service';
import { InputColorComponent } from './widget/input/input-color/input-color.component';
import { InputFormArrayComponent } from './widget/input/input-form-array/input-form-array.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ShamsiDatePipe } from './pipe/shamsi-date.pipe';
import {
  AppCrudTemplateToggleBaseComponent
} from './widget/crud-template-toggle-base/app-crud-template-toggle-base.component'

export const APP_COMPONENT = [
  AppTableWidgetComponent       , AppTabComponent           , AppTreeTableWidgetComponent       , CarouselComponent            ,
  TextAreaComponent             , PersonCardComponent       , LoginHistoryComponent             , MenuHistoryComponent         ,
  TasksComponent                , InputStringComponent      , InputNumberComponent              , InputDateComponent           ,
  InputBaseInformationComponent , InputSliderComponent      , DialogComponent                   , AppDialogOpener              ,
  AppJsonFormComponent          , AppLineChartComponent     , OffCanvasComponent                , AppDialogComponent           ,
  InputSwitchComponent          , AppFormWidgetComponent    , AppButtonComponent                , InputCheckboxComponent       ,
  AppDialogConfirmationComponent, ACInputGroupComponent     , InputEnumComponent                , AppCrudTemplateComponent     ,
  AppInputPersonnelComponent    , AppInputUsersComponent    , AppDialogTemplateComponent        , AppInputRoleComponent        ,
  InputTextAreaComponent        , FileUploaderComponent     , InputPasswordComponent            , ACInputOrganizationComponent ,
  AppTreeComponent              , AttachmentComponent       , BaseInfoPropertyWidgetComponent   , DigitalArchiveCardComponent  ,
  AppInputUnitIdentityComponent , MenuHistoryInnerComponent , InputBaseInformationTreeComponent , LoginHistoryInnerComponent   ,
  PdfViewerComponent            , InputOptionComponent      , InputCustomComponent              , DialogAttachmentComponent    ,
  InputLocationComponent        , AppAccordionComponent     , AppBarChartComponent              , AppPieChartComponent         ,
  InputTreeSwitchComponent      , AppDividerComponent       , GroupSearchComponent,
  OrganizationSearchComponent   , RoleSearchComponent       , InputBaseInformationTreeDialogComponent,
  UnitIdentitySearchComponent   , PersonnelSearchComponent  , UsersSearchComponent              , ConfirmationComponent,
  InputColorComponent           , InputFormArrayComponent   , AppCrudTemplateToggleBaseComponent

];
@NgModule({
  declarations: [
    ...APP_COMPONENT,
    // common
    AppErrorComponent,
    // pipe
    DynamicPipe,
    TreeActionFilterPipe,
    SortPipe,
    SearchPipe,
    InputBaseInformationHeaderComponent,
    PrettyJsonPipe,
    TreeActionPipe,
    ShamsiDatePipe,
    // directive
    HasAuthorityDirective,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ...APP_COMPONENT,
    HasAuthorityDirective,
    PrettyJsonPipe,
  ],
  imports: [
    //module
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    InlineSVGModule,
    NgApexchartsModule,
    NgbModule,
    FontAwesomeModule,
    MatProgressBarModule,
    FlexLayoutModule,
    NgxDropzoneModule,
    RouterModule,
    TreeModule,
    ContextMenuModule,
    PdfJsViewerModule,
    ToolbarModule,
    NgbProgressbarModule,
  ],
  providers: [
    NgApexchartsModule,
    InlineSVGModule,
    TreeActionPipe,
    OrganizationService,
    AuthService
  ]
})
export class CoreModule {

}
