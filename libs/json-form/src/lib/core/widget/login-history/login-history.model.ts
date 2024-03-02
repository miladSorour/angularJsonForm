import {BaseEntity} from "../../model/baseEntity.model";

export class LoginHistory extends BaseEntity<any> {
    constructor(
        public id?: number,
        public userName?: string,
        public fullName?: string,
        public userId?: number,
        public status?: number,
        public type?: number,
        public browserType?: number,
        public browserName?: string,
        public operatingSystemType?: number,
        public operatingSystemName?: string,
        public loginFailureReason?: number,
        public logoutType?: number,
        public fromDate?: string,
        public toDate?: string,
        public userFirstName?: string,
        public userLastName?: string,
        public requestedIp?: string,
    ) {
        super();
    }
}
