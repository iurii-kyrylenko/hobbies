import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { appRoutes, appRoutingProviders } from './app.routes';
import { provideConfig } from './config';
import { NotificationService } from './notifications/notification.service';
import { AuthService } from './authentication/auth.service';
import { UserModule } from './authentication/user.module';
import { BooksModule } from './books/books.module';
import { MoviesModule } from './movies/movies.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotifierComponent } from './notifications/notifier.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        UserModule,
        BooksModule,
        MoviesModule,
        RouterModule.forRoot(appRoutes, { useHash: false })
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        NotifierComponent,
        HomeComponent
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
