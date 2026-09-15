export interface Profile {

    id?: number;

    fullName: string;

    bio: string;

    university: string;

    degree: string;

    year: string;

    branch: string;

    githubUrl: string;

    linkedinUrl: string;

    portfolioUrl: string;

    resumeUrl: string;

    availability: string;

    interests: string[];

}


export interface ProfileRequest {

    fullName: string;

    bio: string;

    university: string;

    degree: string;

    year: string;

    branch: string;

    githubUrl: string;

    linkedinUrl: string;

    portfolioUrl: string;

    resumeUrl: string;

    availability: string;

    interests: string[];

}


export interface Skill {

    id: number;

    name: string;

    category: string;

    proficiency: string;

    evidence: string;

}
