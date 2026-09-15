import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import type { LoginRequest, RegisterRequest } from "../types/auth";
import type { User } from "../types/user";

import {
    clearStorage,
    getUser,
    saveToken,
    saveUser,
} from "../utils/storage";

import {
    loginUser,
    registerUser,
} from "../services/authService";

interface AuthContextValue {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (request: LoginRequest) => Promise<void>;
    register: (request: RegisterRequest) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({
    children,
}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(() => getUser());
    const [isLoading] = useState(false);

    const login = async (
        request: LoginRequest
    ): Promise<void> => {
        const response = await loginUser(request);

        const authenticatedUser: User = {
            id: response.id,
            name: response.name,
            email: response.email,
            role: response.role,
        };

        saveToken(response.token);
        saveUser(authenticatedUser);

        setUser(authenticatedUser);
    };

    const register = async (
        request: RegisterRequest
    ): Promise<void> => {
        await registerUser(request);
    };

    const logout = (): void => {
        clearStorage();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: Boolean(user),
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextValue => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuthContext must be used inside AuthProvider"
        );
    }

    return context;
};
