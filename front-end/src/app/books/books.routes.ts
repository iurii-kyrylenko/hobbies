import { RouterConfig } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookListComponent } from './book-list.component';
import { LoggedInGuard } from '../authentication/logged-in.guard';

export const booksRoutes: RouterConfig = [{
    path: 'books',
    component: BooksComponent,
    children: [
        { path: '', component: BookListComponent }
    ],
    canActivate: [LoggedInGuard]
}];
