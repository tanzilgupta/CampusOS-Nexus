import api from "../api/api";

import type {
    Portfolio,
    PortfolioRequest,
} from "../types/portfolio";


export const getPortfolio = async (
    userId: number
): Promise<Portfolio> => {

    const response =
        await api.get<Portfolio>(
            `/portfolio/${userId}`
        );

    return response.data;

};


export const createPortfolio = async (
    userId: number,
    portfolio: PortfolioRequest
): Promise<Portfolio> => {

    const response =
        await api.post<Portfolio>(
            `/portfolio/${userId}`,
            portfolio
        );

    return response.data;

};


export const updatePortfolio = async (
    userId: number,
    portfolio: PortfolioRequest
): Promise<Portfolio> => {

    const response =
        await api.put<Portfolio>(
            `/portfolio/${userId}`,
            portfolio
        );

    return response.data;

};


export const deletePortfolio = async (
    userId: number
): Promise<void> => {

    await api.delete(
        `/portfolio/${userId}`
    );

};