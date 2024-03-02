import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { GenericService } from '../model/generic-service';
import { Pagination } from '../model/pagination.model';
import { QueryResult } from '../model/queryResult.model';
import { TaskCount } from '../model/task-count.model';
import { TaskTimeLine } from '../model/task-time-line.model';
import { Confirm } from '../model/confirm.model';
import { QueryParam } from '../model/queryParam.model';
import { ModelProperties } from '../model/model-properties.model';
import {Task} from '../model/task.model';


@Injectable({providedIn: 'root'})
export class CartableService extends GenericService<Task> {

    constructor(http: HttpClient) {
        super(http, 'api/bpm/cartable');
    }

    getAuthenticatedUserTasks(entitySearch: Task, pagination?: Pagination): Observable<QueryResult<Task>> {
      let modelToParam = this.modelToParam(entitySearch, pagination);
        return this.http.get<QueryResult<Task>>(`${this.resourceUrl}/userTask/list`, {
            params: modelToParam,
            observe: 'body'
        });
    }

    getTasks(entitySearch: Task, pagination?: Pagination): Observable<QueryResult<Task>> {
      let modelToParam = this.modelToParam(entitySearch, pagination);
        return this.http.get<QueryResult<Task>>(`${this.resourceUrl}/task/list`, {
            params: modelToParam,
            observe: 'body'
        });
    }

    getTaskTimeLine(processInstanceId: string): Observable<TaskTimeLine[]> {
        return this.http.get<TaskTimeLine[]>(`${this.resourceUrl}/timeline/${processInstanceId}`, {observe: 'body'});
    }

    getPropertiesByInstanceId(processInstanceId: string): Observable<ModelProperties> {
        return this.http.get<ModelProperties>(`${this.resourceUrl}/properties/${processInstanceId}`, {observe: 'body'});
    }

    getHistoryPropertiesByInstanceId(processInstanceId: string): Observable<ModelProperties> {
        return this.http.get<ModelProperties>(`${this.resourceUrl}/history/properties/${processInstanceId}`, {observe: 'body'});
    }

    getTaskCount(entitySearch: Task, pagination?: Pagination): Observable<TaskCount> {
      let modelToParam = this.modelToParam(entitySearch, pagination);
        return this.http.get<TaskCount>(`${this.resourceUrl}/taskCount`, {
            params: modelToParam,
            observe: 'body'
        });
    }

    getGroupTasks(entitySearch: Task, pagination?: Pagination): Observable<QueryResult<Task>> {
      let modelToParam = this.modelToParam(entitySearch, pagination);
        return this.http.get<QueryResult<Task>>(`${this.resourceUrl}/userGroupsTask/list`, {
            params: modelToParam,
            observe: 'body'
        });
    }

    getArchvie(entitySearch: Task, pagination?: Pagination): Observable<QueryResult<Task>> {
      let modelToParam = this.modelToParam(entitySearch, pagination);
        return this.http.get<QueryResult<Task>>(`${this.resourceUrl}/userTask/archive/list`, {
            params: modelToParam,
            observe: 'body'
        });
    }

    getProcessDefinitionXml(key: string) {
        return this.http.get<TaskCount>(`/camunda/process-definition/key/${key}/xml`, {observe: 'body'});
    }

    getHistoricProcessInstance(modelId: string, processDefKey: string) {
        let options: HttpParams = new HttpParams();
        options = options.append('modelId', modelId.toString());
        options = options.append('processDefKey', processDefKey.toString());
        return this.http.get<any>(`${this.resourceUrl}/history/processInstance`, {observe: 'body', params: options});
    }

    findCurrentTaskByProcessDefKey(modelId: string, processDefKey: string) {
        let options: HttpParams = new HttpParams();
        options = options.append('modelId', modelId.toString());
        options = options.append('processDefKey', processDefKey.toString());
        return this.http.get<any>(`${this.resourceUrl}/process/task/current`, {observe: 'body', params: options});
    }

    complete(confirm: Confirm): Observable<any> {
        return this.http.post(`${this.resourceUrl}/task/complete`, confirm, {observe: 'response'});
    }

    completeTask(taskId: string, comment?: string): Observable<any> {
        let options: HttpParams = new HttpParams();
        options = options.append('comment', comment!);
        return this.http.post(`${this.resourceUrl}/task/complete/${taskId}`, {}, {observe: 'response'});
    }

    claim(taskId: String): Observable<any> {
        return this.http.post(`${this.resourceUrl}/task/claim/${taskId}`, null, {observe: 'response'});
    }

    unClaim(taskId: String): Observable<any> {
        return this.http.post(`${this.resourceUrl}/task/unClaim/${taskId}`, null, {observe: 'response'});
    }

    getAllUserProcess(): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/userProcess`, {observe: 'body'});
    }

    getAllUserTasks(): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/api/userTask`, {observe: 'body'});
    }

    getFilterTasks(param: QueryParam, filterId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/filter/tasks/${filterId}`, {
            params: param.toHttpPrams(),
            observe: 'body'
        });
    }

    deleteFilter(filterId: string) {
        return this.http.get<void>(`${this.resourceUrl}/filter/delete/${filterId}`);
    }

    deleteRecord(processInstanceId: string): Observable<any> {
        return this.http.post(`${this.resourceUrl}/process/deleteByProcessInstanceId/${processInstanceId}`, null, {observe: 'response'});
    }

    deleteProcInstByKey(modelId: string, processDefKey: string): Observable<any> {
        let httpParams: HttpParams = new HttpParams();
        httpParams = httpParams.append('modelId', modelId.toString());
        httpParams = httpParams.append('processDefinitionKey', processDefKey.toString());
        return this.http.delete(`${this.resourceUrl}/process/process-instance`, {
            observe: 'response',
            params: httpParams
        });
    }
}
