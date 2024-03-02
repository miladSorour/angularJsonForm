import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nationalCodeValidate(xv: any) {
    let result = false
    if (xv != null) {
        if (isNaN(xv)) {
            result= false
        } else if (xv == "") {
            result= false
        } else if (xv.length < 10) {
            result= true
        } else {
            let yy = 0;
            let yv = yy;
            for (let i = 0; i < xv.length; i++) {
                yv = +xv[i] * (xv.length - i);
                yy += yv;
            }
            const x = yy % 11;
            if (x === 0) {
                result= false
            } else {
                result= true
            }
            yy = 0;
        }
    }
    return result
}
