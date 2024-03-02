import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { MetroincService } from '../../metroinc.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footerContainerCssClasses: string = '';
  appVersion='';
  constructor(private layout: LayoutService,
    private environmentService:MetroincService) {}

  ngOnInit(): void {
    this.appVersion = `${this.environmentService.environment.appVersion}`;
    this.footerContainerCssClasses =
      this.layout.getStringCSSClasses('footerContainer');
  }
}
