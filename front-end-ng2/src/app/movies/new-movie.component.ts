import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from './movie';
import { Http } from '@angular/http';
import { AppConfig } from '../config';
import { AuthService } from '../authentication/auth.service';
import { NotificationService } from '../notifications/notification.service';

@Component({
    templateUrl: './movie-form.template.html'
})
export class NewMovieComponent {

    movie = new Movie();
    header = 'New Movie';

    constructor(
        private config: AppConfig,
        private http: Http,
        private auth: AuthService,
        private ntfs: NotificationService,
        private router: Router
    ) {}

    submit() {
        const apiUrl = this.config.apiUrl + '/movies';
        this.http
            .post(apiUrl, this.movie, this.auth.authHeader)
            .subscribe(res => {
                this.ntfs.notifySuccess('New movie has been added :-)');
                this.router.navigate(['/movies']);
            }, err => {
                this.ntfs.notifyDanger('Something went wrong when adding new movie :-(');
            });
    }
}
