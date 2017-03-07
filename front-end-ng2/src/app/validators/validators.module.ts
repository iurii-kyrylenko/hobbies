import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNameValidator } from './username.validator';
import { EmailValidator } from './email.validator';
import { PasswordValidator } from './password.validator';
import { ConfirmationValidator } from './confirmation.validator';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        UserNameValidator,
        EmailValidator,
        PasswordValidator,
        ConfirmationValidator
    ],
    exports: [
        UserNameValidator,
        EmailValidator,
        PasswordValidator,
        ConfirmationValidator
    ]
})
export class ValidatorsModule {}
