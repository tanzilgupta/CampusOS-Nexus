import axios from "axios";
import { getToken, clearStorage } from "../utils/storage";

const api = axios.create({
    // Uses the Vite proxy locally and a same-origin API after deployment.
    // Set VITE_API_BASE_URL only when the API lives on another origin.
    baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,

    (error) => {

        // 401 = Unauthorized (JWT expired/invalid)

        if (error.response?.status === 401) {

            clearStorage();

            window.dispatchEvent(
                new CustomEvent("sessionExpired")
            );

            if (window.location.pathname !== "/login") {

                setTimeout(() => {
                    window.location.href = "/login";
                }, 1500);

            }
        }

        return Promise.reject(error);
    }
);

export default api;
