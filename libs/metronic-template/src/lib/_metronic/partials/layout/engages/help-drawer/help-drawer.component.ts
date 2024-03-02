import {Component, OnInit} from '@angular/core';
import { MetroincService } from '../../../../layout/metroinc.service';

@Component({
  selector: 'app-help-drawer',
  templateUrl: './help-drawer.component.html',
})
export class HelpDrawerComponent implements OnInit {
  appThemeName='';
  appPurchaseUrl='';

  constructor(private environmentService:MetroincService) {
  }

  ngOnInit(): void {
    this.appThemeName = this.environmentService.environment.appThemeName;
    this.appPurchaseUrl = this.environmentService.environment.appPurchaseUrl;  
  }
}
