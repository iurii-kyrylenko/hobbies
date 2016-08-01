import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Book } from './book';
import { Http } from '@angular/http';
import { AppConfig } from '../config';
import { AuthService } from '../authentication/auth.service';

@Component({
    template: require('./book-form.template.html'),
    directives: [ROUTER_DIRECTIVES]
})
export class EditBookComponent implements OnInit, OnDestroy {

    book = new Book();
    header = 'Edit Book';
    sub: any;

    constructor(
        private route: ActivatedRoute,
        private config: AppConfig,
        private http: Http,
        private auth: AuthService
    ) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            const id = params['id'];
            const apiUrl = this.config.apiUrl + '/books/' + id;
            this.http.get(apiUrl, this.auth.authHeader)
                .map(res => res.json())
                .subscribe(book => this.book = book);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    submit() {
        console.log(this.book);
    }
}
