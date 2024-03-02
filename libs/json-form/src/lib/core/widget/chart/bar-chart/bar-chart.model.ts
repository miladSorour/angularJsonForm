export class BarChartModel {
  chartName: string;
  chartType: 'datetime'| 'category' = 'datetime'
  data: ChartDataModel[];
}

 class ChartDataModel {
  name: string
  data: any[];
  xColumnName: string;
  yColumnName: string;
}
