
export abstract class BaseEntity<T> {
    constructor(
        public id?: T,
        public ip?: string,
        public version?: number,
        public createdDate?: string,
        public updatedDate?: string,
    ) {
    }
}
