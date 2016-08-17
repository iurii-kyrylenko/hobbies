import { Routes } from '@angular/router';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { userRoutes } from './authentication/user.routes';
import { booksRoutes } from './books/books.routes';
import { moviesRoutes } from './movies/movies.routes';
import { LoggedInGuard } from './authentication/logged-in.guard';
import { LoggedOutGuard } from './authentication/logged-out.guard';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    ... userRoutes,
    ... booksRoutes,
    ... moviesRoutes,
    { path: '**', redirectTo: '/home' },
];

export const appRoutingProviders: any[] = [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    LoggedInGuard,
    LoggedOutGuard
];
