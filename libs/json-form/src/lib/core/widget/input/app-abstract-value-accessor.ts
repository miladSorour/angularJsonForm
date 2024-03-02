import {forwardRef, Output, EventEmitter, Injectable, ChangeDetectorRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Injectable()
export abstract class AppAbstractValueAccessor implements ControlValueAccessor {
    @Output() changeEmitter = new EventEmitter<any>();

    _value: any = '';
    get value(): any {
        return this._value;
    };

    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
            this.changeEmitter.emit(v);
        }
    }

    writeValue(value: any) {
        this._value = value;
        this.onChange(value);
        this.changeEmitter.emit(value);
    }

    onChange = (_: any) => {};
    onTouched = () => {};

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
}

export function MakeProvider(type: any) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    };
}
