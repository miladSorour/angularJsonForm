import {HttpParams} from '@angular/common/http';
import {Pagination} from './pagination.model';


export class QueryParam {
  paginationModel = new Pagination();

  constructor(public paramMap?: Map<string, any>, public filter?: any) {
  }

  toHttpPrams(): HttpParams {
    let options: HttpParams = new HttpParams();
    options = options.set('pageNumber', (this.paginationModel.page - 1).toString());
    options = options.append('pageSize', this.paginationModel.itemsPerPage.toString());
    options = options.append('order', this.paginationModel.sort());
    if (this.paramMap != null) {
      this.paramMap.forEach((value: any, key: string) => {
        if (value != undefined) {
          options = options.append(key, value);
        }
      });
    }
    if (this.filter) {
      Object.keys(this.filter).forEach(key => {
        if (this.filter[key] != undefined && String(this.filter[key]).length > 0) {
          if (!options.has(key))
            options = options.append(key, this.filter[key]);
        }
      });
    }
    return options;
  }

  toHttpPramsWithObjAndArr(): HttpParams {
    let options: HttpParams = new HttpParams();
    options = options.set('pageNumber', (this.paginationModel.page - 1).toString());
    options = options.append('pageSize', this.paginationModel.itemsPerPage.toString());
    options = options.append('order', this.paginationModel.sort());
    if (this.paramMap != null) {
      this.paramMap.forEach((value: any, key: string) => {
        if (value != null && typeof value === 'object' && Array.isArray(value) && value?.length) {
          for (let item of value)
            options = options.append((key + '[]'), (item?.id || item?.index || item));
        } else if (value != undefined) {
          options = options.append(key, value);
        }
      });
    }
    if (this.filter) {
      Object.keys(this.filter).forEach(key => {
        if (this.filter[key] != undefined && String(this.filter[key]).length > 0) {
          if (!options.has(key))
            options = options.append(key, this.filter[key]);
        }
      });
    }
    return options;
  }

  public static modelToHttpParam(model: any, paginationModel?: Pagination) {
    let options: HttpParams = new HttpParams();
    if (paginationModel) {
      options = options.set('pageNumber', (paginationModel.page).toString());
      options = options.append('pageSize', paginationModel.itemsPerPage.toString());
      options = options.append('order', paginationModel.sort());
    }
    if (model) {
      Object.keys(model).forEach(key => {
        if (model[key] != undefined && model[key] instanceof Object) {
          options = options.append(key, JSON.stringify(model[key]));
        } else if (model[key] != undefined && String(model[key]).length > 0) {
          if (!options.has(key))
            options = options.append(key, model[key]);
        }
      });
    }
    return options;
  }

  public static modelToParam(model: any) {
    const options = new Map<string, any>();
    if (model) {
      Object.keys(model).forEach(key => {
        if (model[key] != undefined && String(model[key]).length > 0) {
          if (!options.has(key))
            options.set(key, model[key]);
        }
      });
    }
    return options;
  }

  public static modelAppendToParam(model: any, options: Map<string, any>) {
    if (model) {
      Object.keys(model).forEach(key => {
        if (model[key] != undefined && String(model[key]).length > 0) {
          if (!options.has(key))
            options.set(key, model[key]);
        }
      });
    }
    return options;
  }

  public static mapToHttpParam(params: Map<string, any>) {
    let options: HttpParams = new HttpParams();
    params.forEach((value: any, key: string) => {
      if (value != undefined) {
        options = options.append(key, value);
      }
    });
    return options;

  }
}
