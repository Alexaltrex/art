import axios from "axios";


export const baseURL = process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_URL_PROD //process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD

export const instance = axios.create({
    baseURL,
    withCredentials: true,
});

export interface IResponse<D = {}> {
    data: D
    message: string
    error?: {
        field: string
        value: string
    }
}
