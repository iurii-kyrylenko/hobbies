 import { Directive, forwardRef } from '@angular/core';
 import { Validator,  NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
    selector: '[validate-email][ngModel],[validat-email][formControl]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true }
    ]
})
export class EmailValidator implements Validator {
    validate(c: FormControl) {
        const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        return EMAIL_REGEXP.test(c.value) ? null : {
            invalidEmail: true
        };
    }
}
