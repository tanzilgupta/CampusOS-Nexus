export interface Portfolio {

    id: number;

    userId: number;

    title: string;

    description: string;

    projectUrl: string;

    imageUrl: string;

}


export interface PortfolioRequest {

    title: string;

    description: string;

    projectUrl: string;

    imageUrl: string;

}