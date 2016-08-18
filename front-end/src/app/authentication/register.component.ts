import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { RegisterUser } from './user';
import { AppConfig } from '../config';

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent {

    user = new RegisterUser();
    passwordConfirmation = '';

    constructor(
        private config: AppConfig,
        private auth: AuthService
    ) {}

    register() {
        this.auth.register(this.user, '/home', this.reset.bind(this));
    }

    getCaptchaResponse(res: string) {
        this.user.captchaResponse = res;
    }

    reset() {
        window['grecaptcha'].reset();
        this.user.captchaResponse = '';
    }
}