import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { BookStateService } from './books-state.service';

@Component({
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [BookStateService]
})
export class BooksComponent {}
