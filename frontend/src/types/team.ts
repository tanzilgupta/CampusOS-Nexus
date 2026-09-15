export interface Team {
    id: number;
    name: string;
    description: string;
    domain: string;
    projectId: number;
    createdBy: number;
    projectName?: string;
    createdByName?: string;
}

export interface TeamRequest {
    name: string;
    description: string;
    domain: string;
    projectId: number;
}

export interface TeamMember {
    id: number;
    teamId: number;
    userId: number;
    role: string;
}

export interface TeamMemberRequest {
    role: string;
}

export interface TeamGapAnalysis {
    coveredSkills: string[];
    missingSkills: string[];
    coveragePercentage: number;
    recommendation: string;
}
