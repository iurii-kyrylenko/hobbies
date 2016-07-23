import { Component } from '@angular/core';
import { NgForm }    from '@angular/forms';
import { AuthService } from './auth.service';
import { RegisterUser } from './user';
import { ReCaptchaComponent } from './recaptcha.component';
import { AppConfig } from '../config';

@Component({
    template: require('./register.component.html'),
    directives: [ReCaptchaComponent]
})
export class RegisterComponent {

    user = new RegisterUser();
    passwordConfirmation = '';

    constructor(
        private config: AppConfig,
        private auth: AuthService
    ) {}

    register() {
        this.auth.register(this.user, '/home');
    }

    getCaptchaResponse(res: string) {
        this.user.captchaResponse = res;
    }
}