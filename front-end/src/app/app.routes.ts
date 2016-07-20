import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login.component';
import { BooksComponent } from './books/books.component';
import { MoviesComponent } from './movies/movies.component';

export const routes: RouterConfig = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'books', component: BooksComponent },
    { path: 'movies', component: MoviesComponent },
    { path: '**', redirectTo: '/home' },
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
