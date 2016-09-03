import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {

    get apiUrl() {
        return process.env.ENV === 'production'
            ? '/api'
            : 'http://localhost:3000/api';
    }

    get reCaptchaSiteKey() {
        return '6LeUuSUTAAAAAElwIcAHk994ErqNeqw7aQxlsw_H';
    }
}
