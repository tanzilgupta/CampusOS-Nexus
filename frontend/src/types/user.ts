export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface AuthUser extends User {
    token: string;
}