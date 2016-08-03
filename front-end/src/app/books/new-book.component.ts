import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
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
export class NewBookComponent {

    book = new Book();
    header = 'New Book';

    constructor(
        private config: AppConfig,
        private http: Http,
        private auth: AuthService,
        private ntfs: NotificationService,
        private router: Router
    ) {}

    submit() {
        console.log(this.book);
        const apiUrl = this.config.apiUrl + '/books';
        this.http
            .post(apiUrl, this.book, this.auth.authHeader)
            .subscribe(res => {
                this.ntfs.notifySuccess('New book has been added :-)');
                this.router.navigate(['/books']);
            }, err => {
                this.ntfs.notifySuccess('Something went wrong when adding new book :-(');
            });
    }
}
