export class AuthService {
    static isLoggedIn() {
        const user = sessionStorage.getItem('User');
        return user !== null && user !== undefined;
    }

    static getUser() {
        return JSON.parse(sessionStorage.getItem('User'));
    }

    static logout() {
        sessionStorage.removeItem('User');
    }
}