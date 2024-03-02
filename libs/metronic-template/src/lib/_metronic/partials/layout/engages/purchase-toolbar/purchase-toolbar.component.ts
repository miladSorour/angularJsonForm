import {Component, OnInit} from '@angular/core';
import { MetroincService } from '../../../../layout/metroinc.service';

@Component({
  selector: 'app-purchase-toolbar',
  templateUrl: './purchase-toolbar.component.html',
})
export class PurchaseToolbarComponent implements OnInit {
  appPurchaseUrl='';

  constructor(private environmentService:MetroincService) {
  }

  ngOnInit(): void {
    this.appPurchaseUrl = this.environmentService.environment.appPurchaseUrl;
}
}
