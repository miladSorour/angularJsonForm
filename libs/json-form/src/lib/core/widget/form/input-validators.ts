import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { nationalCodeValidate } from "../../Util/util-validate";

export class InputValidators extends Validators {
    static nationalCode(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            const resultValidate=nationalCodeValidate(value)
            return resultValidate? { nationalCode: resultValidate }: null;
        }
    }
}