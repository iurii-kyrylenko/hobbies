import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    template: `
        <h3>Login</h3>
        <button type="button" class="btn btn-default" (click)="login()">Log in</button>
    `
})
export class LoginComponent {

    constructor(private auth: AuthService) {}

    login() {
        this.auth.login();
    }
}