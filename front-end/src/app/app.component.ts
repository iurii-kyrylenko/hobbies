import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Task1Component } from './task-1/task1.component';
import { Task2Component } from './task-2/task2.component';

import '../../public/css/styles.css';

@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    styles: [require('./app.component.css')],
    directives: [ROUTER_DIRECTIVES]
})

export class AppComponent { }
