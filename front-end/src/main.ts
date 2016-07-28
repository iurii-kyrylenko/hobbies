import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { provideConfig } from './app/config';
import { NotificationService } from './app/notifications/notification.service';

if (process.env.ENV === 'production') {
    enableProdMode();
}

bootstrap(AppComponent, [
    disableDeprecatedForms(),
    provideForms(),
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    NotificationService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    provideConfig()
]);
