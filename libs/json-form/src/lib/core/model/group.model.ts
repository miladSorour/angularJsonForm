import { BaseEntity } from "./baseEntity.model";

export class Group extends BaseEntity<number> {

  constructor(public name?: string,
              public parentId?: number,
              public hierarchyCode?: string,
              public children?: Group[],
              public groupType?: number,
              public code?: string,
              public groupTypeTitle?: string,
              public groupTypePersianTitle?: string,
              public isEnabled?: boolean
  ) {
    super();
    this.id = -1;
    this.name = '';
    this.hierarchyCode = '';
  }
}
