import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginUser } from './user';
import { EmailValidator } from '../validators/email.validator';
import { PasswordValidator } from '../validators/password.validator';

@Component({
    templateUrl: './login.component.html',
    directives: [EmailValidator, PasswordValidator]
})
export class LoginComponent {

    user = new LoginUser();

    constructor(private auth: AuthService) {}

    login() {
        this.auth.login(this.user, '/home');
    }
}
