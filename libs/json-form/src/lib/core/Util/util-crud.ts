import {GenericService} from '../model/generic-service';
import {HttpResponse} from '@angular/common/http';
import {AppDialogService} from '../widget/dialog/service/app-dialog.service';
import {ServiceLocator} from '../service/locator.service';
import {notifySuccess} from './util-layout';
import {Pagination} from '../model/pagination.model';
import {QueryResult} from '../model/queryResult.model';
import {FormControl, Validators} from '@angular/forms';
import {AppFormGroup} from '../model/app-form-group';
import {AppFormControlDatasource} from '../widget/form/app-form-control-datasource';
import {AppFormControlModel} from '../widget/form/app-form-control.model';
import {AppTableDatasource} from '../widget/table/app-table-datasource';
import {PdfViewerService} from "../service/pdf-viewer.service";
import {DownloadFileService} from "../service/downloadFile.service";

export function deleteById(id: string | number | undefined,
                           service: GenericService<any>,
                           beforeDelete?: any,
                           afterDelete?: any) {
  let appDialogService = ServiceLocator.injector.get(AppDialogService);
  if (!service) {
    throw new Error("service not exit please inject it and add it to super constructor")
  }
  if (beforeDelete) {
    beforeDelete();
  }
  const appDialogConfirmationModel = {
    onClose: (res: boolean) => {
      if (res) {
        service.delete(id).subscribe((res: HttpResponse<any>) => {
          if (res) {
            notifySuccess('حذف با موفقیت انجام شد')
            if (afterDelete) {
              afterDelete(res)
            }
          }
        });
      }
    }
  }
  appDialogService.openDeleteConfirmationDialog(appDialogConfirmationModel)
}

export function setDatasourceAndPagination(result: QueryResult<any>, tableDatasource: AppTableDatasource<any>, pagination: Pagination) {
  if (result) {
    pagination.page = result.pageNumber!
    pagination.totalItems = result.totalRecords!
    tableDatasource.data = result.entityList!
    tableDatasource.pagination = pagination
  }
}

export function setDatasource(result: QueryResult<any>, tableDatasource: AppTableDatasource<any> ) {
  if (result) {
    tableDatasource.data = result.entityList!
  }
}

export function loadWithPagination(searchFormGroup: AppFormGroup<any> | any, service: GenericService<any>, pagination?: Pagination, beforeLoad?: any, afterLoad?: any) {
  if (!service) {
    throw new Error("service not exit please inject it and add it to super constructor")
  }
  if (beforeLoad) {
    beforeLoad();
  }
  service.getAllGridWithPagination(searchFormGroup.getRawValue(), pagination).subscribe((result: QueryResult<any>) => {
    if (result) {
      if (afterLoad) {
        afterLoad(result);
      }
      return result;
    }
  });
}

export function findById(id:any, service: GenericService<any>, beforeFind?: any, afterFind?: any) {
  if (!service) {
    throw new Error("service not exit please inject it and add it to super constructor")
  }
  if (beforeFind) {
    beforeFind();
  }
  service.find(id).subscribe((result: HttpResponse<any>) => {
    if (result) {
      if (afterFind) {
        afterFind(result);
      }
      return result;
    }
  });
}

export function persist(entity: AppFormGroup<any> | any, service: GenericService<any>, beforePersist?: any, afterPersist?: any) {  
  if (!service) {
    throw new Error("service not exit please inject it and add it to super constructor")
  }
  if (beforePersist) {
    beforePersist();
  }
  service.save(entity.getFormValue()).subscribe((res: HttpResponse<any>) => {
    notifySuccess('اطلاعات با موفقیت ذخیره شد');
    if (res) {
      if (afterPersist) {
        afterPersist(res);
      }
    }
  });
}

export function createFormGroupByDataSource(data: AppFormControlDatasource, formGroup: AppFormGroup<any>) {
  // @ts-ignore
  data.data.forEach(f => {
    const formControl = formGroup.get(f.name);
    if (formControl) {
      formControl.setValue(f.value);
    } else {
      formGroup.addControl(f.name, new FormControl(f.value, Validators.compose(f.validators)));
    }
  });
  return formGroup;
}

export function createFormGroup(data: AppFormControlModel[], formGroup: AppFormGroup<any>) {
  // @ts-ignore
  data.forEach(f => {
    const formControl = formGroup.get(f.name);
    if(f.inputType.name.trim()!='divider' && f.inputType.name.trim()!='formControl' && f.inputType.name.trim()!='accordion'){
      if (formControl) {
        formControl.setValue(f.value);
      } else {
        // @ts-ignore
        formGroup.addControl(f.name, new FormControl(f.value, Validators.compose(f.validators)));
      }
    }
    if(f.inputType.name.trim()=='formControl'){
      createFormGroup(f.formControl,formGroup)
    }
    if(f.inputType.name.trim()=='accordion'){
      f.accordion.forEach(accordion=>{
        createFormGroup(accordion.panel,formGroup)
      })
    }
  });
  return formGroup;
}


export function distinct(object: any, column: string): any[] {
  return object.map((item: { [x: string]: any; }) => item[column]).filter((value: any, index: any, self: string | any[]) => self.indexOf(value) === index);
}

/*groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);*/

export function groupBy(list: any[], keyGetter: (arg0: any) => any): Map<any, any> {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

/**
 * deep clone from object
 * @param object that is object to be clone
 */
export function cloneObject(object: any) {
  return JSON.parse(JSON.stringify(object));
}

export function downloadFile(api : string) {
  let downloadFileService = ServiceLocator.injector.get(DownloadFileService);
  downloadFileService.downloadFile(api);
}
