export class PieChartModel {
  chartName: string;
  chartType: 'datetime'| 'category' = 'datetime'
  data: ChartDataModel;
}

export class ChartDataModel {
  name: string
  data: any[];
  labelName: string;
  valueName: string;
}
