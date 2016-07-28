import { Component, OnInit } from '@angular/core';
import { NotificationService} from './notification.service';

@Component({
    selector: 'my-notifier',
    template: `
        <div [ngClass]="alertClass" class="alert">{{message}}</div>
    `
})
export class NotifierComponent implements OnInit {

    constructor(private ntfc: NotificationService) {}

    message: string;
    alertClass: string;

    ngOnInit() {
        this.ntfc.notifications$.subscribe(
            (notification) => {
                this.message = notification.message;
                this.alertClass = 'alert-' + notification.type;
            }
        );
    }
}
