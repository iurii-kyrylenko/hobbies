import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

import '../../public/css/styles.css';

@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES, NavbarComponent ],
    template: `
        <my-navbar></my-navbar>
        <router-outlet></router-outlet>
    `
})

export class AppComponent {}
