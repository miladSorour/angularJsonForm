// @ts-nocheck
import {AfterViewInit, Component, Injector} from '@angular/core';
import {MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {TranslateService} from '@ngx-translate/core';
import {AppErrorModel} from './app-error.model';

@Component({
	selector: '[app-mat-error]',
	template: '{{ error }}'
})
export class AppErrorComponent implements AfterViewInit {

	public error = '';
	private inputRef: MatFormFieldControl<MatInput>;

	constructor(
		private injector: Injector,
		private translate: TranslateService) {
	}

	public ngAfterViewInit() {
		// grab reference to MatFormField directive, where form control is accessible.
		const container = this.injector.get(MatFormField);
		this.inputRef = container._control;
		// sub to the control's status stream
		this.inputRef.ngControl.statusChanges.subscribe(this.updateErrors);
		if (this.inputRef.ngControl.status === 'INVALID') {
			return this.updateErrors('INVALID');
		}
	}

	getMessage(type: string, params: {}) {
		const cvErrorModel = new AppErrorModel();
		if (params) {
			const errorList = Object.getOwnPropertyNames(params);
			for (let i = 0; i < errorList.length; i++) {
				Object.getOwnPropertyNames(params[errorList[i]]).forEach(param => {
						cvErrorModel[param] = params[errorList[i]][param];
					}
				);
			}
		}
		// TODO return multi error message
		return this.translate.instant('AUTH.VALIDATION.' + type.toUpperCase(), cvErrorModel);
	}

	private updateErrors = (state: 'VALID' | 'INVALID') => {
		if (state === 'INVALID') {
			// active errors on the FormControl
			const controlErrors = this.inputRef.ngControl.errors;
			// just grab one error
			const firstError = Object.keys(controlErrors)[0];
			this.error = this.getMessage(firstError, controlErrors);
		}
	}
}
