import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Notification } from './notification';

export class NotificationService {

    private notificationsSource = new Subject<Notification>();

    notifications$ = this.notificationsSource.asObservable();

    private notify(notificacation: Notification) {
        this.notificationsSource.next(notificacation);
    }

    notifySuccess(message: string) {
        this.notify({ type: 'success', message });
    }

    notifyInfo(message: string) {
        this.notify({ type: 'info', message });
    }

    notifyWarning(message: string) {
        this.notify({ type: 'warning', message });
    }

    notifyDanger(message: string) {
        this.notify({ type: 'danger', message });
    }
}
