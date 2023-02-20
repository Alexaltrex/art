import {instance} from "./api";
import {ChangeItemsOrderType, IPortfolio, IPortfolioUpdate} from "../types/portfolio.type";
import {authHeader} from "./authHeader";

export const portfolioAPI = {
    //========= GET ALL =========//
    getAll: async (): Promise<IPortfolio[]> => {
        const response = await instance.get<IPortfolio[]>(`portfolio`);
        return response.data;
    },
    //========= CREATE =========//
    create: async (portfolioCreateData: IPortfolioUpdate): Promise<string> => {
        const keys = Object.keys(portfolioCreateData);
        const formData = new FormData();
        keys.forEach(key => (
            // @ts-ignore
            formData.append(`${key}`, portfolioCreateData[key])
        ));
        const response = await instance.post<string>("portfolio/id", formData, {headers: authHeader()})
        return response.data;
    },
    //========= DELETE =========//
    delete: async (id: string): Promise<string> => {
        const response = await instance.delete<string>(`portfolio/id/${id}`, {headers: authHeader()});
        return response.data;
    },
    //========= UPDATE =========//
    update: async ({id, portfolioUpdateData}: { id: string, portfolioUpdateData: IPortfolioUpdate }): Promise<string> => {
        const keys = Object.keys(portfolioUpdateData);
        const formData = new FormData();
        keys.forEach(key => (
            // @ts-ignore
            formData.append(`${key}`, portfolioUpdateData[key])
        ));
        const response = await instance.put<string>(
            `portfolio/id/${id}`,
            formData,
            {headers: authHeader()}
        )
        return response.data;
    },
    //========= ORDER =========//
    changeItemsOrder: async (changeItemsOrder: ChangeItemsOrderType): Promise<string> => {
        const response = await instance.put<string>(
            'portfolio/order',
            changeItemsOrder,
            {headers: authHeader()}
        );
        return response.data;
    }
}
