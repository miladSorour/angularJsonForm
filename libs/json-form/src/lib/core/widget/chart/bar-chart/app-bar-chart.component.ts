import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from "ng-apexcharts";
import {BarChartModel} from "./bar-chart.model";
import {ChartInterface} from '../chart-interface';
import { TranslationService } from "../../../service/translation.service";
import { Locales_en, Locales_fn } from "../../../constant/apex-chart-locales";

class ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  plotOptions:any
}

class AppSeries {
  name: string;
  data: any[] = [];
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './app-bar-chart.component.html'
})

export class AppBarChartComponent implements OnInit, OnChanges, ChartInterface {
  @ViewChild("chart") chart: ChartComponent;
  @Input() data: BarChartModel;
  series: AppSeries[] = [];

  chartOptions: ChartOptions = new ChartOptions();
  selectedLanguage = 'fa';

  constructor(private translate: TranslationService) {
    this.selectedLanguage = this.translate.getSelectedLanguage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // todo if language change redraw chart
    // throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    this.adjustChartModel();
    this.drawChart();
  }

  adjustChartModel(): void {
    for (let i = 0; i < this.data.data.length; i++) {
      const data = this.data.data[i];
      if (data.data[0].hasOwnProperty(data.xColumnName) && data.data[0].hasOwnProperty(data.yColumnName)) {
        if (data.data.length > 0) {
          const series = new AppSeries();
          data.data.forEach(subData => {
            console.log({subData,nx:data.xColumnName,ny:data.yColumnName});
            series.data.push({x: subData[data.xColumnName], y: subData[data.yColumnName]});
          });
          series.name = data.name
          this.series.push(series)
        } else {
          throw Error("data not exist")
        }
      } else {
        throw Error("xColumnName or yColumnName is incorrect ")
      }
    }
  }

  drawChart() {
    this.chartOptions = {
      series: this.series,
      chart: {
        locales: [Locales_fn, Locales_en], //or multi language like [fa, en]
        defaultLocale: this.selectedLanguage,
        height: 350,
        type: "bar",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      colors: ["#77B6EA", "#545454", "#50601FFF"],
      dataLabels: {
        enabled: false
      },
      stroke: {curve: "straight"},
      title: {
        text: this.data.chartName,
        align: "center"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        title: {
          text: "تعداد"
        },
        min: 5,
        max: 40
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    }
  }
}
