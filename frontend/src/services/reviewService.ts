import api from "../api/api";

export interface ReviewRequest {
    reviewedUserId: number;
    rating: number;
    comment: string;
}

export interface ReviewResponse {
    id: number;
    reviewerId: number;
    reviewedUserId: number;
    rating: number;
    comment: string;
    reviewerName?: string;
}

export const createReview = async (reviewerId: number, request: ReviewRequest): Promise<ReviewResponse> => {
    const response = await api.post<ReviewResponse>(`/reviews/${reviewerId}`, request);
    return response.data;
};

export const getUserReviews = async (userId: number): Promise<ReviewResponse[]> => {
    const response = await api.get<ReviewResponse[]>(`/reviews/user/${userId}`);
    return response.data;
};

export const getReviewsGiven = async (userId: number): Promise<ReviewResponse[]> => {
    const response = await api.get<ReviewResponse[]>(`/reviews/given/${userId}`);
    return response.data;
};

export const deleteReview = async (reviewId: number): Promise<void> => {
    await api.delete(`/reviews/${reviewId}`);
};
