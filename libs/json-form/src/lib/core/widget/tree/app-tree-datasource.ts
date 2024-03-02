/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
import {BehaviorSubject} from 'rxjs';
import {AppTreeNodeModel} from './app-tree-node.model';

export class AppTreeDatasource {

  public _dataChange = new BehaviorSubject<AppTreeNodeModel[]>([]);
  public _selection = new BehaviorSubject<AppTreeNodeModel[]>([]);

  get data(): AppTreeNodeModel[] {
    return this._dataChange.value;
  }

  set data(value: AppTreeNodeModel[]) {
    this._dataChange.next(value);
  }

  get selectionNode(): AppTreeNodeModel[] {
    return this._selection.value;
  }

  set selectionNode(value: AppTreeNodeModel[]) {
    this._selection.next(value);
  }

  refreshTree() {
    this._dataChange.next(this.data);
  }
}
