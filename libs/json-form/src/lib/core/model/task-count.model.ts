export class TaskCount {
    constructor(
        public  assignedToUserCount?: number,
        public  assignedToGroupCount?: number,
        public  archiveCount?: number
    ) {
        this.assignedToUserCount = 0;
        this.assignedToGroupCount = 0;
        this.archiveCount = 0;
    }
}


