 import { Directive } from '@angular/core';
 import { Validator,  NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[validate-email][ngModel],[validate-email][formControl]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true }
    ]
})
export class EmailValidator implements Validator {
    validate(c: AbstractControl) {

        const REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if(!c.value) {
            return { message: 'Email address is required' };
        }

        return REGEXP.test(c.value)
            ? null
            : { message: 'Invalid email address' };
    }
}
