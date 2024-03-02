export class LineChartModel {
  chartName: string;
  chartType: 'datetime'| 'category' = 'datetime'
  data: ChartDataModel[];
}

export class ChartDataModel {
  name: string
  data: any[];
  xColumnName: string;
  yColumnName: string;
}
