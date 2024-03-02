import {Component, OnInit} from '@angular/core';
import { MetroincService } from '../../../../layout/metroinc.service';

@Component({
  selector: 'app-explore-main-drawer',
  templateUrl: './explore-main-drawer.component.html',
})
export class ExploreMainDrawerComponent implements OnInit {
  appThemeName='' ;
  appPurchaseUrl='' ;
  appPreviewUrl='' ;
  appDemos='';

  constructor(private environmentService:MetroincService) {
  }

  ngOnInit(): void {
    this.appThemeName = this.environmentService.environment.appThemeName;
    this.appPurchaseUrl = this.environmentService.environment.appPurchaseUrl;
    this.appPreviewUrl = this.environmentService.environment.appPreviewUrl;
    this.appDemos = this.environmentService.environment.appDemos;
    
  }
}
