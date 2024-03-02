import { BaseEntity } from "./baseEntity.model";


export class Role extends BaseEntity<number> {
    constructor(
        public title?: string,
        public organizationId?: number,
        public organizationName?: string,
        public organizationHierarchyCode?: string,
        public hierarchyCodeSet?: boolean,
        public groupId?: number,
        public groupName?: string,
        public groupHierarchyCode?: string,
        public classificationId?: number,
        public classificationTopic?: string,
        public unique?: boolean,
        public enable?: boolean
    ) {
        super();
    }
}
