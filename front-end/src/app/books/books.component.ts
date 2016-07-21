import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfig } from '../config';
import { AuthService } from '../authentication/auth.service';

@Component({
    template: `
        <h3>Books</h3>
        <pre class="well">{{books | async | json}}</pre>
    `
})
export class BooksComponent implements OnInit {

    books: any;

    constructor(
        private http: Http,
        private config: AppConfig,
        private auth: AuthService
    ) {}

    ngOnInit() {
        const url = this.config.apiUrl + '/books';
        this.books = this.http.get(url, this.auth.authHeader)
        .delay(1000)
        .map(res => res.json());
    }
}
