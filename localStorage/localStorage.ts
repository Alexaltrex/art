export interface ILocalStorageData {
    accessToken: string
}

export const setLocalStorage = (data: ILocalStorageData) => {
    localStorage.setItem('demyanchuk-art-admin-info', JSON.stringify(data));
};

export const getLocalStorage = (): null | string => {
    const userInfo = localStorage.getItem('demyanchuk-art-admin-info');
    if (userInfo) {
        const data = JSON.parse(userInfo);
        return data.accessToken;
    } else {
        return null
    }
};

export const removeLocalStorage = () => {
    localStorage.removeItem('demyanchuk-art-admin-info');
};
