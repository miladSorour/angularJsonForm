import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
import {saveAs} from "file-saver";

@Injectable({providedIn: "root"})
export class DownloadFileService {

  constructor(private http: HttpClient) {
  }

  downloadFile(api: string): any {
    return this.http.get(api, {observe: 'body', responseType: 'blob'}).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  saveFile(blob: any, name?: string) {
    saveAs(blob, name);
  }
}
