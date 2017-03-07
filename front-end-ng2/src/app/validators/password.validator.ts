 import { Directive } from '@angular/core';
 import { Validator,  NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[validate-password][ngModel],[validate-password][formControl]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: PasswordValidator, multi: true }
    ]
})
export class PasswordValidator implements Validator {
    validate(c: AbstractControl) {

        const REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{8,}$/;

        if(!c.value) {
            return { message: 'Password is required' };
        }
 
        return REGEXP.test(c.value)
            ? null
            : { message: 'Password requires at least 8 characters without spaces, one number, one lowercase and one uppercase letter' };
    }
}
