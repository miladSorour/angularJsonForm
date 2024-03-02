import {AppTableDatasource} from "../widget/table/app-table-datasource";

export class QueryResult<T> {
  constructor(
    public pageNumber?: number,
    public totalRecords?: number,
    public pageSize?: number,
    public entityList?: T[],
  ) {
  }
}
