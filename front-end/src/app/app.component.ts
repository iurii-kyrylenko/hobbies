import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NotifierComponent } from './notifications/notifier.component';

import '../../public/css/styles.css';

@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES, NavbarComponent, NotifierComponent],
    template: `
        <my-navbar></my-navbar>
        <my-notifier></my-notifier>
        <router-outlet></router-outlet>
    `
})

export class AppComponent {}
