export interface RecommendationResponse {
    userId: number;
    userName: string;
    matchPercentage: number;
    matchReason: string;
    matchingSkills: string[];
    skillScore: number;
    experienceScore: number;
    interestScore: number;
    availabilityScore: number;
    collaborationScore: number;
    reasons: string[];
}
