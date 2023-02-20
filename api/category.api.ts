import {instance} from "./api";
import {CategoryCreateType, ICategory} from "../types/category.type";
import {authHeader} from "./authHeader";

export const categoryAPI = {
    //========= GET ALL =========//
    getAll: async (): Promise<ICategory[]> => {
        const response = await instance.get<ICategory[]>('category');
        return response.data;
    },
    //========= CREATE =========//
    create: async (createData: CategoryCreateType): Promise<string> => {
        const response = await instance.post<string>('category', createData, {headers: authHeader()})
        return response.data;
    },
    //========= UPDATE =========//
    update: async ({id, updateData}: { id: string, updateData: CategoryCreateType }): Promise<string> => {
        const response = await instance.put<string>(
            `category/${id}`,
            updateData,
            {headers: authHeader()}
        )
        return response.data;
    },
    //========= DELETE =========//
    delete: async (id: string): Promise<string> => {
        const response = await instance.delete<string>(`category/${id}`, {headers: authHeader()});
        return response.data;
    },
}
