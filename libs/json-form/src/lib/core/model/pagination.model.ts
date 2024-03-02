export class Pagination {
  public defSortValue?: string;
  public reverse?: boolean;
  public routeData?: any;
  public totalItems?: number;
  public queryCount?: number;
  public itemsPerPage: number;
  public page: number;
  public predicate?: string;
  public previousPage?: any;
  public sortDirection: 'desc' | 'asc' | '' | undefined;
    constructor(defSortValue?: string, sortDirection?: 'desc' | 'asc' | '' | undefined) {
        this.routeData = '';
        this.totalItems = 0;
        this.queryCount = 0;
        this.itemsPerPage = 10;
        this.page = 0;
        this.predicate = defSortValue ? defSortValue : '';
        this.previousPage = '';
        this.sortDirection = sortDirection
    }

    sort(): string {
        let result: string[] = [];
        if (this.defSortValue == '') {
            return '';
        }
        if (this.predicate !== undefined && this.predicate.trim().length > 0) {
            if (this.predicate !== this.defSortValue) {
                result = [this.predicate + ' ' + (this.sortDirection==undefined || this.sortDirection === '' || this.sortDirection=== 'desc' ? 'desc' : 'asc')];
            } else {
                result = [this.predicate + ' ' + (this.sortDirection==undefined || this.sortDirection === '' || this.sortDirection=== 'desc' ? 'desc' : 'asc')];
            }
        }
        return result.toString();
    }
}
