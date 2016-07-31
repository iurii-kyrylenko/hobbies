import { RouterConfig } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { MovieListComponent } from './movie-list.component';
import { LoggedInGuard } from '../authentication/logged-in.guard';

export const moviesRoutes: RouterConfig = [{
    path: 'movies',
    component: MoviesComponent,
    children: [
        { path: '', component: MovieListComponent }
    ],
    canActivate: [LoggedInGuard]
}];
