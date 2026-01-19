declare module '#auth-utils' {
    interface User {
        id: number;
        name: string;
        email: string;
    }

    interface UserSession {
        lastLoggedIn: Date;
    }

    // interface SecureSessionData {

    // }
}