import { BaseEntity } from "./baseEntity.model";


export class TaskTimeLine extends BaseEntity<string> {
    constructor(
        public  name?: string,
        public  username?: string,
        public  userImageCode?: string,
        public  assignee?: string,
        public  startTime?: string,
        public  dueDate?: string,
        public  endTime?: string,
        public  confirmed?: boolean,
        public  description?: string,
    ) {
        super();
    }
}
