import { Injectable } from '@angular/core';

export const provideConfig = () => {
    let config = (process.env.ENV === 'production') ? prodConfig : devConfig;
    return { provide: AppConfig, useValue: config };
};

@Injectable()
export class AppConfig {
    apiUrl: string;
    reCaptchaSiteKey: string;
}

const devConfig = {
    apiUrl: 'http://localhost:3000/api',
    reCaptchaSiteKey: 'K_6LeUuSUTAAAAAElwIcAHk994ErqNeqw7aQxlsw_H'
};

const prodConfig = {
    apiUrl: '/api',
    reCaptchaSiteKey: 'K_6LeUuSUTAAAAAElwIcAHk994ErqNeqw7aQxlsw_H'
};
