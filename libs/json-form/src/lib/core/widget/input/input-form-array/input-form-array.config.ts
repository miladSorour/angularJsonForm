import { AppFormGroup } from "../../../model/app-form-group";
import { createFormGroup } from "../../../Util/util-crud";
import { AppFormConfig } from "../../form/app-form.config";

export class InputFormArrayConfig {

    private _appFormConfigs: AppFormConfig[] = []
    private _appFormConfig: AppFormConfig

    constructor(valueList: any[], appFormConfig: AppFormConfig) {
        this._appFormConfig = appFormConfig
        valueList.forEach((item, index) => {
            this._appFormConfigs.push(Object.create(this._appFormConfig))
            this._appFormConfigs[index].formGroup = new AppFormGroup({})
            this._appFormConfigs[index].formGroup = createFormGroup(this._appFormConfigs[index].formControl, this._appFormConfigs[index].formGroup)
            Object.keys(item).forEach(key => {
                this._appFormConfigs[index].formGroup.patchValueOnField(key, item[key])
            })
        })
    }

    set appFormConfigs(appFormConfigs) {
        this._appFormConfigs = appFormConfigs
    }

    get appFormConfigs() {
        return this._appFormConfigs
    }

    get configListValue() {
        const value = this._appFormConfigs.map(formConfig => {
            return formConfig.formGroup.value
        })
        return value
    }

    add() {
        this._appFormConfigs.push(Object.create(this._appFormConfig))
        const rear = this.appFormConfigs.length - 1
        this._appFormConfigs[rear].formGroup = new AppFormGroup({})
        this._appFormConfigs[rear].formGroup = createFormGroup(this._appFormConfigs[rear].formControl, this._appFormConfigs[rear].formGroup)
    }

    removeByIndex(index: number) {
        const result = this._appFormConfigs[index]
        this.appFormConfigs.splice(index, 1)
        return result
    }

    removeByItem(formConfig: AppFormConfig) {
        this._appFormConfigs = this._appFormConfigs.filter(item => item !== formConfig)
        return formConfig
    }

    get length() {
        return this._appFormConfigs.length
    }
}