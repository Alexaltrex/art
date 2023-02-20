import {getLocalStorage} from "../localStorage/localStorage";

export const authHeader = () => {
    const accessToken = getLocalStorage();

    if (accessToken) {
        return {
            'x-access-token': accessToken
        };
    } else {
        return {}
    }
};
