import style from "./OurTeam.module.scss";
import * as React from "react";
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import {slides} from "./slides";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import SwiperClass from 'swiper/types/swiper-class';
import {FC, useState} from "react";
import {svgIcons} from "../../assets/svgIcons";
import {useScroll} from "../../hooks/useScroll";
import clsx from "clsx";
import {IMember} from "../../types/member.type";
import {sortOrderedItemByOrder} from "../../helpers/helpers";

interface IOurTeam {
    members: IMember[]
}

export const OurTeam: FC<IOurTeam> = ({members}) => {
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const [index, setIndex] = useState(0);

    const {ref, dark} = useScroll();

    return (
        <div className={clsx({
            [style.ourTeam]: true,
            [style.ourTeam_dark]: !dark,
        })}
             ref={ref}
        >

            <div className={style.top}>
                <div className={style.inner}>
                    <TitleWrapper step="07" label="Our team" black={dark}/>
                    <p className={style.title} data-aos="fade-up">
                        I know them, <span>they can be trusted</span>
                    </p>
                </div>
            </div>

            <div className={style.swiperWrapper}>
                <Swiper slidesPerView={1}
                        spaceBetween={0}
                        onSwiper={(swiper) => {
                            setSwiper(swiper);
                        }}
                        onSlideChange={(swiper) => {
                            setIndex(swiper.realIndex);
                        }}
                        className={style.swiper}
                >
                    {
                        [...members]
                            .sort(sortOrderedItemByOrder)
                            .map(({id, order, position, name, img}) => (
                            <SwiperSlide className={style.slideWrapper} key={id}>
                                <div className={style.slide}>
                                    <img src={img} alt="" className={style.back}/>
                                    {/*<img src={src} alt="" className={style.avatar}/>*/}
                                    <p className={style.position}>{position}</p>
                                    <p className={style.name}>{name}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>


            <div className={style.slidesDesktop}>
                <div className={style.inner}>
                    {
                        [...members]
                            .sort(sortOrderedItemByOrder)
                            .map(({id, order, position, name, img}) => (
                            <div className={style.slide} key={id}>
                                <img src={img} alt="" className={style.back}/>
                                {/*<img src={src} alt="" className={style.avatar}/>*/}
                                <p className={style.position}>{position}</p>
                                <p className={style.name}>{name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={style.navigate}>
                <button onClick={() => swiper?.slidePrev()}
                        className={style.prevBtn}
                        disabled={index === 0}
                >
                    {svgIcons.arrow_left}
                </button>

                <div className={style.center}>
                    <p>{index + 1}</p><p>{`/${slides.length}`}</p>
                </div>


                <button onClick={() => swiper?.slideNext()}
                        className={style.nextBtn}
                        disabled={index === slides.length - 1}
                >
                    {svgIcons.arrow_left}
                </button>
            </div>


        </div>
    )
}
