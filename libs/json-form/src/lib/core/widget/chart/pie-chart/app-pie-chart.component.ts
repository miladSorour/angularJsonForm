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
  ChartComponent
} from "ng-apexcharts";
import { Locales_en, Locales_fn } from "../../../constant/apex-chart-locales";
import {PieChartModel} from "./pie-chart.model";
import {ChartInterface} from '../chart-interface';
import { TranslationService } from "../../../service/translation.service";

class ChartOptions {
  series: number[] = [];
  chart: ApexChart;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  labels:string[] = []
}


@Component({
  selector: 'app-pie-chart',
  templateUrl: './app-pie-chart.component.html'
})

export class AppPieChartComponent implements OnInit, OnChanges, ChartInterface {
  @ViewChild("chart") chart: ChartComponent;
  @Input() data: PieChartModel;
  series: number[] = [];
  labels: string[] = [];

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
    this.data.data.data.forEach(subData => {
      const label = this.data.data.labelName;
      const value = this.data.data.valueName;
      this.series.push(+subData[value]);
      this.labels.push(subData[label]);
    })
  }

  drawChart() {
    this.chartOptions = {
      series: this.series,
      labels: this.labels,
      chart: {
        locales: [Locales_fn, Locales_en], //or multi language like [fa, en]
        defaultLocale: this.selectedLanguage,
        height: 350,
        type: "pie",
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
        enabled: true
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
