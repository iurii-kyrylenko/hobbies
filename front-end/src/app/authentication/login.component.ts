import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    template: `
        <h3>Login</h3>
        <button type="button" class="btn btn-default" (click)="login()">Log in</button>
    `
})
export class LoginComponent {

    constructor(private http: Http) {}

    login() {
        this.http.post('http://localhost:3000/api/users/login', {
            email: 'user1@gmail.com', password: '123'
        }).subscribe((res) => {
            console.log(res);
        });
    }
}