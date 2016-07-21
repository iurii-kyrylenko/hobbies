import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    template: `
        <h3>Login</h3>
        <button type="button" class="btn btn-default" (click)="login()">Log in</button>
        <button type="button" class="btn btn-default" (click)="register()">Register</button>
    `
})
export class LoginComponent {

    constructor(private auth: AuthService) {}

    login() {
        this.auth.login('user1@gmail.com', '123', '/home');
    }

    register() {
        this.auth.register('user3', 'user3@gmail.com', '123', '/home');
    }

}