export class AuthUser {
    constructor(public name: string, public email: string) {}
}

export class LoginUser {
    constructor(public email: string = '', public password: string = '') {}
}
