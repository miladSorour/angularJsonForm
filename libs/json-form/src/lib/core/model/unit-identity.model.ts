import { BaseEntity } from "./baseEntity.model";


export class UnitIdentity extends BaseEntity<any>{
    constructor(
                public id?: number,
                public parentId?: number,
                public title?: string,
                public definition?: string,
                public sample?: string,
                public hierarchyCode?: string,
                public children?: UnitIdentity[],
    ) {
        super();
    }
}
