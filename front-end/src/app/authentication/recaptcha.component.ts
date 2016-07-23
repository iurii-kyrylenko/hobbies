/**
 * Wrapped around Google reCaptcha https://www.google.com/recaptcha/intro/index.html
 * Based on https://github.com/xmaestro/angular2-recaptcha
 */

import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    NgZone
} from '@angular/core';

@Component({
    selector: 're-captcha',
    template: `
        <div
            class="g-recaptcha"
            [attr.data-sitekey]="siteKey"
            data-callback="verifyCallback">
        </div>
    `
})
export class ReCaptchaComponent implements OnInit{
    @Input() siteKey: string = null;
    @Output() captchaResponse = new EventEmitter<string>();

    constructor(private zone: NgZone) {}

    ngOnInit() {
        window['verifyCallback'] = (res: string) =>
            // use zone to trigger change detection
            this.zone.run(() =>
                this.captchaResponse.emit(res)
            );
        const doc = <HTMLDivElement> document.body;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        doc.appendChild(script);
    }
}
