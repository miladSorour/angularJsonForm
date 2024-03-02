import {NgModule} from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {CdkTreeModule} from '@angular/cdk/tree';
import {PortalModule} from '@angular/cdk/portal';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatRippleModule
} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTreeModule} from '@angular/material/tree';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSliderModule} from "@angular/material/slider";
import { TablePaginationSetting } from './widget/table/table-pagination-setting';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTableExporterModule} from 'mat-table-exporter';
import { CustomDateAdapter } from './Util/custom-date-adapter';


const MY_DATE_FORMATS = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    dateInput         : 'input',
    monthYearLabel    : {year: 'numeric', month: 'short'},
    dateA11yLabel     : {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
}

export const ANGULAR_MATERIAL_MODULES = [
  MatTooltipModule        , MatAutocompleteModule , MatButtonModule        , MatCardModule         ,
  MatCheckboxModule       , MatChipsModule        , MatDividerModule       , MatExpansionModule    ,
  MatIconModule           , MatInputModule        , MatListModule          , MatMenuModule         ,
  MatProgressSpinnerModule, MatPaginatorModule    , MatRippleModule        , MatSelectModule       ,
  MatSidenavModule        , MatSnackBarModule     , MatSortModule          , MatTableModule        ,
  MatTabsModule           , MatToolbarModule      , MatFormFieldModule     , MatButtonToggleModule ,
  MatTreeModule           , MatNativeDateModule   , MatSliderModule        , MatButtonModule       ,
  MatInputModule          , MatRippleModule       , MatDatepickerModule    , MatGridListModule     ,
  CdkTreeModule           , OverlayModule         , PortalModule           , MatDialogModule       ,
  MatSlideToggleModule    , DragDropModule        , MatTableExporterModule
];

@NgModule({
  imports: [
    ...ANGULAR_MATERIAL_MODULES
  ],
  exports: [
    ...ANGULAR_MATERIAL_MODULES
  ],
  providers: [
    {provide: MAT_DATE_LOCALE , useValue: 'fa-IR'                                        },
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS                                },
    {provide: DateAdapter     , useClass: CustomDateAdapter     , deps: [MAT_DATE_LOCALE]},
    {provide: MatPaginatorIntl, useClass: TablePaginationSetting                         },
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' }        }, // fill, outline, standard
  ],

})
export class MaterialModule {}
