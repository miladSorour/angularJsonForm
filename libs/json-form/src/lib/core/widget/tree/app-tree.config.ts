import {AppTreeDatasource} from './app-tree-datasource';
import {AppTreeNodeModel} from './app-tree-node.model';
import {AppTreeActionModel} from './app-tree-action.model';
import { ActionItemConfig } from '../table/cv-table-widget/action-item-config';

export class AppTreeConfig {
  selectionMode ?: "single" | "checkbox";
  showToolbar ?: boolean;
  toolbarMenu?: ActionItemConfig[];
  datasource: AppTreeDatasource;
  onNodeExpand?: (node: AppTreeNodeModel, level: number) => any;
  contextMenu ?: AppTreeActionModel[];
  onClick     ?: (node: AppTreeNodeModel) => void;
  onChecked   ?: (node: AppTreeNodeModel[]) => any;
  selectedNode?: () => AppTreeNodeModel[];
  actions     ?: () => any;
  onRefresh   ?: (nodes: AppTreeNodeModel[]) => any;
  onNodeDrop  ?: (dragNode: AppTreeNodeModel, dropNode: AppTreeNodeModel) => void
}
