export const APP_NAME = "CampusOS Nexus";

export const API_BASE_URL =
    "http://localhost:8080/api";

export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",
    PROJECTS: "/projects",
    CREATE_PROJECT: "/projects/create",
    TEAMS: "/teams",
    RECOMMENDATIONS: "/recommendations",
    PORTFOLIO: "/portfolio",
} as const;

export const PROJECT_DOMAINS = [
    "Web Development",
    "Mobile Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Cybersecurity",
    "Cloud Computing",
    "Blockchain",
    "IoT",
    "Open Source",
    "Other",
] as const;

export const USER_ROLES = {
    STUDENT: "STUDENT",
    ADMIN: "ADMIN",
} as const;