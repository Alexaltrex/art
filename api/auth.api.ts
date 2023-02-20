import {ILoginData, ILoginResponse} from "../types/auth.type";
import {instance, IResponse} from "./api";

export const authAPI = {
    async login(loginData: ILoginData) {
        const response = await instance.post<IResponse<ILoginResponse>>("auth/login", loginData);
        return response.data;
    }
}
