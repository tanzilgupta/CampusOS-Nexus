import api from "../api/api";

import type {
    Team,
    TeamRequest,
    TeamMember,
    TeamMemberRequest,
    TeamGapAnalysis,
} from "../types/team";


export const createTeam = async (
    request: TeamRequest
): Promise<Team> => {

    const response =
        await api.post<Team>(
            "/teams",
            request
        );

    return response.data;
};


export const getAllTeams = async (): Promise<Team[]> => {

    const response =
        await api.get<Team[]>(
            "/teams"
        );

    return response.data;
};


export const getTeam = async (
    teamId: number
): Promise<Team> => {

    const response =
        await api.get<Team>(
            `/teams/${teamId}`
        );

    return response.data;
};


export const getProjectTeams = async (
    projectId: number
): Promise<Team[]> => {

    const response =
        await api.get<Team[]>(
            `/teams/project/${projectId}`
        );

    return response.data;
};


export const updateTeam = async (
    teamId: number,
    request: TeamRequest
): Promise<Team> => {

    const response =
        await api.put<Team>(
            `/teams/${teamId}`,
            request
        );

    return response.data;
};


export const deleteTeam = async (
    teamId: number
): Promise<void> => {

    await api.delete(
        `/teams/${teamId}`
    );
};


export const addTeamMember = async (
    teamId: number,
    userId: number,
    request: TeamMemberRequest
): Promise<TeamMember> => {

    const response =
        await api.post<TeamMember>(
            `/team-members/team/${teamId}/user/${userId}`,
            request
        );

    return response.data;
};


export const getTeamMembers = async (
    teamId: number
): Promise<TeamMember[]> => {

    const response =
        await api.get<TeamMember[]>(
            `/team-members/team/${teamId}`
        );

    return response.data;
};


export const removeTeamMember = async (
    memberId: number
): Promise<void> => {

    await api.delete(
        `/team-members/${memberId}`
    );
};


export const getTeamGapAnalysis = async (
    teamId: number
): Promise<TeamGapAnalysis> => {

    const response =
        await api.get<TeamGapAnalysis>(
            `/teams/${teamId}/gap-analysis`
        );

    return response.data;
};