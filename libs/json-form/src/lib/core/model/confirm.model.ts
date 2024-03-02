import { AppEnumModel } from "../widget/input/input-enum/app-enum.model";

export class Confirm {
  constructor(
    public expertOpinionEnum?: AppEnumModel,
    public expertOpinion?: number,
    public processInstanceId?: string,
    public modelId?: string,
    public description?: string,
    public score?: number,
    public taskId?: string) {
    this.expertOpinion = 1;
    this.score = 5;
  }

}
