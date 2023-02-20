import {instance} from "./api";
import {ISendEmail} from "../types/mail.type";
import {authHeader} from "./authHeader";

export const mailAPI = {
    sendEmail: async (data: ISendEmail) => {
        const response = await instance.post<string>('mail', data, {headers: authHeader()});
        return response.data;
    },
}
