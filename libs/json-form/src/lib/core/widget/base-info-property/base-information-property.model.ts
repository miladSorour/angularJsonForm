import { BaseEntity } from "../../model/baseEntity.model";

export class BaseInformationProperty extends BaseEntity<any> {
  constructor(
      public id?: number,
      public type?: any,
      public typeIndex?: number,
      public typeTitle?: string,
      public typePersianTitle?: string,
      public typePersianColor?: string,
      public baseInformationId?: number,
      public baseInformationTopic?: string,
      public title?: string,
      public isNullable?: number,
      public description?: string,
      public baseListHeaderId?: number,
      public baseListHeaderTopic?: string,
  ) {
    super();
  }
}
