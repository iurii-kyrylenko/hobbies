import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Book } from './book';
import { AppConfig } from '../config';
import { AuthService } from '../authentication/auth.service';
import { ModalComponent } from '../customization/modal.component';
import { NotificationService } from '../notifications/notification.service';
import { BookStateService } from './books-state.service';

@Component({
    template: require('./book-list.component.html'),
    directives: [ROUTER_DIRECTIVES, ModalComponent]
})
export class BookListComponent implements OnInit {

    books: Observable<Book[]>;

    @ViewChild('deleteConfirm') deleteConfirm: ModalComponent;

    constructor(
        private http: Http,
        private config: AppConfig,
        private auth: AuthService,
        private ntfs: NotificationService,
        private state: BookStateService
    ) {}

    ngOnInit() {
        this.getBooks();
    }

    getBooks() {
        const url = this.config.apiUrl + '/books';
        const requestOptions = Object.assign(
            {}, this.auth.authHeader, this.state.searchParams
        );
        this.books = this.http.get(url, requestOptions)
        .map(res => {
            const books = res.json();
            books.forEach((book: any) => book.completed = new Date(book.completed));
            return books;
        });
    }

    removeConfirm(book: Book) {
        this.deleteConfirm.open(book.title).subscribe(isConfirmed => {
            if(isConfirmed) this.removeBook(book);
         });
    }

    removeBook(book: Book) {
        const apiUrl = this.config.apiUrl + '/books/' + book._id;
        this.http
            .delete(apiUrl, this.auth.authHeader)
            .subscribe(res => {
                this.getBooks();
                this.ntfs.notifySuccess('A book has been removed :-)');
            }, err => {
                this.ntfs.notifyDanger('Something went wrong when removing a book :-(');
            });
    }

    applySearch(term: string) {
        this.state.searchFilter = term;
        this.getBooks();
    }

    /*
     * Date pipe doesn't work in Safari.
     * TO DO: Move to a service.
     */
    formatDate(date: Date) {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        if(!date) return null;
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        return `${months[month]} ${day}, ${year}`;
    }
}
