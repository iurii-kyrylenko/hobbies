import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AuthUser, LoginUser, RegisterUser } from './user';
import { AppConfig } from '../config';
import { NotificationService } from '../notifications/notification.service';
import { Notification } from '../notifications/notification';

@Injectable()
export class AuthService {

    constructor(
        private http: Http,
        private router: Router,
        private config: AppConfig,
        private ntfs: NotificationService
    ) {}

    get isLoggedIn() {
        const token = this.getToken();
        if(!token) {
            return false;
        }
        let payload = token.split('.')[1];
        payload = JSON.parse(atob(payload));
        return payload.exp > (Date.now() / 1000);
    }

    get currentUser(): AuthUser {
        if(!this.isLoggedIn) {
            return null;
        }
        const token = this.getToken();
        let payload = token.split('.')[1];
        payload = JSON.parse(atob(payload));
        return new AuthUser(payload.name, payload.email);
    }

    get authHeader() {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.getToken());
        return { headers };
    }

    login(user: LoginUser, redirectUrl: string) {
        const url = this.config.apiUrl + '/users/login';
        this.http.post(url, user)
        .map(res => res.json().token)
        .subscribe(
            token => {
                this.saveToken(token);
                this.router.navigate([redirectUrl]);
                this.ntfs.notifyInfo('You have been looged in');
            },
            err => this.ntfs.notifyWarning('You have failed to log in. Try again with another credentials.')
        );
    }

    register(user: RegisterUser, redirectUrl: string, reset: () => void) {
        const url = this.config.apiUrl + '/users/register';
        this.http.post(url, user)
        .map(res => res.json().token)
        .subscribe(
            token => {
                this.saveToken(token);
                this.router.navigate([redirectUrl]);
                this.ntfs.notifyInfo('You have been registered and logged in.');
            },
            err => {
                reset();
                this.ntfs.notifyWarning('You have failed to register. Try again with another email address.')
            }
        );
    }

    logout() {
        this.removeToken();
        this.ntfs.notifyInfo('You have been logged out.');
    }

    private saveToken(token: any) {
        localStorage['jwt'] = token;
    }

    private getToken() {
        return localStorage['jwt'];
    }

    private removeToken() {
        localStorage.removeItem('jwt');
    }
}
