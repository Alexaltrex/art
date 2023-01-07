import style from "./OurTeam.module.scss";
import * as React from "react";
import {TitleWrapper} from "../X_common/TitleWrapper/TitleWrapper";
import {slides} from "./slides";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import SwiperClass from 'swiper/types/swiper-class';
import {useState} from "react";
import {svgIcons} from "../../assets/svgIcons";

export const OurTeam = () => {
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const [index, setIndex] = useState(0);

    return (
        <div className={style.ourTeam}>

            <div className={style.top}>
                <div className={style.inner}>
                    <TitleWrapper step="03" label="Our team" black={false}/>
                    <p className={style.title}>
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
                            <SwiperSlide className={style.slideWrapper}  key={key}>
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
                >
                    {svgIcons.arrow_left}
                </button>

                <div className={style.center}>
                    <p>{index + 1}</p><p>{`/${slides.length}`}</p>
                </div>


                <button onClick={() => swiper?.slideNext()}
                        className={style.nextBtn}
                >
                    {svgIcons.arrow_left}
                </button>
            </div>



        </div>
    )
}
