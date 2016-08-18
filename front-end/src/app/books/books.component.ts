import { Component } from '@angular/core';
import { BookStateService } from './books-state.service';

@Component({
    template: `
        <router-outlet></router-outlet>
    `,
    providers: [BookStateService]
})
export class BooksComponent {}
