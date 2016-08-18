import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from './book';
import { Http } from '@angular/http';
import { AppConfig } from '../config';
import { AuthService } from '../authentication/auth.service';
import { DateInputComponent } from '../customization/date-input.component';
import { NotificationService } from '../notifications/notification.service';

@Component({
    templateUrl: './book-form.template.html',
    directives: [DateInputComponent]
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
        const apiUrl = this.config.apiUrl + '/books';
        this.http
            .post(apiUrl, this.book, this.auth.authHeader)
            .subscribe(res => {
                this.ntfs.notifySuccess('New book has been added :-)');
                this.router.navigate(['/books']);
            }, err => {
                this.ntfs.notifyDanger('Something went wrong when adding new book :-(');
            });
    }
}
