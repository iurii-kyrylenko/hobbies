import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { AuthService } from './auth.service';
import { LoginUser } from './user';

@Component({
    template: require('./login.component.html'),
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class LoginComponent implements OnInit {

    ctrlEmail: FormControl;
    ctrlPassword: FormControl;
    loginForm: FormGroup;

    ngOnInit() {
        this.ctrlEmail = new FormControl('', [Validators.required, Validators.minLength(5)]);
        this.ctrlPassword = new FormControl('', Validators.required);
        this.loginForm = new FormGroup({
            email: this.ctrlEmail,
            password: this.ctrlPassword
        });
    }

    constructor(private auth: AuthService) {}

    login() {
        const user = new LoginUser(this.ctrlEmail.value, this.ctrlPassword.value);
        this.auth.login(user, '/home');
    }
}
