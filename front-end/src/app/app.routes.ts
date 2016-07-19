import { provideRouter, RouterConfig } from '@angular/router';
import { Task1Component } from './task-1/task1.component';
import { Task2Component } from './task-2/task2.component';

export const routes: RouterConfig = [
    { path: '', redirectTo: '/task1', pathMatch: 'full' },
    { path: 'task1', component: Task1Component },
    { path: 'task2', component: Task2Component }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
