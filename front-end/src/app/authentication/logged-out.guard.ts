import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoggedOutGuard implements CanActivate {

    constructor(private auth: AuthService) {}

    canActivate() {
        return !this.auth.isLoggedIn;
    }
}
