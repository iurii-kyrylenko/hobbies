 import { Directive } from '@angular/core';
 import { Validator,  NG_VALIDATORS, FormGroup } from '@angular/forms';

@Directive({
    selector: '[validate-confirmation][ngModelGroup]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: ConfirmationValidator, multi: true }
    ]
})
export class ConfirmationValidator implements Validator {

    validate(fg: FormGroup): {[key: string]: any} {

        const keys = Object.keys(fg.controls);
        if(keys.length !== 2) return null;
        const v1 = fg.controls[keys[0]].value;
        const v2 = fg.controls[keys[1]].value;
        if(!v1 || !v2 || v1 === v2) return null;
        return { message: 'Password mismatch' };
    }
}
