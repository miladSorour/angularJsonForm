import {AppBaseJsonFormModel} from "../../json-form/model/app-base-json-form.model";
import {ActionItemConfig} from "../table/cv-table-widget/action-item-config";

export class AppDigitalArchiveCardConfig extends AppBaseJsonFormModel {

  personnelId   ?: number;
  deleted       ?: boolean;
  hierarchyCode ?: string;
  actions  : ActionItemConfig  [] = [];
}
