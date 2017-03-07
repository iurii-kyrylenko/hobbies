import { Component, OnInit } from '@angular/core';
import { NotificationService} from './notification.service';

@Component({
    selector: 'my-notifier',
    template: `
        <div *ngIf="message" [ngClass]="alertClass" class="alert">
            <button type="button" class="close" (click)="message = null">
                <span aria-hidden="true">&times;</span>
            </button>
            {{message}}
        </div>
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
