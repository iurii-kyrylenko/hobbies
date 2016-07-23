export class AuthUser {
    constructor(
        public name: string,
        public email: string
    ) {}
}

export class LoginUser {
    constructor(
        public email = '',
        public password = ''
    ) {}
}

export class RegisterUser {
    constructor(
        public name = '',
        public email = '',
        public password = '',
        public captchaResponse = ''
    ) {}
}
