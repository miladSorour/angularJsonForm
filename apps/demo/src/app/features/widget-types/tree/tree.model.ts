import { BaseEntity, AppEnumModel } from "@pnrng/json-form";

export class TreeModel extends BaseEntity<number> {

    constructor(public title?:             string,
                public code?:               string,
                public description?:        string,
                public hierarchyCode?:      string,
                public parentId?:           number,
                public parentTitle?:        string,
                public fullName?:           string,
                public type?:               AppEnumModel,
                public typePersianTitle?:   string,
                public latitude?:           string,
                public longitude?:          string
    ){
        super();
    }
}
