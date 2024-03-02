import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from '@pnrng/json-form'
// language list
import { ThemeModeService, chLang, deLang, enLang, esLang, faLang, frLang, jpLang } from '@pnrng/metronic-template';

@Component({
  // tslint:disable-next-line:component-selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private translationService: TranslationService,
    private modeService: ThemeModeService,
  ) {
    // register translations
    this.translationService.loadTranslations(
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang,
      faLang
    );
  }

  ngOnInit() {
    this.modeService.init();
  }
}
