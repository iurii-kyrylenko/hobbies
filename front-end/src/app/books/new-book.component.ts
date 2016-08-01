import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Book } from './book';

@Component({
    template: require('./book-form.template.html'),
    directives: [ROUTER_DIRECTIVES]
})
export class NewBookComponent {

    book = new Book();
    header = 'New Book';

    submit() {
        console.log(this.book);
    }
}
