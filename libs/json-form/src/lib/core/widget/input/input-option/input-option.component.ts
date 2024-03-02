import {Component, OnChanges, OnInit, Optional, Self, SimpleChanges} from "@angular/core";
import {AppBaseInputModel} from "../app-base-input.model";
import {AppInputBaseConfig} from "../app-input-base-config";
import {InputOptionService} from "./input-option.service";
import {AppFormConfig} from "../../form/app-form.config";
import {NgControl} from "@angular/forms";
import {QueryResult} from "../../../model/queryResult.model";
import {InputOptionListModel} from "./input-option-list.model";

@Component({
  selector: 'app-input-option',
  templateUrl: 'input-option.component.html'
})
export class InputOptionComponent extends AppBaseInputModel<AppInputBaseConfig> implements OnChanges {

  optionList: InputOptionListModel [] = [];

constructor(
  @Optional() @Self() public control: NgControl,
  private inputOptionService: InputOptionService,) {
  super();
}


// eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
  ngOnChanges(changes: SimpleChanges): void {

    let appFormConfig: AppFormConfig = changes.appFormConfig.currentValue;
    let control = this.findCurrentFormControl(appFormConfig, this.control);
    // @ts-ignore
    if (control.url) {
      // @ts-ignore
      console.log(control.url);
      // @ts-ignore
      console.log(control.idColumnName);
      // @ts-ignore
      console.log(control.topicColumnName);
      // @ts-ignore
      this.inputOptionService.getOptionWithPagination(control.url).subscribe((res: QueryResult) => {
        console.log("res", res.entityList)
        this.optionList = [];
        if (res.entityList) {
          res.entityList.forEach((value: any) => {
            let option = new InputOptionListModel();
            // @ts-ignore
            option.id = value[control.idColumnName]
            // @ts-ignore
            option.topic = value[control.topicColumnName]
            this.optionList.push(option);
          })
          console.log("this.optionList", this.optionList)
        }
      })
    } else {
      this.optionList = [];
      this.control.value.forEach((i:any)=> {
        let option = new InputOptionListModel();
        // @ts-ignore
        option.id = i[control.idColumnName]
        // @ts-ignore
        option.topic = i[control.topicColumnName]
        this.optionList.push(option);
      })
    }
  }
}

