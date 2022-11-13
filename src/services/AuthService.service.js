export class AuthService {
    /*
    static isLoggedIn() {
        return fetch('http://localhost:8000/info', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
        .then(r => {
            return r.ok;
        });
    }*/
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