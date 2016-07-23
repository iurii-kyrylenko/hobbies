import { Component } from '@angular/core';
import { NgForm }    from '@angular/forms';
import { AuthService } from './auth.service';
import { LoginUser } from './user';

@Component({
    template: require('./login.component.html')
})
export class LoginComponent {

    user = new LoginUser();

    constructor(private auth: AuthService) {}

    login() {
        this.auth.login(this.user, '/home');
    }
}
