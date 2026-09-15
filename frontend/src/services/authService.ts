import api from "../api/api";

import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from "../types/auth";

export const loginUser = async (
    request: LoginRequest
): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
        "/auth/login",
        request
    );

    return response.data;
};

export const registerUser = async (
    request: RegisterRequest
): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>(
        "/auth/register",
        request
    );

    return response.data;
};