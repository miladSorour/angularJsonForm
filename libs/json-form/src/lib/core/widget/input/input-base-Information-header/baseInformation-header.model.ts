import {BaseEntity} from "../../../model/baseEntity.model";

export class BaseInformationHeader extends BaseEntity<number> {

    constructor(
        public  topic?: string,
        public  multiLevel?: boolean,
        public  systemId?: number,
        public  description ?: string,
    ) {
        super();
        this.id = -1;
        this.topic = '';
        this.multiLevel = true;
    }

}
