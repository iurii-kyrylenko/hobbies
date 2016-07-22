import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    template: `
        <h3>Register</h3>
        <button type="button" class="btn btn-default" (click)="register()">Register</button>
    `
})
export class RegisterComponent {

    constructor(private auth: AuthService) {}

    register() {
        this.auth.register('user3', 'user3@gmail.com', '123', '/home');
    }

}