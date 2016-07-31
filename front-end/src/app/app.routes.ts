import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { userRoutes } from './authentication/user.routes';
import { booksRoutes } from './books/books.routes';
import { moviesRoutes } from './movies/movies.routes';
import { AuthService } from './authentication/auth.service';
import { LoggedInGuard } from './authentication/logged-in.guard';
import { LoggedOutGuard } from './authentication/logged-out.guard';

export const routes: RouterConfig = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    ... userRoutes,
    ... booksRoutes,
    ... moviesRoutes,
    { path: '**', redirectTo: '/home' },
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    AuthService,
    LoggedInGuard,
    LoggedOutGuard
];
