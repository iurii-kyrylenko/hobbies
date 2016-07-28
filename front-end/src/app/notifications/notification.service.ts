import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Notification } from './notification';

export class NotificationService {

    private notificationsSource = new Subject<Notification>();

    notifications$ = this.notificationsSource.asObservable();

    notify(notificacation: Notification) {
        this.notificationsSource.next(notificacation);
    }
}
