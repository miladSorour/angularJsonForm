import {BaseEntity} from "../../model/baseEntity.model";

export class Attachment extends BaseEntity<number> {
  id                    ?: number;
  objectId              ?: string;
  classificationObject  ?: string;
  fileCode              ?: string;
  fileName              ?: string;
  fileTypeId            ?: number;
  fileTypeTopic         ?: string;
  description           ?: string;
}
