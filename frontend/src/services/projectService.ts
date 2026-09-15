import api from "../api/api";

import type {
    Project,
    ProjectRequest,
} from "../types/project";

export const createProject = async (
    request: ProjectRequest
): Promise<Project> => {

    const response =
        await api.post<Project>(
            "/projects",
            request
        );

    return response.data;
};


export const getProjects = async (): Promise<Project[]> => {

    const response =
        await api.get<Project[]>(
            "/projects"
        );

    return response.data;
};


export const getProject = async (
    projectId: number
): Promise<Project> => {

    const response =
        await api.get<Project>(
            `/projects/${projectId}`
        );

    return response.data;
};


export const getProjectsByOwner = async (
    ownerId: number
): Promise<Project[]> => {

    const response =
        await api.get<Project[]>(
            `/projects/owner/${ownerId}`
        );

    return response.data;
};


export const updateProject = async (
    projectId: number,
    request: ProjectRequest
): Promise<Project> => {

    const response =
        await api.put<Project>(
            `/projects/${projectId}`,
            request
        );

    return response.data;
};


export const deleteProject = async (
    projectId: number
): Promise<void> => {

    await api.delete(
        `/projects/${projectId}`
    );
};
