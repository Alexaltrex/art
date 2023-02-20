import {instance} from "./api";
import {IMember, UpdateMemberType} from "../types/member.type";
import {authHeader} from "./authHeader";
import {ChangeItemsOrderType} from "../types/portfolio.type";

export const memberAPI = {
    //========= GET ALL =========//
    getAll: async (): Promise<IMember[]> => {
        const response = await instance.get<IMember[]>('member');
        return response.data;
    },
    //========= CREATE =========//
    create: async (createData: UpdateMemberType): Promise<string> => {
        const keys = Object.keys(createData);
        const formData = new FormData();
        keys.forEach(key => (
            // @ts-ignore
            formData.append(`${key}`, createData[key])
        ));
        const response = await instance.post<string>("member/id", formData, {headers: authHeader()})
        return response.data;
    },
    //========= DELETE =========//
    delete: async (id: string): Promise<string> => {
        const response = await instance.delete<string>(`member/id/${id}`, {headers: authHeader()});
        return response.data;
    },
    //========= UPDATE =========//
    update: async ({id, updateData}: { id: string, updateData: UpdateMemberType }): Promise<string> => {
        const keys = Object.keys(updateData);
        const formData = new FormData();
        keys.forEach(key => (
            // @ts-ignore
            formData.append(`${key}`, updateData[key])
        ));
        const response = await instance.put<string>(
            `member/id/${id}`,
            formData,
            {headers: authHeader()}
        )
        return response.data;
    },
    //========= ORDER =========//
    changeItemsOrder: async (changeItemsOrder: ChangeItemsOrderType): Promise<string> => {
        const response = await instance.put<string>(
            'member/order',
            changeItemsOrder,
            {headers: authHeader()}
        );
        return response.data;
    }
}
