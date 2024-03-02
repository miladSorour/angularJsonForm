import {ModelProperty} from './model-property.model';
import {BaseEntity} from "../../../../../core/model/baseEntity.model";



export class ModelProperties extends BaseEntity<string> {
    constructor(public properties?: ModelProperty[]) {
        super();
    }
}
