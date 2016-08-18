import { Component } from '@angular/core';
import { AuthService } from '../authentication/auth.service';

@Component({
    selector: 'my-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {

    constructor(public auth: AuthService) {}

    logout() {
        this.auth.logout();
    }
}