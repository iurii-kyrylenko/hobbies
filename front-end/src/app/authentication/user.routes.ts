import { RouterConfig } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { LoggedOutGuard } from './logged-out.guard';

export const userRoutes: RouterConfig = [
    { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [LoggedOutGuard] },
];
