import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from './movie';
import { Http } from '@angular/http';
import { AppConfig } from '../config';
import { AuthService } from '../authentication/auth.service';
import { NotificationService } from '../notifications/notification.service';

@Component({
    templateUrl: './movie-form.template.html'
})
export class EditMovieComponent implements OnInit, OnDestroy {

    movie = new Movie();
    header = 'Edit Movie';
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
            this.apiUrl = this.config.apiUrl + '/movies/' + id;
            this.http.get(this.apiUrl, this.auth.authHeader)
                .map(res => {
                    const movie = res.json();
                    movie.completed = new Date(movie.completed);
                    return movie;
                })
                .subscribe(movie => this.movie = movie);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    submit() {
        this.http
            .put(this.apiUrl, this.movie, this.auth.authHeader)
            .subscribe(res => {
                this.ntfs.notifySuccess('A movie has been modified :-)');
                this.router.navigate(['/movies']);
            }, err => {
                this.ntfs.notifyDanger('Something went wrong when modifying a movie :-(');
            });
    }
}
