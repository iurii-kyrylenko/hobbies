import { Component } from '@angular/core';
import{ Http } from '@angular/http';

@Component({
    template: `
        <h3>Task-1</h3>
        <button type="button" class="btn btn-default" (click)="login()">Log in</button>
    `
})
export class Task1Component {
    constructor(private http: Http) {}

    getBooks() {
        this.http.get('http://localhost:3000/api/books').subscribe((res) => {
            console.log(res);
        });
    }

    login() {
        this.http.post('http://localhost:3000/api/users/login', {
            email: 'user1@gmail.com', password: '123'
        }).subscribe((res) => {
            console.log(res);
        });
    }
}
