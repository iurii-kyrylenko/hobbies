 import { Directive } from '@angular/core';
 import { Validator,  NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[validate-name][ngModel],[validate-name][formControl]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: UserNameValidator, multi: true }
    ]
})
export class UserNameValidator implements Validator {
    validate(c: AbstractControl) {

        const REGEXP = /^[A-Za-z][A-Za-z0-9]{4,}$/;

        if(!c.value) {
            return { message: 'Name is required' };
        }
 
        return REGEXP.test(c.value)
            ? null
            : { message: 'Name requires at least 5 letters or digits, does not contain spaces and begins with letter' };
    }
}
