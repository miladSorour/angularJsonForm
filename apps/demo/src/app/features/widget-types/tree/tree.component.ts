import {Component, Injector, OnInit} from '@angular/core';
import {TreeModel} from './tree.model';
import {TreeService} from "./tree.service";
import { TreeFormComponent } from "./tree-form.component";
import { BaseComponent, AppTreeDatasource, AppButtonActionModel, AppContainerModel, AppTreeNodeModel, AppDialogService, WidgetTypeModel, AppDialogModel, DialogSizeEnum } from '@pnrng/json-form';


@Component({
  selector: 'app-location-tree',
  template: `
    <app-json-form [containerList]="containerEdit"></app-json-form>`
})
export class TreeComponent extends BaseComponent<TreeModel> implements OnInit {

  treeDataSource = new AppTreeDatasource();
  actions: AppButtonActionModel[] = []
  editContainerList: AppContainerModel[];
  currentNode: AppTreeNodeModel;


  constructor(private injector: Injector,
              private locationService: TreeService,
              private dialogService: AppDialogService,) {
    super( locationService);
  }

  ngOnInit(): void {
    this.loadRootOfLocationTree();
    this.getTreeContainer();
    this.initContainerEdit();
  }

  initContainerEdit() {
    this.editContainerList = [this.getTreeContainer()];
    this.containerEdit = [
      {
        widgetType: WidgetTypeModel.crudTemplate,
        config: {
          pageTitle: 'درخت',
          actions: this.actions,
          container: this.editContainerList
        }
      }
    ];
  }

  loadRootOfLocationTree() {
    this.locationService.findByParent(null).subscribe(res => {
      const treeNode = new AppTreeNodeModel();
      treeNode.key = res[0].id!
      treeNode.label = res[0].title!
      treeNode.leaf=false
      this.currentNode = treeNode;
      this.treeDataSource.data = [treeNode]
    });
  }

  getTreeContainer(): AppContainerModel  {
    return {
      widgetType : WidgetTypeModel.tree,
      cols : 6,                rows : 1,
      config: {
        datasource: this.treeDataSource,
        onClick: (node: AppTreeNodeModel) => this.loadNode(node),
        onNodeExpand: (node: AppTreeNodeModel, level: number) => this.nodeExpand(node, level),
        onRefresh: (nodes: AppTreeNodeModel[]) => this.refreshNodes(nodes),
        showToolbar:true,
        contextMenu: [
          {title: 'درج', onClick: (element: AppTreeNodeModel) => this.insert(element)},
          {title: 'ویرایش', onClick: (element: AppTreeNodeModel) => this.editLocation(element), hide:(element: AppTreeNodeModel)=>element.parent==null},
          {title: 'حذف', onClick: (element: AppTreeNodeModel) => this.delete(element), hide:(element: AppTreeNodeModel)=>element.parent==null},
        ],
      }
    }

  }

  nodeExpand(event:any, level:number){
    this.loadNode(event.node,level)
  }

  refreshNodes(nodes: AppTreeNodeModel[]){
    if(nodes.length > 0){
      this.refreshNode(nodes[0],0)
    }
  }

  refreshNode(node: AppTreeNodeModel,index:number){
    this.locationService.find(node.key).subscribe(i => {
      node.label = i.title!
      this.treeDataSource.refreshTree();
    });
    if(node.children && node.children.length>0){
      node.children?.forEach((item,index)=>{
        this.refreshNode(item,index)
      })
    }
  }

  loadNode(node: AppTreeNodeModel, level?: number) {
    this.locationService.findByParent(node.key).subscribe(items => {
      const nodeModelList: AppTreeNodeModel[] = [];
      items.forEach(i => {
        const nodeModel = new AppTreeNodeModel();
        nodeModel.key = i.id!
        nodeModel.label = i.title!
        nodeModel.leaf=false
        nodeModelList.push(nodeModel)
      });
      if (nodeModelList.length > 0) {
        node.leaf=false
        node.children = nodeModelList;
        this.treeDataSource.refreshTree();
      }
    });
  }

  insert(element: AppTreeNodeModel) {
    const editMode = false;
    const dialogConfig: AppDialogModel = {
      size: DialogSizeEnum.lg,
      dialogData: {element, editMode},
      onClose: () => this.loadNode(element)
    }
    this.dialogService.openDialog(TreeFormComponent, dialogConfig);
  }

  editLocation(element: AppTreeNodeModel) {
    const editMode = true;
    const dialogConfig: AppDialogModel = {
      size: DialogSizeEnum.lg,
      dialogData: {element, editMode},
      onClose: () => this.loadNode(element.parent??element)
    }
    this.dialogService.openDialog(TreeFormComponent, dialogConfig);
  }

  delete(element:AppTreeNodeModel){
    this.currentNode=element
    super.delete(element.key)
  }

  afterDelete(res?: any) {
    super.afterDelete(res);
    if(this.currentNode.parent)
      this.loadNode(this.currentNode.parent)
  }
}
