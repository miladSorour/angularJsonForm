import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RouterModule } from '@angular/router';
import {
  NgbDropdownModule,
  NgbProgressbarModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { MetronicComponent } from './metronic.component';
import { CardsModule, ChatInnerModule, ExtrasModule, WidgetsModule } from '../partials';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScriptsInitComponent } from './components/scripts-init/scripts-init.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AsideMenuComponent } from './components/aside/aside-menu/aside-menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { PageTitleComponent } from './components/header/page-title/page-title.component';
import { HeaderMenuComponent } from './components/header/header-menu/header-menu.component';
import {
  DrawersModule,
  DropdownMenusModule,
  ModalsModule,
  EngagesModule,
} from '../partials';
import { EngagesComponent } from '../partials/layout/engages/engages.component';
import { ThemeModeModule } from '../partials/layout/theme-mode-switcher/theme-mode.module';
import {CoreModule} from '@pnrng/json-form';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BookmarkIconComponent} from "./components/bookmark-icon/bookmark-icon.component";


@NgModule({
  declarations: [
    MetronicComponent,
    AsideComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ScriptsInitComponent,
    ToolbarComponent,
    AsideMenuComponent,
    TopbarComponent,
    PageTitleComponent,
    HeaderMenuComponent,
    EngagesComponent,
    BookmarkIconComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    ExtrasModule,
    ModalsModule,
    DrawersModule,
    EngagesModule,
    DropdownMenusModule,
    NgbTooltipModule,
    ThemeModeModule,
    CoreModule,
    FontAwesomeModule,
  ],
    exports: [MetronicComponent,WidgetsModule,CardsModule, DropdownMenusModule,ChatInnerModule],
})
export class LayoutModule {
  
}
