import { Routes } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { MovieListComponent } from './movie-list.component';
import { NewMovieComponent } from './new-movie.component';
import { EditMovieComponent } from './edit-movie.component';
import { LoggedInGuard } from '../authentication/logged-in.guard';

export const moviesRoutes: Routes = [{
    path: 'movies',
    component: MoviesComponent,
    children: [
        { path: '', component: MovieListComponent },
        { path: 'new', component: NewMovieComponent },
        { path: ':id', component: EditMovieComponent }
    ],
    canActivate: [LoggedInGuard]
}];
