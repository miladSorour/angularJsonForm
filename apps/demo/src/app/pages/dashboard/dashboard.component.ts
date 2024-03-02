import { Component, OnInit, ViewChild} from '@angular/core';
import {LineChartModel} from "@pnrng/json-form";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  chartData = new LineChartModel();

  constructor() {
    this.chartData.chartName = "روند ثبت اطلاعات"
    this.chartData.data = [
      {
        name: "استعلام",
        xColumnName: "date",
        yColumnName: "value",
        data: [{"date": "1401/03", "value": 20}, {"date": "1401/04", "value": 2}],
      },
      {
        name: "خبر",
        xColumnName: "date",
        yColumnName: "value",
        data: [{"date": "1401/04", "value": 10}, {"date": "1401/05", "value": 20}, {"date": "1401/08", "value": 15}],
      }
    ];
  }

  ngOnInit(): void {}

}


