import { BaseEntity } from "../../../model/baseEntity.model";


export class ModelProperty extends BaseEntity<string> {
    constructor(public name?: string,
                public value?: string) {
        super();
    }
}
