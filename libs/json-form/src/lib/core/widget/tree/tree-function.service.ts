

import { Injectable } from '@angular/core';
import {AppTreeNodeModel} from './app-tree-node.model';
import {HttpClient} from '@angular/common/http';
import {TreeNode} from 'primeng/api/treenode';

@Injectable({
  providedIn: 'root'
})
export class TreeFunctionService {

  constructor(private http: HttpClient) { }

  flatJsonArray(flattenedAray: Array<AppTreeNodeModel>, node: AppTreeNodeModel[]) {
    const array: Array<AppTreeNodeModel> = flattenedAray;
    node.forEach(element => {
      if (element.children) {
        array.push(element);
        this.flatJsonArray(array, element.children);
      }
    });
    return array;
  }

  getFiles() {
    return this.http.get<any>('assets/file.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
  }

  findNodeMaxId(node: AppTreeNodeModel[]) {
    const flatArray = this.flatJsonArray([], node);
    const flatArrayWithoutChildren: any[] = [];
    flatArray.forEach(element => {
      flatArrayWithoutChildren.push(element.key);
    });
    return Math.max(...flatArrayWithoutChildren);
  }

  findPosition(id: number, data: AppTreeNodeModel[]): number {
    if (data.length > 0) {
      for (let i = 0; i <= data.length; i += 1) {
        if (data[i] && id === data[i].key) {
          return i;
        }
      }
    }
    return -1;
  }


}
