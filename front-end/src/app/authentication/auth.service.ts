import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthUser } from './user';

@Injectable()
export class AuthService {

    constructor(
        private http: Http,
        private router: Router
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

    /********
     * TO DO:
     * 1. Remove delay.
     * 2. Pass user login as parameters.
     * 3. Pass redirect URL as parameter.
     ********/
    login() {
        this.http.post('http://localhost:3000/api/users/login', {
            email: 'user1@gmail.com', password: '123'
        })
        .delay(2000)
        .map(res => res.json().token)
        .subscribe(token => {
            this.saveToken(token);
            this.router.navigate(['/home']);
        });
    }

    /********
     * TO DO:
     ********/
    register() {
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
