import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
import { Book } from './book';
import { Http } from '@angular/http';
import { AppConfig } from '../config';
import { AuthService } from '../authentication/auth.service';
import { DateInputComponent } from '../customization/date-input.component';
import { NotificationService } from '../notifications/notification.service';

@Component({
    template: require('./book-form.template.html'),
    directives: [ROUTER_DIRECTIVES, DateInputComponent]
})
export class EditBookComponent implements OnInit, OnDestroy {

    book = new Book();
    header = 'Edit Book';
    sub: any;
    apiUrl: string;

    constructor(
        private route: ActivatedRoute,
        private config: AppConfig,
        private http: Http,
        private auth: AuthService,
        private ntfs: NotificationService,
        private router: Router
    ) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            const id = params['id'];
            this.apiUrl = this.config.apiUrl + '/books/' + id;
            this.http.get(this.apiUrl, this.auth.authHeader)
                .map(res => {
                    const book = res.json();
                    book.completed = new Date(book.completed);
                    return book;
                })
                .subscribe(book => this.book = book);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    submit() {
        this.http
            .put(this.apiUrl, this.book, this.auth.authHeader)
            .subscribe(res => {
                this.ntfs.notifySuccess('A book has been modified :-)');
                this.router.navigate(['/books']);
            }, err => {
                this.ntfs.notifyDanger('Something went wrong when modifying a book :-(');
            });
    }
}
