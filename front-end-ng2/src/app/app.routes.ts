import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoggedInGuard } from './authentication/logged-in.guard';
import { LoggedOutGuard } from './authentication/logged-out.guard';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: '/home' },
];

export const appRoutingProviders: any[] = [
    LoggedInGuard,
    LoggedOutGuard
];
