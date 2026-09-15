export type ProjectStatus =
    | "OPEN"
    | "IN_PROGRESS"
    | "CLOSED"
    | "COMPLETED";



export interface Project {

    id: number;

    title: string;

    description: string;

    domain: string;

    maxMembers: number;

    deadline: string;

    durationWeeks: number;

    status: ProjectStatus;

    ownerId: number;

    ownerName?: string;

    requiredSkills: string[];

}



export interface ProjectRequest {

    title: string;

    description: string;

    domain: string;

    maxMembers: number;

    deadline: string;

    durationWeeks: number;

    status: ProjectStatus;

    requiredSkillIds: number[];

}