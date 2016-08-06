import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

const DATE_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateInputComponent),
    multi: true
};

@Component({
    selector: 'my-date-input',
    template: `
        <label for="completed">
            Completed on
            <span class="label label-default">{{formatDate()}}</span>
        </label>
        <input [(ngModel)]="value" placeholder="Free date format" class="form-control">
    `,
    providers: [DATE_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DateInputComponent implements ControlValueAccessor {
    private innerValue = '';
    private bindValue: Date;

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    get value(): any {
        return this.innerValue;
    };

    set value(v: any) {
        if (v === this.innerValue) return;
        this.innerValue = v;
        const test = new Date(v);
        this.bindValue = test.toJSON() ? test : null;
        this.onChangeCallback(this.bindValue);
    }

    writeValue(value: any) {
        if (!value) return;
        this.bindValue = value;
        this.innerValue = this.formatDate();
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    /*
    * TO DO: Move to a service.
    */
    formatDate() {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        if(!this.bindValue) return null;
        const year = this.bindValue.getFullYear();
        const month = this.bindValue.getMonth();
        const day = this.bindValue.getDate();
        return `${months[month]} ${day}, ${year}`;
    }
}