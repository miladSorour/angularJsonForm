import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {ClipboardModule} from 'ngx-clipboard';
import {TranslateModule} from '@ngx-translate/core';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthService, JsonFormService} from '@pnrng/json-form';
import {FlexLayoutModule} from "@angular/flex-layout";
// #fake-start#
import {CoreModule} from '@pnrng/json-form';
import {ToastrModule} from "ngx-toastr";
import {BrowserModule} from "@angular/platform-browser";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ServiceLocator} from '@pnrng/json-form';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  POSITION,
  SPINNER
} from 'ngx-ui-loader';
import { FakeAPIService } from './core/services/fake-api.service';
import { InnerHttpInterceptor } from './core/services/inner-http-interceptor.service';
import { environment } from '../environments/environment';

// #fake-end#
function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "red",
  "bgsOpacity": 0.1,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "three-strings",
  "blur": 0,
  "delay": 2000,
  "fastFadeOut": true,
  "fgsColor": "#673ab7",
  "fgsPosition": "center-center",
  "fgsSize": 30,
  "fgsType": "three-bounce",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 60,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(65,65,65,0.09)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": false,
  "maxTime": -1,
  "minTime": 300
}


@NgModule({
  declarations: [AppComponent],
  imports: [
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    FontAwesomeModule,
    FlexLayoutModule,
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
        passThruUnknownUrl: true,
        dataEncapsulation: false,
      })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    // inner module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    FontAwesomeModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule, // import this module for showing loader automatically when navigating between app routes
    // If you need to show foreground spinner, do as follow:
    NgxUiLoaderHttpModule.forRoot({ showForeground: true })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InnerHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector,private jsonFormService:JsonFormService){    // Create global Service Injector.
    this.jsonFormService.environment=environment
    ServiceLocator.injector = this.injector;
  }
}
