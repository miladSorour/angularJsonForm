import {BaseEntity} from '../../../../core/model/baseEntity.model';


export class BaseInformationPropertyValue extends BaseEntity<any> {
  constructor(
      public id?: number,
      public fkId?: number | string,
      public baseInformationPropertyId?: number,
      public value?: string,
      public tableId?:number,

      /** use in frontend only (BaseInformationProperty fields) */
      public baseInformationPropertyType?: any,
      public baseInformationPropertyTitle?: string,
      public baseInformationHeaderId?: number,
      public baseInformationPropertyIsNullable?: number,
  ) {
    super();
  }
}
