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
import { Locales_en, Locales_fn } from "../../../constant/apex-chart-locales";
import {LineChartModel} from "./line-chart.model";
import {ChartInterface} from '../chart-interface';
import { TranslationService } from "../../../service/translation.service";

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
}

class AppSeries {
  name: string;
  data: any[] = [];
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './app-line-chart.component.html'
})

export class AppLineChartComponent implements OnInit, ChartInterface {
  @ViewChild("chart") chart: ChartComponent;
  @Input() chartData: LineChartModel;
  series: AppSeries[] = [];

  chartOptions: ChartOptions = new ChartOptions();
  selectedLanguage = 'fa';

  constructor(private translate: TranslationService) {
    this.selectedLanguage = this.translate.getSelectedLanguage();
  }

  ngOnInit(): void {
    this.adjustChartModel();
    this.drawChart();
  }

  adjustChartModel(): void {
    for (let i = 0; i < this.chartData.data.length; i++) {
      const chartData = this.chartData.data[i];
      if (chartData.data[0].hasOwnProperty(chartData.xColumnName) && chartData.data[0].hasOwnProperty(chartData.yColumnName)) {
        if (chartData.data.length > 0) {
          const series = new AppSeries();
          chartData.data.forEach(data => {
            series.data.push({x: data[chartData.xColumnName], y: data[chartData.yColumnName]});
          });
          series.name = chartData.name
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
        type: "line",
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
      colors: ["#77B6EA", "#545454", "#50601FFF"],
      dataLabels: {
        enabled: false
      },
      stroke: {curve: "straight"},
      title: {
        text: this.chartData.chartName,
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
