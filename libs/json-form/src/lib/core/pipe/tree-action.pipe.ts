import { Pipe, PipeTransform } from "@angular/core";
import { MenuItem } from "primeng/api";
import {AppTreeActionModel} from '../widget/tree/app-tree-action.model';
import {AppTreeNodeModel} from '../widget/tree/app-tree-node.model';

@Pipe({name: 'treeActionPipe'})
export class TreeActionPipe implements PipeTransform {
  transform(actionList: AppTreeActionModel[], selectedNode: AppTreeNodeModel): MenuItem[] {
    if (!actionList) {
      return actionList;
    }
    // @ts-ignore
    return actionList.map(action => {
      return {
        icon: action.icon,
        label: action.title,
        command: (node: AppTreeNodeModel) => action.onClick(selectedNode),
        disabled: action._disabled
      }
    })
  }
}
