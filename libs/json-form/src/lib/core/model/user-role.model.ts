import { BaseEntity } from "./baseEntity.model";


export class UserRole extends  BaseEntity<number> {
    constructor(
        public roleId?:         number,
        public roleTitle?:      string,
        public userId?:         number,
        public username?:   string,
        public isCurrent?:      boolean,
        public groupId?:        number,
        public groupName?:      string,
        public isDeleted?:      boolean,
        public organizationId?: number,
    ) {
        super();
        this.roleTitle = '';
    }
}
