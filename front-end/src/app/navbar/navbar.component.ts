import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-navbar',
    template: require('./navbar.component.html'),
    directives: [ROUTER_DIRECTIVES]

})
export class NavbarComponent {
    isLoggedIn = false;
}