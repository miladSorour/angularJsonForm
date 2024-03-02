import {AppSelectionModel} from './app-selection.model';

export class CheckBoxOption {

  selection?: AppSelectionModel<any>;
  onSelect?: any;
  onSelectAll?: any;
  disabled?: any;
  withSelectAll?: boolean;

  constructor() {
    if (!this.withSelectAll) {
      this.withSelectAll = false;
    }
  }
}
