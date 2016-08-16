import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http, Headers } from '@angular/http';
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
    @ViewChild('uploadForm') uploadForm: any;

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

    /*
     * TO DO: Implement as a separate component
     */
    uploadChange(event: any) {

        const files = event.target.files;
        if(!files.length) return;

        const apiUrl = this.config.apiUrl + '/books/upload';
        this.uploadRequest(apiUrl, files[0], this.auth.authHeader.headers)
            .then(() => {
                this.getBooks();
                this.ntfs.notifySuccess('Books have been uploaded :-)');
            }, () => {
                this.ntfs.notifyDanger('Something went wrong when uploading books :-(');
            });

        this.uploadForm.nativeElement.reset();
    }

    private uploadRequest(url: string, file: File, headers: Headers) {

        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append("upload", file, file.name);

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            }

            xhr.open("POST", url, true);
            headers.forEach((values, name, headers) => {
                xhr.setRequestHeader(name, values[0]);
            });
            xhr.send(formData);
        });
    }
}
