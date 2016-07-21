import { Injectable } from '@angular/core';

export const provideConfig = () => {
    let config = (process.env.ENV === 'production') ? prodConfig : devConfig;
    return { provide: AppConfig, useValue: config };
};

@Injectable()
export class AppConfig {
    apiUrl: string
}

const devConfig = {
    apiUrl: 'http://localhost:3000/api'
};

const prodConfig = {
    apiUrl: '/api'
};
