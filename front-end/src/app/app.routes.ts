import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login.component';
import { BooksComponent } from './books/books.component';
import { MoviesComponent } from './movies/movies.component';
import { AuthService } from './authentication/auth.service';
import { LoggedInGuard } from './authentication/logged-in.guard';
import { LoggedOutGuard } from './authentication/logged-out.guard';

export const routes: RouterConfig = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
    { path: 'books', component: BooksComponent, canActivate: [LoggedInGuard] },
    { path: 'movies', component: MoviesComponent, canActivate: [LoggedInGuard] },
    { path: '**', redirectTo: '/home' },
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    AuthService,
    LoggedInGuard,
    LoggedOutGuard
];
