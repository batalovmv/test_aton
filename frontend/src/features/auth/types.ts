export interface LoginParams {
    login: string;
    password: string;
}

export interface User {
    fullName: string;
    Id: number;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
    error: string | null;
}