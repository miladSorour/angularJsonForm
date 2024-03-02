import { BaseEntity } from "./baseEntity.model";


export class BaseInformation extends BaseEntity<number> {

  constructor(
    public  id?: number,
    public  topic?: string,
    public  secondTopic?: string,
    public  masterInformationId?: number,
    public  masterInformationTopic?: string,
    public  parentId?: number,
    public  parentTopic?: string,
    public  description?: string,
    public  code?: string,
    public  weight?:number,
    public  active?: boolean,
    public  fullTopic?: string,
    public  hierarchyCode?: string,
    public  color?: string,
    // public attributes?: BaseInformationAttribute[]
  ) {
    super();
    // this.id = -1;
    // this.masterInformationId = -1;
    // this.parentId = -1;
    // this.active = true;
  }
}
