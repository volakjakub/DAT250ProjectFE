export class AuthService {
    static isLoggedIn() {
        const User = sessionStorage.getItem('User');
        return User !== null && User !== undefined;
    }

    static getUser() {
        return sessionStorage.getItem('User');
    }

    static logout() {
        sessionStorage.removeItem('User');
    }
}