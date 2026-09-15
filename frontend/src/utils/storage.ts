import type { User } from "../types/user";

const TOKEN_KEY = "campusos_token";
const USER_KEY = "campusos_user";

export const saveToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};

export const saveUser = (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
    const storedUser = localStorage.getItem(USER_KEY);

    if (!storedUser) {
        return null;
    }

    try {
        return JSON.parse(storedUser) as User;
    } catch {
        removeUser();
        return null;
    }
};

export const removeUser = (): void => {
    localStorage.removeItem(USER_KEY);
};

export const clearStorage = (): void => {
    removeToken();
    removeUser();
};