import {instance} from "./api";
import {ICreateSlide, ISlider} from "../types/slider.type";
import {authHeader} from "./authHeader";
import {ChangeItemsOrderType} from "../types/portfolio.type";

export const sliderAPI = {
    //========= GET ALL =========//
    getAll: async (): Promise<ISlider[]> => {
        const response = await instance.get<ISlider[]>('slider');
        return response.data;
    },
    //========= GET SLIDER BY ID =======//
    getSliderById: async(categoryId: string): Promise<ISlider> => {
        const response = await instance.get<ISlider>(`slider/id/${categoryId}`);
        return response.data;
    },
    //=============== ADD SLIDE TO SLIDER ===============//
    addSlideToSlider: async ({createSlide, categoryId}: {createSlide: ICreateSlide, categoryId: string}): Promise<string> => {
        const formData = new FormData();
        formData.append('img', createSlide.src);
        const response = await instance.put<string>(
            `slider/id/${categoryId}`,
            formData,
            {headers: authHeader()}
        );
        return response.data;
    },
    //=============== DELETE SLIDE FROM SLIDER ===============//
    deleteSlideFromSlider: async ({sliderId, slideId}: {sliderId: string, slideId: string}): Promise<string> => {
        const response = await instance.delete<string>(`slider/id/${sliderId}/slide/${slideId}`,{headers: authHeader()});
        return response.data;
    },
    //========= CHANGE ITEMS ORDER =========//
    changeItemsOrder: async ({sliderId, changeItemsOrder}: { sliderId: string, changeItemsOrder: ChangeItemsOrderType }): Promise<string> => {
        const response = await instance.put<string>(
            `slider/order/${sliderId}`,
            changeItemsOrder,
            {headers: authHeader()}
        );
        return response.data;
    }
}
