import api from "../api/api";

export interface ApplicationRequest {

    message: string;

}

export type ApplicationStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED";



export interface Application {

    id: number;

    projectId: number;

    userId: number;

    status: ApplicationStatus;

    message?: string;

    userName?: string;

}

export const applyToProject = async (
    projectId: number,
    userId: number,
    request: ApplicationRequest
): Promise<Application> => {


    const response =
        await api.post<Application>(
            `/applications/project/${projectId}/user/${userId}`,
            request
        );


    return response.data;

};

export const getProjectApplications = async (
    projectId: number
): Promise<Application[]> => {


    const response =
        await api.get<Application[]>(
            `/applications/project/${projectId}`
        );


    return response.data;

};


export const getUserApplications = async (
    userId: number
): Promise<Application[]> => {


    const response =
        await api.get<Application[]>(
            `/applications/user/${userId}`
        );


    return response.data;

};

export const updateApplicationStatus = async (
    applicationId: number,
    status: ApplicationStatus
): Promise<Application> => {


    const response =
        await api.put<Application>(
            `/applications/${applicationId}/status`,
            {
                status,
            }
        );


    return response.data;

};