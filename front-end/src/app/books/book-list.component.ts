import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfig } from '../config';
import { AuthService } from '../authentication/auth.service';

@Component({
    template: `
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title with-controls pull-left">Books</h4>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search">
                    <div class="input-group-btn">
                        <a class="btn btn-default" title="Apply Search Filter"><i class="glyphicon glyphicon-search"></i></a>
                        <a class="btn btn-default" title="Add Book"><i class="glyphicon glyphicon-plus-sign"></i></a>
                    </div>
                </div>
            </div>
            <ul class="list-group">
                <li *ngFor="let book of books | async" class="list-group-item">
                <div class="input-group">
                    <div class="valign">
                        {{book.completed | date:'yyyy-MM-dd'}}: [{{book.mode}}] {{book.title}} by {{book.author}}
                    </div>
                    <div class="input-group-btn">
                        <a class="btn btn-default" title="Edit Book"><i class="glyphicon glyphicon-pencil"></i></a>
                        <a class="btn btn-default"title="Remove Book"><i class="glyphicon glyphicon-remove"></i></a>
                    </div>
                </div>
                </li>
            </ul>
        </div>
    `
})
export class BookListComponent implements OnInit {

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
