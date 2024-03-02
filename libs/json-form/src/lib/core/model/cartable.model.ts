import { BaseEntity } from "./baseEntity.model";


export class Cartable extends BaseEntity<string> {
    constructor(name?: string,
                assignee?: string,
                formKey?: string,
                processInstanceId?: string) {
        super();

    }


}
