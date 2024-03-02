import { Pipe, PipeTransform } from "@angular/core";
import {AppTreeActionModel} from './app-tree-action.model';

@Pipe({
  name: 'treeAction'
})
export class TreeActionFilterPipe implements PipeTransform {

  transform(actions: AppTreeActionModel[], type?: 'menu' | 'quick' | undefined): any {
    if (actions == undefined)
      return actions;
  }
}
