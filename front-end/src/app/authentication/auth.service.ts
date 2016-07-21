import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AuthUser } from './user';
import { AppConfig } from '../config';

@Injectable()
export class AuthService {

    constructor(
        private http: Http,
        private router: Router,
        private config: AppConfig
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

    login(email: string, password: string, redirectUrl: string) {
        const url = this.config.apiUrl + '/users/login';
        this.http.post(url, { email, password })
        .delay(1000) // !!! remove !!!
        .map(res => res.json().token)
        .subscribe(token => {
            this.saveToken(token);
            this.router.navigate([redirectUrl]);
        });
    }

    register(name: string, email: string, password: string, redirectUrl: string) {
        const url = this.config.apiUrl + '/users/register';
        this.http.post(url, { name, email, password })
        .delay(1000) // !!! remove !!!
        .map(res => res.json().token)
        .subscribe(token => {
            this.saveToken(token);
            this.router.navigate([redirectUrl]);
        });
    }

    logout() {
        this.removeToken();
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
