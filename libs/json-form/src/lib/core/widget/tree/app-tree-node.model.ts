export class AppTreeNodeModel {
  key: number;
  label: string;
  children?: AppTreeNodeModel[];
  expended ?: boolean;
  icon?: string;
  nodeType?: string;
  parent?: AppTreeNodeModel;
  //public level?: number;
  rootNode?: AppTreeNodeModel;
  nodeFromRoot?: AppTreeNodeModel;
  public isFilter?: boolean;
  keyValue?: any;
  leaf?:boolean
  expanded?:boolean
  partialSelected?:boolean
}
