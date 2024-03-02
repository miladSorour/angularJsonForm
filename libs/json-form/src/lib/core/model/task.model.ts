import { AppEnumModel } from "../widget/input/input-enum/app-enum.model";
import { BaseEntity } from "./baseEntity.model";

export class Task extends BaseEntity<string> {
  constructor(public name?: string,
              public description?: string,
              public taskDefinitionKey?: string,
              public priority?: number,
              public owner?: string,
              public assignee?: string,
              public processInstanceId?: string,
              public executionId?: string,
              public processDefinitionKey?: string,
              public createTime?: string,
              public dueDate?: string,
              public endTime?: string,
              public parentTaskId?: string,
              public suspended?: boolean,
              public formKey?: string,
              public detailFormKey?: string,
              public processKey?: string,
              public processDetail?: string,
              public modelId?: string,
              public processName?: string,
              public userImageCode?: string,
              public modelDetail?: string,
              public taskLocalVariables?: Map<string, object>,
              public processVariables?: Map<string, object>,
              public cartableType?: number,
              public fromDate?: string,
              public toDate?: string,
              public detail?: string,
              public processDefinitionKeyEnum?: AppEnumModel|null,
  ) {
    super();
    this.cartableType = 0;
  }
}
