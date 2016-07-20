import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Component({
    selector: 'my-navbar',
    template: require('./navbar.component.html'),
    directives: [ROUTER_DIRECTIVES]

})
export class NavbarComponent {

    constructor(public auth: AuthService) {}

    logout() {
        this.auth.logout();
    }
}