import { Component } from '@angular/core';
import '../../public/css/styles.css';

@Component({
    selector: 'my-app',
    template: `
        <my-navbar></my-navbar>
        <my-notifier></my-notifier>
        <router-outlet></router-outlet>
    `
})

export class AppComponent {}
