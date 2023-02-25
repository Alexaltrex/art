import {ISlider} from "../../types/slider.type";
import {FC} from "react";
import style from "./PortfolioSlider.module.scss";

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {Mousewheel} from "swiper";
import {sortOrderedItemByOrder} from "../../helpers/helpers";

interface IPortfolioSlider {
    slider: ISlider
}

export const PortfolioSlider: FC<IPortfolioSlider> = ({slider}) => {
    return (
        <div className={style.portfolioSlider}>
            {
                Object.values(slider.slides)
                    .sort(sortOrderedItemByOrder)
                    .map(slide => (
                        <img src={slide.src} alt="" className={style.img} key={slide.id}/>
                    ))
            }
        </div>

        // <Swiper direction={"vertical"}
        //         slidesPerView={1}
        //         spaceBetween={0}
        //         mousewheel={false}
        //         // pagination={{
        //         //     clickable: true,
        //         // }}
        //         modules={[Mousewheel]}
        //         className={style.portfolioSlider}
        // >
        //     {
        //         Object.values(slider.slides)
        //             .sort(sortOrderedItemByOrder)
        //             .map(slide => (
        //             <SwiperSlide key={slide.id}
        //                          className={style.slide}
        //             >
        //                 <img src={slide.src} alt=""/>
        //             </SwiperSlide>
        //         ))
        //     }
        // </Swiper>
    )
}
