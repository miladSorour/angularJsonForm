import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AppTreeConfig} from './app-tree.config';
import {TreeFunctionService} from './tree-function.service';
import {AppTreeNodeModel} from './app-tree-node.model';
import {AppTreeActionModel} from './app-tree-action.model';
import {TreeDragDropService} from 'primeng/api';
import {cloneObject} from '../../Util/util-crud';
import {TreeActionPipe} from '../../pipe/tree-action.pipe';
import { IconEnum } from '../../enum/icon.enum';

@Component({
  selector: 'app-tree-widget',
  templateUrl: 'app-tree.component.html',
  styleUrls: ['app-tree.component.scss'],
  providers: [TreeDragDropService],
})
/**
 * https://stackoverflow.com/questions/61135911/hide-primeng-context-menu-with-a-condition
 */
export class AppTreeComponent implements OnInit {

  @Input() data: AppTreeConfig;
  datasource: any[];
  selectedNode: any[] = [];
  items: any[] = []
  copyItems: any[] = []
  currentNode: AppTreeNodeModel;
  iconEnum = IconEnum
  checkAllValue=false
  showAllValue=false
  showToggle=false
  selectToggle=false

  constructor(public service: TreeFunctionService,
              private treeActionPipe: TreeActionPipe,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (!this.data.selectionMode) {
      this.data.selectionMode = 'single';
    }
    if (this.data.contextMenu) {
      this.data.contextMenu.forEach((cm: AppTreeActionModel) => {        
        this.items.push(cm)
      })
    }
    this.copyItems = this.treeActionPipe.transform(cloneObject(this.items), new AppTreeNodeModel());

    this.data.datasource._dataChange.subscribe(data => {
      if(data && data.length!=0)
      {
      this.datasource = data
      this.cdr.detectChanges()
      }
    });
    if (this.data?.datasource?.selectionNode) {
      this.data.datasource._selection.subscribe(data => {
        this.selectedNode = data;
      });
    }
  }

  getLevel = (node: AppTreeNodeModel) => this.service.findPosition(node.key, this.data.datasource.data);

  onRightClick(node: AppTreeNodeModel) {
    this.currentNode = node;
    let _items: any[] = [];
    Object.assign(_items, this.items)
    _items=this.hideContextMenu(_items, node);
    this.disabledContextMenu(_items, node);
    this.copyItems = this.treeActionPipe.transform(_items, node);
  }

  private hideContextMenu(_items: AppTreeActionModel[], node: AppTreeNodeModel) {
    _items=_items.filter((i: AppTreeActionModel, index) => {
      if (i.hide){
        if(!i.hide(node)){
          return true
        }
      }else{
        return true
      }
    })
    return _items
  }

  private disabledContextMenu(_items: AppTreeActionModel[], node: AppTreeNodeModel) {
    _items.forEach((i: AppTreeActionModel, index) => {
      if (i.disabled) {
        i._disabled = i.disabled(node);
      }
    })
  }

  showToggleNode(){
    this.showToggle=!this.showToggle
    this.datasource.forEach(node => this.selectNodeAndChildren(node,this.showToggle,'expanded'));  
  }

  closeTree(){
    this.datasource.forEach(node => this.selectNodeAndChildren(node,false,'expanded'));  
  }

  selectToggleNode(){
    this.selectToggle=!this.selectToggle
    this.datasource.forEach(node => this.selectNodeAndChildren(node,this.selectToggle,'partialSelected'));  
  }

  unSelectTree(){
    this.datasource.forEach(node => this.selectNodeAndChildren(node,false,'partialSelected'));  
  }

  selectNodeAndChildren(node: any,isSelected:boolean,key:string) {
    node[key] = isSelected;
    if (node.children) {
      node.children.forEach((child:any) => this.selectNodeAndChildren(child,isSelected,key));
    }
  }
}

