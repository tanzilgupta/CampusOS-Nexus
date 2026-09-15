import api from "../api/api";

import type {
    RecommendationResponse,
} from "../types/matching";


export const getRecommendations = async (
    projectId: number
): Promise<RecommendationResponse[]> => {

    const response = await api.get<RecommendationResponse[]>(
        `/matching/project/${projectId}`
    );

    return response.data;

};