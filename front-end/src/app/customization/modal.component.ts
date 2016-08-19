/*
 * Based on https://github.com/pleerock/ng2-modal
 */
 
import {Component, Input, ElementRef, ViewChild} from "@angular/core";
import { Subject } from 'rxjs';

@Component({
    selector: "my-modal",
    template: `
<div class="modal" 
     tabindex="-1"
     role="dialog"
     #modalRoot
     (keydown.enter)="submitButtonLabel ? submit() : 0"
     (keydown.esc)="closeOnEscape ? dismiss() : 0"
     [ngStyle]="{ display: isOpened ? 'block' : 'none' }"
     (click)="closeOnOutsideClick ? dismiss() : 0">
    <div [class]="'modal-dialog ' + modalClass" (click)="preventClosing($event)">
        <div class="modal-content" tabindex="0" *ngIf="isOpened">
            <div class="modal-header">
                <button *ngIf="!hideCloseButton" type="button" class="close" (click)="dismiss()"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" *ngIf="title">{{ title }}</h4>
                <ng-content select="modal-header"></ng-content>
            </div>
            <div class="modal-body">
                <ng-content select="modal-content"></ng-content>
            </div>
            <div class="modal-footer">
                <ng-content select="modal-footer"></ng-content>
                <button *ngIf="submitButtonLabel" type="button" class="btn btn-default" (click)="submit()">{{ submitButtonLabel }}</button>
                <button *ngIf="cancelButtonLabel" type="button" class="btn btn-default" (click)="dismiss()">{{ cancelButtonLabel }}</button>
            </div>
        </div>
    </div>
</div>
`
})
export class ModalComponent {

    // -------------------------------------------------------------------------
    // Inputs
    // -------------------------------------------------------------------------

    @Input()
    modalClass: string;

    @Input()
    closeOnEscape: boolean = true;

    @Input()
    closeOnOutsideClick: boolean = false;

    @Input()
    title: string;

    @Input()
    hideCloseButton = false;

    @Input()
    cancelButtonLabel: string;

    @Input()
    submitButtonLabel: string;

    // -------------------------------------------------------------------------
    // Private properties
    // -------------------------------------------------------------------------

    private isOpened = false;

    @ViewChild("modalRoot") private modalRoot: ElementRef;

    private backdropElement: HTMLElement;

    private closeEvents: Subject<boolean>;

    private modalData: any;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor() {
        this.createBackDrop();
    }

    // -------------------------------------------------------------------------
    // Lifecycle Methods
    // -------------------------------------------------------------------------

    ngOnDestroy() {
        if (this.backdropElement && this.backdropElement.parentNode === document.body)
            document.body.removeChild(this.backdropElement);
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    open(modalData: any) {
        this.modalData = modalData;
        this.isOpened = true;
        document.body.appendChild(this.backdropElement);
        window.setTimeout(() => this.modalRoot.nativeElement.focus(), 0);
        this.closeEvents = new Subject<boolean>();
        return this.closeEvents.asObservable();
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    private dismiss() {
        this.closeEvents.next(false);
        this.close();
    }

    private submit() {
        this.closeEvents.next(true);
        this.close();
    }

    private close() {
        this.isOpened = false;
        document.body.removeChild(this.backdropElement);
    }

    private preventClosing(event: MouseEvent) {
        event.stopPropagation();
    }

    private createBackDrop() {
        this.backdropElement = document.createElement("div");
        this.backdropElement.classList.add("modal-backdrop");
        this.backdropElement.classList.add("fade");
        this.backdropElement.classList.add("in");
    }

}
