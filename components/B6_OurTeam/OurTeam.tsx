import style from "./OurTeam.module.scss";
import * as React from "react";
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import {slides} from "./slides";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import SwiperClass from 'swiper/types/swiper-class';
import {useState} from "react";
import {svgIcons} from "../../assets/svgIcons";
import {useScroll} from "../../hooks/useScroll";
import clsx from "clsx";

export const OurTeam = () => {
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
                    <TitleWrapper step="03" label="Our team" black={dark}/>
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
                        slides.map(({position, name, src, backSrc}, key) => (
                            <SwiperSlide className={style.slideWrapper} key={key}>
                                <div className={style.slide}>
                                    <img src={backSrc} alt="" className={style.back}/>
                                    <img src={src} alt="" className={style.avatar}/>
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
                        slides.map(({position, name, src, backSrc}, key) => (
                            <div className={style.slide} key={key}>
                                <img src={backSrc} alt="" className={style.back}/>
                                <img src={src} alt="" className={style.avatar}/>
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
