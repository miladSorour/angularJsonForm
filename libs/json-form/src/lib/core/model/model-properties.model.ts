import { BaseEntity } from './baseEntity.model';
import {ModelProperty} from './model-property.model';


export class ModelProperties extends BaseEntity<string> {
    constructor(public properties?: ModelProperty[]) {
        super();
    }
}
