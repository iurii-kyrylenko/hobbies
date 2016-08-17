import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { appRoutes, appRoutingProviders } from './app.routes';
import { provideConfig } from './config';
import { NotificationService } from './notifications/notification.service';
import { AuthService } from './authentication/auth.service';
import { AppComponent } from './app.component';
// Consider to use submodules, instead:
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login.component';
import { RegisterComponent } from './authentication/register.component';
import { BooksComponent } from './books/books.component';
import { BookListComponent } from './books/book-list.component';
import { NewBookComponent } from './books/new-book.component';
import { EditBookComponent } from './books/edit-book.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieListComponent } from './movies/movie-list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
        // Consider to use submodules, instead:
        HomeComponent,
        LoginComponent, RegisterComponent,
        BooksComponent, BookListComponent, NewBookComponent, EditBookComponent,
        MoviesComponent, MovieListComponent
    ],
    providers: [
        appRoutingProviders,
        provideConfig(),
        NotificationService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
