import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GenericService} from '../../../model/generic-service';

@Injectable({providedIn: 'root'})
export class FileUploaderService extends GenericService<any> {

    constructor(http: HttpClient) {
        super(http, 'api/attachment');
    }

    delete(fileCode: string): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/deleteFile/${fileCode}`);
    }

    getFilesByFileCodes(files: string[]): Observable<any> {
        return this.http.post<string[]>(`${this.resourceUrl}/getFilesByFileCodes`, files, {observe: 'response'});
    }
}
