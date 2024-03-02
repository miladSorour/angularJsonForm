import {BaseEntity} from "../../model/baseEntity.model";


export class DigitalArchiveModel extends BaseEntity<number>  {
    searchValue: any;
    classificationTopic: any;
    registrarPersonnelFullName: any;



    constructor(
        public  fileCode?:           string,
        public  thumbnailCode?:      string,
        public  fileTitle?:          string,
        public  description?:        string,
        public  fullName?:           string,
        public  personnelId?:        number,
        public  nationalNumber?:     string,
        public  personnelCode?:      string,
        public  fileName?:           string,
        public  fileType?:           string,
        public  createdByUser?:       string,
        public  organizationName?:    string,
        public attachment?: object,
        public docTypeId?:number,
        public docTypeTopic?:string,
        public hierarchyCode?:string,
        public docIndex?: number,
        public organization?: number,
        public organizationID?: number,
        public classificationID?: number,
        public noparvandeh?: number,
        public noparvandehColor?: string,
        public samadImportHistoryId?: number,
        public deleted?: boolean,
        public confirmDigitalArchiveDate?: Boolean,
        public creatorUserCode?: string,
        public creatorOrganizationId?: number,
        public creatorOrganizationName?: string,

    ) {
        super();

    }

}
