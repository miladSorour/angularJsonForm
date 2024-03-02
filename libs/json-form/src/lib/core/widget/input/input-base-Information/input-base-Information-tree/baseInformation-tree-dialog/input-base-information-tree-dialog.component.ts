import {Component, Injector, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {BaseDialogComponentModel} from "../../../../../model/base-dialog-component.model";
import { AppTreeNodeModel } from "../../../../tree/app-tree-node.model";
import { AppContainerModel } from "../../../../../json-form/model/app-container.model";
import { WidgetTypeModel } from "../../../../../config/widget-type.model";
import { BaseInformation } from "../../../../../model/baseInfromation.model";
import { AppTreeDatasource } from "../../../../tree/app-tree-datasource";
import { BaseInformationService } from "../../baseInformation.service";
import { AppButtonActionModel } from "../../../../button/app-button-action.model";

@Component({
  selector: 'app-base-information-tree-dialog-component',
  template: `
    <app-json-form [containerList]="containerEdit"></app-json-form>`
})
export class InputBaseInformationTreeDialogComponent extends BaseDialogComponentModel<BaseInformation> implements OnInit {

  treeDataSource = new AppTreeDatasource();
  actions: AppButtonActionModel[] = []
  editContainerList: AppContainerModel[];
  currentNode: AppTreeNodeModel;
  headerId = this.dialogConfig.dialogData;


  constructor(private injector: Injector,
              private baseInformationService: BaseInformationService,
              public dialogRef: MatDialogRef<InputBaseInformationTreeDialogComponent>) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadRootOfBaseInformationTree();
    this.getTreeContainer();
    this.initContainerEdit();
  }

  initContainerEdit() {
    this.editContainerList = [this.getTreeContainer()];
    this.containerEdit = [
      {
        widgetType: WidgetTypeModel.crudTemplate,
        config: {
          pageTitle: 'اطلاعات پایه',
          actions: this.actions,
          container: this.editContainerList
        }
      }
    ];
  }

  loadRootOfBaseInformationTree() {
    let treeNodeList: AppTreeNodeModel[] = [];
    this.baseInformationService.findByHeaderAndParent(this.headerId, null).subscribe(res => {
      res.forEach(item => {
        const treeNode = new AppTreeNodeModel();
        treeNode.key = item.id!
        treeNode.label = item.topic!
        treeNode.leaf=false
        treeNodeList.push(treeNode);
      })
      this.currentNode = treeNodeList[0];
      this.treeDataSource.data = treeNodeList;
    });
  }

  getTreeContainer(): AppContainerModel {
    // @formatter:off
    return {
      widgetType: WidgetTypeModel.tree,
      rows: 1, cols: 6,
      config: {
        datasource: this.treeDataSource,
        onClick: (node: AppTreeNodeModel) => this.selectedNode(node),
        onNodeExpand: (node: AppTreeNodeModel) => this.loadNode(node)
      }
    }
    // @formatter:on
  }

  loadNode(node: AppTreeNodeModel) {
    this.baseInformationService.findByHeaderAndParent(null, node.key).subscribe(items => {
      let nodeModelList: AppTreeNodeModel[] = [];
      items.forEach(i => {
        const nodeModel = new AppTreeNodeModel();
        nodeModel.key = i.id!
        nodeModel.label = i.topic!
        nodeModel.leaf=false
        nodeModelList.push(nodeModel)
      });
      node.children = nodeModelList;
      this.treeDataSource.refreshTree();
    });
  }

  private selectedNode(element: AppTreeNodeModel) {
    this.dialogRef.close(element)
  }

}
