import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { booksRoutes } from './books.routes';
import { BooksComponent } from './books.component';
import { BookListComponent } from './book-list.component';
import { EditBookComponent } from './edit-book.component';
import { NewBookComponent } from './new-book.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(booksRoutes)
    ],
    declarations: [
        BooksComponent,
        BookListComponent,
        EditBookComponent,
        NewBookComponent
    ]
})
export class BooksModule {}
